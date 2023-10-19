package services

import (
	"bytes"
	"context"
	"fmt"
	"gptube/config"
	"gptube/models"
	"gptube/utils"
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

// The hole system will have a max of 200 concurrent workers
var Workers = make(chan struct{}, 200)

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
	response, err := GetVideoData(youtubeRequestBody.VideoID)
	if err != nil {
		return nil, err
	}
	if len(response.Items) == 0 {
		return nil, fmt.Errorf("video doesn't have any comments")
	}
	return response, nil
}

func AnalyzeComments(
	videoID string,
	maxNumComments int,
	analyzer func([]*youtube.CommentThread)) int {
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
		// fmt.Printf("%v\n", commentsRetrieved)
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
		NegativeComments:      make([]*youtube.Comment, 0),
		NegativeCommentsLimit: negCommentsLimit,
	}
	maxNumComments := commentsPerSubscription[plan]

	// Check if AI services are running before calling Youtube API
	err := CheckAIModelsWork()

	if err != nil {
		return nil, err
	}

	var wg sync.WaitGroup
	var mutex sync.Mutex
	analyzer := func(comments []*youtube.CommentThread) {
		wg.Add(1)
		Workers <- struct{}{} // entering a worker to the pool
		defer func() {
			wg.Done()
			<-Workers // free a worker
		}()
		cleanedComments, cleanedInputs := CleanCommentsForAIModels(comments)
		negativeCommentsBert := make(map[string]*youtube.Comment, 0)
		negativeCommentsRoberta := make(map[string]*youtube.Comment, 0)
		var wgAI sync.WaitGroup
		wgAI.Add(2)
		go func() {
			defer wgAI.Done()
			resBert, bertResults, errBert := BertAnalysis(comments, cleanedComments, cleanedInputs)
			if errBert != nil {
				log.Printf("[Analyze] bert_analysis_error %v\n", errBert)
				mutex.Lock()
				results.BertResults.ErrorsCount += bertResults.ErrorsCount
				mutex.Unlock()
				return
			}
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
				if tmpBertScore.Label == "1 star" || tmpBertScore.Label == "2 stars" {
					negativeCommentsBert[cleanedComments[i].Id] = cleanedComments[i]
				}
			}

			// Writing response to the global result
			mutex.Lock()
			results.BertResults.Score1 += bertResults.Score1
			results.BertResults.Score2 += bertResults.Score2
			results.BertResults.Score3 += bertResults.Score3
			results.BertResults.Score4 += bertResults.Score4
			results.BertResults.Score5 += bertResults.Score5
			results.BertResults.ErrorsCount += bertResults.ErrorsCount
			results.BertResults.SuccessCount += bertResults.SuccessCount
			mutex.Unlock()
		}()
		go func() {
			defer wgAI.Done()
			resRoberta, robertaResults, errRoberta := RobertaAnalysis(comments, cleanedComments, cleanedInputs)

			if errRoberta != nil {
				log.Printf("[Analyze] roberta_analysis_error %v\n", errRoberta)
				mutex.Lock()
				results.RobertaResults.ErrorsCount += robertaResults.ErrorsCount
				mutex.Unlock()
				return
			}

			for i := 0; i < len(*resRoberta); i++ {
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
				if tmpRobertaScore.Label == "Negative" || tmpRobertaScore.Label == "negative" {
					negativeCommentsRoberta[cleanedComments[i].Id] = cleanedComments[i]
				}
			}
			mutex.Lock()
			results.RobertaResults.Positive += robertaResults.Positive
			results.RobertaResults.Negative += robertaResults.Negative
			results.RobertaResults.Neutral += robertaResults.Neutral
			results.RobertaResults.ErrorsCount += robertaResults.ErrorsCount
			results.RobertaResults.SuccessCount += robertaResults.SuccessCount
			mutex.Unlock()
		}()
		wgAI.Wait()

		tempNegativeComments := make([]*youtube.Comment, 0)
		for id, comment := range negativeCommentsBert {
			if _, ok := negativeCommentsRoberta[id]; ok {
				tempNegativeComments = append(tempNegativeComments, comment)
			}
		}

		mutex.Lock()
		// Adding most negative comments
		if len(results.NegativeComments)+len(tempNegativeComments) > results.NegativeCommentsLimit {
			tempNegativeComments = tempNegativeComments[:results.NegativeCommentsLimit-len(results.NegativeComments)]
		}
		results.NegativeComments = append(results.NegativeComments, tempNegativeComments...)
		mutex.Unlock()
	}
	failedComments := AnalyzeComments(body.VideoID, maxNumComments, analyzer)
	wg.Wait()

	fmt.Printf("[Analyze] Number of failed comments because of youtube API %d\n", failedComments)
	results.BertResults.ErrorsCount += failedComments
	results.RobertaResults.ErrorsCount += failedComments

	// Averaging results for RoBERTa model
	results.RobertaResults.AverageResults()

	fmt.Printf("[Analyze] Number of most negative comments before 30%% handling: %d\n",
		len(results.NegativeComments))
	// We will handle the 30% of all the negative comments
	maxPercentageNegativeComments := 0.3
	results.NegativeCommentsLimit = int(math.Ceil(float64(
		len(results.NegativeComments)) * maxPercentageNegativeComments))
	results.NegativeComments = results.NegativeComments[:results.NegativeCommentsLimit]
	fmt.Printf("[Analyze] Number of most negative comments after 30%% handling: %d\n",
		len(results.NegativeComments))
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
	var mutex sync.Mutex
	analyzer := func(comments []*youtube.CommentThread) {
		wg.Add(1)
		defer func() {
			wg.Done()
			<-Workers // free a worker
		}()
		Workers <- struct{}{} // entering a worker to the pool

		cleanedComments, cleanedInputs := CleanCommentsForAIModels(comments)
		resBert, bertResults, errBert := BertAnalysis(comments, cleanedComments, cleanedInputs)
		if errBert != nil {
			log.Printf("[AnalyzeForLanding] bert_analysis_error %v\n", errBert)
			mutex.Lock()
			// BERT
			results.BertResults.ErrorsCount += bertResults.ErrorsCount
			mutex.Unlock()
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
		mutex.Lock()
		// BERT
		results.BertResults.Score1 += bertResults.Score1
		results.BertResults.Score2 += bertResults.Score2
		results.BertResults.Score3 += bertResults.Score3
		results.BertResults.Score4 += bertResults.Score4
		results.BertResults.Score5 += bertResults.Score5
		results.BertResults.ErrorsCount += bertResults.ErrorsCount
		results.BertResults.SuccessCount += bertResults.SuccessCount
		mutex.Unlock()
	}
	failedComments := AnalyzeComments(body.VideoID, maxNumComments, analyzer)
	wg.Wait()
	results.BertResults.ErrorsCount += failedComments
	return results, nil
}

