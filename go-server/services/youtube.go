package services

import (
	"bytes"
	"container/heap"
	"context"
	"fmt"
	"gptube/config"
	"gptube/models"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
	"sync"
	"text/template"

	"github.com/sashabaranov/go-openai"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

var Service *youtube.Service

func init() {
	ctx := context.Background()
	service, err := youtube.NewService(ctx, option.WithAPIKey(config.Config("YOUTUBE_API_KEY")))
	if err != nil {
		log.Fatalf("%v\n", err)
	}
	Service = service
}

func (r *Request) ParseTemplate(t *template.Template, data interface{}) error {
	buf := new(bytes.Buffer)
	if err := t.Execute(buf, data); err != nil {
		return err
	}
	r.body = buf.String()
	return nil
}

func SendYoutubeSuccessTemplate(data models.YoutubeAnalyzerRespBody, subject string, emails []string) error {
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	templateDirectory := fmt.Sprintf("%s%s", dir, "/templates/youtube_email_success.gotmpl")
	template := template.Must(template.ParseFiles(templateDirectory))
	newEmail := NewRequest(emails, subject, "")
	sendedData := struct {
		FrontendURL string
		Results     models.YoutubeAnalyzerRespBody
	}{
		FrontendURL: config.Config("FRONTEND_URL"),
		Results:     data,
	}
	err = newEmail.ParseTemplate(template, sendedData)
	if err == nil {
		ok, err := newEmail.SendEmail()
		fmt.Println("Email sent: ", ok, err)
	} else {
		fmt.Println("Error parsing the success email template: ", err.Error())
	}

	return nil
}

func SendYoutubeErrorTemplate(subject string, emails []string) error {
	dir, err := os.Getwd()
	if err != nil {
		return err
	}

	templateDirectory := fmt.Sprintf("%s%s", dir, "/templates/youtube_email_error.gotmpl")
	template := template.Must(template.ParseFiles(templateDirectory))
	newEmail := NewRequest(emails, subject, "")

	err = newEmail.ParseTemplate(template, nil)
	if err == nil {
		ok, err := newEmail.SendEmail()
		fmt.Println("Email error sent: ", ok, err)
	} else {
		fmt.Println("Error parsing the error email template: ", err.Error())
	}

	return nil
}

func CanProcessVideo(youtubeRequestBody *models.YoutubePreAnalyzerReqBody) (*youtube.VideoListResponse, error) {
	// The max number of comments we can process
	maxNumberOfComments, _ := strconv.Atoi(config.Config("YOUTUBE_MAX_COMMENTS_CAPACITY"))

	var part = []string{"snippet", "contentDetails", "statistics"}
	call := Service.Videos.List(part)
	call.Id(youtubeRequestBody.VideoID)
	response, err := call.Do()
	if err != nil {
		return nil, fmt.Errorf("%s", err)
	}
	if len(response.Items) == 0 {
		return nil, fmt.Errorf("video not found")
	} else if response.Items[0].Statistics.CommentCount > uint64(maxNumberOfComments) {
		return nil, fmt.Errorf("number of comments exceeded, max %v", maxNumberOfComments)
	}
	return response, nil
}

func Analyze(body models.YoutubeAnalyzerReqBody) (*models.YoutubeAnalysisResults, error) {
	negativeComments := models.HeapNegativeComments([]*models.NegativeComment{})
	negCommentsLimit, _ := strconv.Atoi(config.Config("YOUTUBE_NEGATIVE_COMMENTS_LIMIT"))
	heap.Init(&negativeComments)
	results := &models.YoutubeAnalysisResults{
		BertResults:           &models.BertAIResults{},
		RobertaResults:        &models.RobertaAIResults{},
		NegativeComments:      &negativeComments,
		NegativeCommentsLimit: negCommentsLimit,
	}

	var part = []string{"id", "snippet"}
	nextPageToken := ""

	// Check if AI services are running before calling Youtube API
	err := CheckAIModelsWork()

	if err != nil {
		return nil, err
	}

	var wg sync.WaitGroup
	// Youtube calling
	call := Service.CommentThreads.List(part)
	call.VideoId(body.VideoID)
	for {
		if nextPageToken != "" {
			call.PageToken(nextPageToken)
		}
		response, err := call.Do()
		if err != nil {
			return results, err
		}

		tmpComments := make([]*youtube.CommentThread, len(response.Items))
		for i, p := range response.Items {
			if p == nil {
				continue
			}
			v := *p
			tmpComments[i] = &v
		}

		// Launching AI models to work in parallel
		wg.Add(1)
		go func() {
			defer wg.Done()
			cleanedComments, cleanedInputs := CleanCommentsForAIModels(tmpComments)
			var wgAI sync.WaitGroup
			var errBERT, errRoBERTa error
			var resBERT = &models.ResBertAI{}
			var resRoBERTa = &models.ResRobertaAI{}
			var BERTResults = &models.BertAIResults{}
			var RoBERTaResults = &models.RobertaAIResults{}

			wgAI.Add(1)
			go func() {
				defer wgAI.Done()
				resBERT, BERTResults, errBERT = BertAnalysis(tmpComments, cleanedComments, cleanedInputs)
				if errBERT != nil {
					log.Printf("bert_analysis_error %v\n", err)
				}
			}()
			wgAI.Add(1)
			go func() {
				defer wgAI.Done()
				resRoBERTa, RoBERTaResults, errRoBERTa = RobertaAnalysis(tmpComments, cleanedComments, cleanedInputs)
				if errRoBERTa != nil {
					log.Printf("roberta_analysis_error %v\n", err)
				}
			}()
			wgAI.Wait()

			if errBERT != nil || errRoBERTa != nil {
				return
			}

			negativeComments := make(models.HeapNegativeComments, 0)
			heap.Init(&negativeComments)
			for i := 0; i < len(*resBERT); i++ {
				tmpBertScore := models.ResAISchema{{
					Label: "1 star",
					Score: math.Inf(-1),
				}}[0]
				resultsBERT := []models.ResAISchema(*resBERT)
				for _, result := range resultsBERT[i] {
					if result.Score > tmpBertScore.Score {
						tmpBertScore.Label = result.Label
						tmpBertScore.Score = result.Score
					}
				}

				tmpRobertaScore := models.ResAISchema{{
					Label: "negative",
					Score: math.Inf(-1),
				}}[0]
				resultsRoBERTa := []models.ResAISchema(*resRoBERTa)
				for _, result := range resultsRoBERTa[i] {
					if result.Score > tmpRobertaScore.Score {
						tmpRobertaScore.Label = result.Label
						tmpRobertaScore.Score = result.Score
					}
				}

				if (tmpBertScore.Label == "1 star" || tmpBertScore.Label == "2 stars") &&
					(tmpRobertaScore.Label == "Negative" || tmpRobertaScore.Label == "negative") {
					badComment := models.Comment{
						CommentID:             cleanedComments[i].Id,
						TextDisplay:           cleanedComments[i].Snippet.TextDisplay,
						TextOriginal:          cleanedComments[i].Snippet.TextOriginal,
						TextCleaned:           cleanedInputs[i],
						AuthorDisplayName:     cleanedComments[i].Snippet.AuthorDisplayName,
						AuthorProfileImageUrl: cleanedComments[i].Snippet.AuthorProfileImageUrl,
						ParentID:              cleanedComments[i].Snippet.ParentId,
						LikeCount:             cleanedComments[i].Snippet.LikeCount,
						ModerationStatus:      cleanedComments[i].Snippet.ModerationStatus,
					}
					item := &models.NegativeComment{
						Comment:  &badComment,
						Priority: tmpRobertaScore.Score,
					}
					heap.Push(&negativeComments, item)
				}
			}

			// Writing response to the global result
			Mutex.Lock()
			// BERT
			results.BertResults.Score1 += BERTResults.Score1
			results.BertResults.Score2 += BERTResults.Score2
			results.BertResults.Score3 += BERTResults.Score3
			results.BertResults.Score4 += BERTResults.Score4
			results.BertResults.Score5 += BERTResults.Score5
			results.BertResults.ErrorsCount += BERTResults.ErrorsCount
			results.BertResults.SuccessCount += BERTResults.SuccessCount
			// RoBERTa
			results.RobertaResults.Positive += RoBERTaResults.Positive
			results.RobertaResults.Negative += RoBERTaResults.Negative
			results.RobertaResults.Neutral += RoBERTaResults.Neutral
			results.RobertaResults.ErrorsCount += RoBERTaResults.ErrorsCount
			results.RobertaResults.SuccessCount += RoBERTaResults.SuccessCount

			// Adding most negative comments
			for negativeComments.Len() > 0 {
				item := heap.Pop(&negativeComments).(*models.NegativeComment)
				heap.Push(results.NegativeComments, item)
			}
			Mutex.Unlock()
		}()
		//////////////////////////////////////////////

		nextPageToken = response.NextPageToken
		if nextPageToken == "" {
			break
		}
	}
	wg.Wait()

	// Averaging results for RoBERTa model
	results.RobertaResults.AverageResults()

	tmpHeap := models.HeapNegativeComments(make([]*models.NegativeComment, 0))
	tmpLimit := int(math.Ceil(float64(results.NegativeComments.Len()) * 0.2))
	if tmpLimit < results.NegativeCommentsLimit {
		results.NegativeCommentsLimit = tmpLimit
	}
	for results.NegativeComments.Len() > 0 {
		item := heap.Pop(results.NegativeComments).(*models.NegativeComment)
		if tmpHeap.Len() <= results.NegativeCommentsLimit {
			heap.Push(&tmpHeap, item)
		} else {
			break
		}
	}
	results.NegativeComments = &tmpHeap
	if results.NegativeCommentsLimit > 0 {
		recommendation, err := GetRecommendation(results)
		if err != nil {
			results.RecommendationChatGPT = ""
			return results, err
		}
		results.RecommendationChatGPT = recommendation
	}
	return results, nil
}

func GetRecommendation(results *models.YoutubeAnalysisResults) (string, error) {
	maxNumOfTokens := 4000
	message := strings.Builder{}
	message.WriteString(
		"You're a world class social media content advisor, summarize this comments and give me a recommendation in one paragraph to improve my content based on these comments:\n",
	)
	for _, negative := range []*models.NegativeComment(*results.NegativeComments) {
		tmpMessage := fmt.Sprintf("-%s\n", negative.Comment.TextCleaned)
		tmpChatPrompt := []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleUser,
				Content: message.String() + tmpMessage,
			},
		}
		if NumTokensFromMessages(tmpChatPrompt, "gpt-3.5-turbo") > maxNumOfTokens {
			log.Printf("[GetRecommendation] max number of tokens (%d) reached!\nStarting analysis...",
				maxNumOfTokens)
			break
		}
		message.WriteString(tmpMessage)
	}
	resp, err := Chat(message.String())
	if err != nil {
		return "", err
	}
	return resp.Choices[0].Message.Content, nil
}
