package services

import (
	"bytes"
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
	"sync/atomic"
	"text/template"

	"github.com/sashabaranov/go-openai"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

var Service *youtube.Service

var commentsPerSubscription = map[string]int{
	"landing": 250,
	"free":    500,
	"hobby":   1000,
	"popular": 5000,
}

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

func SendYoutubeSuccessEmailTemplate(data models.YoutubeAnalyzerRespBody, subject string, emails []string) error {
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

func SendYoutubeErrorEmailTemplate(subject string, emails []string) error {
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

func GetVideoData(videoID string) (*youtube.VideoListResponse, error) {
	var part = []string{"snippet", "contentDetails", "statistics"}
	call := Service.Videos.List(part)
	call.Id(videoID)
	response, err := call.Do()
	if err != nil {
		return nil, err
	}
	return response, nil
}

func CanProcessVideo(youtubeRequestBody *models.YoutubePreAnalyzerReqBody) (*youtube.VideoListResponse, error) {
	// The max number of comments we can process
	maxNumberOfComments, _ := strconv.Atoi(config.Config("YOUTUBE_MAX_COMMENTS_CAPACITY"))

	response, err := GetVideoData(youtubeRequestBody.VideoID)
	if err != nil {
		return nil, err
	}
	if len(response.Items) == 0 {
		return nil, fmt.Errorf("video doesn't have any comments")
	} else if response.Items[0].Statistics.CommentCount > uint64(maxNumberOfComments) {
		return nil, fmt.Errorf("number of comments exceeded, max %v", maxNumberOfComments)
	}
	return response, nil
}

func AnalyzeComments(
	videoID string,
	maxNumComments int, analyzer func([]*youtube.CommentThread)) int {
	var part = []string{"id", "snippet"}
	nextPageToken := ""
	call := Service.CommentThreads.List(part)
	pageSize := 20
	call.VideoId(videoID)
	call.MaxResults(int64(pageSize))
	commentsRetrieved := 0
	commentsRetrieveFailed := 0
	for commentsRetrieved < maxNumComments {
		if nextPageToken != "" {
			call.PageToken(nextPageToken)
		}

		response, err := call.Do()
		if err != nil {
			log.Printf("[AnalyzeComments] %v\n", err)
			commentsRetrieveFailed += pageSize
			continue
		}

		commentsToAnalyze := len(response.Items)
		if commentsRetrieved+commentsToAnalyze >= maxNumComments {
			commentsToAnalyze = maxNumComments - commentsRetrieved
		}
		commentsRetrieved += commentsToAnalyze
		fmt.Println(commentsRetrieved)

		go analyzer(response.Items[:commentsToAnalyze])

		nextPageToken = response.NextPageToken
		if nextPageToken == "" {
			break
		}
	}
	return commentsRetrieveFailed
}

func Analyze(body models.YoutubeAnalyzerReqBody, plan string) (*models.YoutubeAnalysisResults, error) {
	negCommentsLimit, _ := strconv.Atoi(config.Config("YOUTUBE_NEGATIVE_COMMENTS_LIMIT"))
	results := &models.YoutubeAnalysisResults{
		BertResults:           &models.BertAIResults{},
		RobertaResults:        &models.RobertaAIResults{},
		NegativeComments:      make([]*models.NegativeComment, 0),
		NegativeCommentsLimit: negCommentsLimit,
	}
	maxNumComments := commentsPerSubscription[plan]
	maxNumComments = 2000

	// Check if AI services are running before calling Youtube API
	err := CheckAIModelsWork()

	if err != nil {
		return nil, err
	}

	// A max of 10 concurrent workers processing a batch of messages
	workers := make(chan struct{}, 10)
	var wg sync.WaitGroup
	analyzer := func(comments []*youtube.CommentThread) {
		wg.Add(1)
		workers <- struct{}{} // entering a worker to the pool
		defer func() {
			wg.Done()
			<-workers // free a worker
		}()
		cleanedComments, cleanedInputs := CleanCommentsForAIModels(comments)
		var wgAI sync.WaitGroup
		var errBert, errRoberta error
		var resBert *models.ResBertAI
		var resRoberta *models.ResRobertaAI
		var bertResults *models.BertAIResults
		var robertaResults *models.RobertaAIResults

		wgAI.Add(2)
		go func() {
			defer wgAI.Done()
			resBert, bertResults, errBert = BertAnalysis(comments, cleanedComments, cleanedInputs)
		}()
		go func() {
			defer wgAI.Done()
			resRoberta, robertaResults, errRoberta = RobertaAnalysis(comments, cleanedComments, cleanedInputs)
		}()
		wgAI.Wait()

		if errBert != nil || errRoberta != nil {
			if errBert != nil {
				log.Printf("[Analyze] bert_analysis_error %v\n", errBert)
				Mutex.Lock()
				results.BertResults.ErrorsCount += bertResults.ErrorsCount
				Mutex.Unlock()
			}
			if errRoberta != nil {
				log.Printf("[Analyze] roberta_analysis_error %v\n", errRoberta)
				Mutex.Lock()
				results.RobertaResults.ErrorsCount += robertaResults.ErrorsCount
				Mutex.Unlock()
			}
			return
		}

		tmpNegativeComments := make([]*models.NegativeComment, 0)
		for i := 0; i < len(*resBert); i++ {
			tmpBertScore := models.ResAISchema{{
				Label: "1 star",
				Score: math.Inf(-1),
			}}[0]
			resultsBERT := []models.ResAISchema(*resBert)
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
			resultsRoBERTa := []models.ResAISchema(*resRoberta)
			for _, result := range resultsRoBERTa[i] {
				if result.Score > tmpRobertaScore.Score {
					tmpRobertaScore.Label = result.Label
					tmpRobertaScore.Score = result.Score
				}
			}

			if (tmpBertScore.Label == "1 star" || tmpBertScore.Label == "2 stars") &&
				(tmpRobertaScore.Label == "Negative" || tmpRobertaScore.Label == "negative") {
				badComment := models.NegativeComment{
					CommentID:             cleanedComments[i].Id,
					TextDisplay:           cleanedComments[i].Snippet.TextDisplay,
					TextOriginal:          cleanedComments[i].Snippet.TextOriginal,
					TextCleaned:           cleanedInputs[i],
					AuthorDisplayName:     cleanedComments[i].Snippet.AuthorDisplayName,
					AuthorProfileImageUrl: cleanedComments[i].Snippet.AuthorProfileImageUrl,
					ParentID:              cleanedComments[i].Snippet.ParentId,
					LikeCount:             cleanedComments[i].Snippet.LikeCount,
					ModerationStatus:      cleanedComments[i].Snippet.ModerationStatus,
					// We set the score as the average of the two scores
					Priority: (tmpRobertaScore.Score + tmpBertScore.Score) / 2,
				}
				tmpNegativeComments = append(tmpNegativeComments, &badComment)
			}
		}

		// Writing response to the global result
		Mutex.Lock()
		// BERT
		results.BertResults.Score1 += bertResults.Score1
		results.BertResults.Score2 += bertResults.Score2
		results.BertResults.Score3 += bertResults.Score3
		results.BertResults.Score4 += bertResults.Score4
		results.BertResults.Score5 += bertResults.Score5
		results.BertResults.ErrorsCount += bertResults.ErrorsCount
		results.BertResults.SuccessCount += bertResults.SuccessCount
		// RoBERTa
		results.RobertaResults.Positive += robertaResults.Positive
		results.RobertaResults.Negative += robertaResults.Negative
		results.RobertaResults.Neutral += robertaResults.Neutral
		results.RobertaResults.ErrorsCount += robertaResults.ErrorsCount
		results.RobertaResults.SuccessCount += robertaResults.SuccessCount

		// Adding most negative comments
		results.NegativeComments = append(results.NegativeComments, tmpNegativeComments...)
		Mutex.Unlock()
	}

	failedComments := AnalyzeComments(body.VideoID, maxNumComments, analyzer)

	wg.Wait()

	results.BertResults.ErrorsCount += failedComments
	results.RobertaResults.ErrorsCount += failedComments

	// Averaging results for RoBERTa model
	results.RobertaResults.AverageResults()

	// tmpLimit := int(math.Ceil(float64(len(results.NegativeComments)) * 0.2))
	// tmpNegativeComments := make([]*models.NegativeComment, 0)
	// if tmpLimit < results.NegativeCommentsLimit {
	// 	results.NegativeCommentsLimit = tmpLimit
	// }
	// for i := 0; i < results.NegativeCommentsLimit; i++ {
	// 	tmpNegativeComments = append(tmpNegativeComments, results.NegativeComments[i])
	// }
	// results.NegativeComments = tmpNegativeComments
	// if results.NegativeCommentsLimit > 0 {
	// 	recommendation, err := GetRecommendation(results)
	// 	if err != nil {
	// 		results.RecommendationChatGPT = ""
	// 		return results, err
	// 	}
	// 	results.RecommendationChatGPT = recommendation
	// }
	return results, nil
}

func AnalyzeForLanding(body models.YoutubeAnalyzerLandingReqBody) (*models.YoutubeAnalysisLandingResults, error) {
	results := &models.YoutubeAnalysisLandingResults{
		BertResults: &models.BertAIResults{},
	}
	maxNumComments := commentsPerSubscription["landing"]

	// Check if AI services are running before calling Youtube API
	err := CheckAIModelsWork("BERT")

	if err != nil {
		return nil, err
	}

	var wg sync.WaitGroup

	// A max of 10 concurrent workers processing a batch of messages
	workers := make(chan struct{}, 10)
	analyzer := func(comments []*youtube.CommentThread) {
		wg.Add(1)
		defer func() {
			wg.Done()
			<-workers // free a worker
		}()
		workers <- struct{}{} // entering a worker to the pool

		cleanedComments, cleanedInputs := CleanCommentsForAIModels(comments)
		resBert, bertResults, errBert := BertAnalysis(comments, cleanedComments, cleanedInputs)
		if errBert != nil {
			log.Printf("[AnalyzeForLanding] bert_analysis_error %v\n", errBert)
			Mutex.Lock()
			// BERT
			results.BertResults.ErrorsCount += bertResults.ErrorsCount
			Mutex.Unlock()
			return
		}

		for _, result := range *resBert {
			tmpBertScore := models.ResAISchema{{
				Label: "1 star",
				Score: math.Inf(-1),
			}}[0]
			for _, r := range result {
				if r.Score > tmpBertScore.Score {
					tmpBertScore.Label = r.Label
					tmpBertScore.Score = r.Score
				}
			}
		}

		// Writing response to the global result
		Mutex.Lock()
		// BERT
		results.BertResults.Score1 += bertResults.Score1
		results.BertResults.Score2 += bertResults.Score2
		results.BertResults.Score3 += bertResults.Score3
		results.BertResults.Score4 += bertResults.Score4
		results.BertResults.Score5 += bertResults.Score5
		results.BertResults.ErrorsCount += bertResults.ErrorsCount
		results.BertResults.SuccessCount += bertResults.SuccessCount
		Mutex.Unlock()
	}

	failedComments := AnalyzeComments(body.VideoID, maxNumComments, analyzer)
	wg.Wait()
	results.BertResults.ErrorsCount += failedComments
	return results, nil
}

type WaitGroupCount struct {
	sync.WaitGroup
	count int64
}

func (wg *WaitGroupCount) Add(delta int) {
	atomic.AddInt64(&wg.count, int64(delta))
	wg.WaitGroup.Add(delta)
}

func (wg *WaitGroupCount) Done() {
	atomic.AddInt64(&wg.count, -1)
	wg.WaitGroup.Done()
}

func (wg *WaitGroupCount) GetCount() int {
	return int(atomic.LoadInt64(&wg.count))
}

func GetRecommendation(results *models.YoutubeAnalysisResults) (string, error) {
	maxNumOfTokens := 4000
	message := strings.Builder{}
	for _, negative := range results.NegativeComments {
		message.WriteString(fmt.Sprintf("-%s\n", negative.TextCleaned))
		if NumTokensFromMessages([]openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleSystem,
				Content: "You're a professional social media content advisor. I'll give you a list of comments summarize this comments and give me a recommendation in one paragraph to improve my content",
			},
			{
				Role:    openai.ChatMessageRoleUser,
				Content: message.String() + message.String(),
			},
		}, "gpt-3.5-turbo") > maxNumOfTokens {
			log.Printf("[GetRecommendation] max number of tokens (%d) reached!\nStarting analysis...",
				maxNumOfTokens)
			break
		}
	}
	resp, err := Chat(message.String())
	if err != nil {
		return "", err
	}
	return resp.Choices[0].Message.Content, nil
}