func GetRecommendation(results *models.YoutubeAnalysisResults) (string, error) {
	maxNumOfTokens := 4000
	message := strings.Builder{}
	message.WriteString("Here is a list of negative comments I received from my video. What's the main reason this comments are posted? Summarize the main reasons in bullet points and give me a final recommendation in one paragraph at the end:\n")
	queryMessages := []openai.ChatCompletionMessage{
		{
			Role:    openai.ChatMessageRoleSystem,
			Content: "You're a professional youtube content moderator and advisor.",
		},
		{
			Role:    openai.ChatMessageRoleUser,
			Content: message.String(),
		},
	}
	for _, negative := range results.NegativeComments {
		message.WriteString(fmt.Sprintf("-%s\n", utils.CleanComment(negative.Snippet.TextOriginal)))
		queryMessages[1].Content = message.String()
		if NumTokensFromMessages(queryMessages, "gpt-3.5-turbo") > maxNumOfTokens {
			log.Printf("[GetRecommendation] max number of tokens (%d) reached!\nStarting analysis...",
				maxNumOfTokens)
			break
		}
	}
	fmt.Printf("[GetRecommendation] Number of tokens: %d\n", NumTokensFromMessages(queryMessages, "gpt-3.5-turbo"))
	resp, err := Chat(queryMessages)
	if err != nil {
		return "", err
	}
	return resp.Choices[0].Message.Content, nil
}
