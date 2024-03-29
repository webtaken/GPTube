package services

import (
	"fmt"
	"gptube/config"
	"gptube/models"
	"gptube/utils"
	"log"
	"math"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/youtube/v3"
)

var huggingFaceAuthHeader = fmt.Sprintf("Bearer %s", config.Config("HUGGING_FACE_TOKEN"))
var AIEndpoints = map[string]string{
	"bert": fmt.Sprintf(
		"%s/models/nlptown/bert-base-multilingual-uncased-sentiment",
		config.Config("AI_SERVER_URL"),
	),
	"roberta": fmt.Sprintf(
		"%s/models/cardiffnlp/twitter-xlm-roberta-base-sentiment",
		config.Config("AI_SERVER_URL"),
	),
}

func CheckAIModelsWork(modelsKeys ...string) error {
	payload := []byte(`{"inputs":"i love you"}`)
	if len(modelsKeys) > 0 {
		for _, model := range modelsKeys {
			if modelEndpoint, ok := AIEndpoints[model]; ok {
				agent := fiber.AcquireAgent()
				req := agent.Request()
				req.Header.Set("Authorization", huggingFaceAuthHeader)
				req.Header.Set("Content-Type", "application/json")
				req.Header.SetMethod(fiber.MethodPost)
				req.SetRequestURI(modelEndpoint)
				agent.Body(payload)
				if err := agent.Parse(); err != nil {
					log.Println("[CheckAIModelsWork] error making the request: ", err)
					return err
				}
				code, _, errs := agent.String()
				if code != http.StatusOK && len(errs) > 0 {
					log.Println("[CheckAIModelsWork] error in response: ", errs[0])
					return errs[0]
				}
			}
		}
		return nil
	}

	for _, endpoint := range AIEndpoints {
		agent := fiber.AcquireAgent()
		req := agent.Request()
		req.Header.Set("Authorization", huggingFaceAuthHeader)
		req.Header.Set("Content-Type", "application/json")
		req.Header.SetMethod(fiber.MethodPost)
		req.SetRequestURI(endpoint)
		agent.Body(payload)
		if err := agent.Parse(); err != nil {
			log.Println("[CheckAIModelsWork] error making the request: ", err)
			return err
		}
		code, _, errs := agent.String()
		if code != http.StatusOK && len(errs) > 0 {
			log.Println("[CheckAIModelsWork] error in response: ", errs[0])
			return errs[0]
		}
	}
	return nil
}

func MakeAICall(endpoint string, reqBody interface{}, resBody interface{}) error {
	agent := fiber.AcquireAgent()
	req := agent.Request()
	req.Header.Set("Authorization", huggingFaceAuthHeader)
	req.Header.Set("Content-Type", "application/json")
	req.Header.SetMethod(fiber.MethodPost)
	req.SetRequestURI(endpoint)
	agent.JSON(reqBody)
	if err := agent.Parse(); err != nil {
		log.Printf("[MakeAICall] error making the request: %v\n", err)
		return err
	}

	code, bodyStr, errs := agent.Struct(resBody)
	if code != http.StatusOK && len(errs) > 0 {
		log.Printf("[MakeAICall] error in response: %v\n", errs[0])
		log.Printf("[MakeAICall] bodyStr: %v\n", string(bodyStr))
		return errs[0]
	}
	return nil
}

func CleanCommentsForAIModels(comments []*youtube.CommentThread) ([]*youtube.Comment, []string) {
	validYoutubeComments := make([]*youtube.Comment, 0)
	cleanedComments := make([]string, 0)
	maxCharsAllowed := 512
	for _, comment := range comments {
		clean := utils.CleanComment(comment.Snippet.TopLevelComment.Snippet.TextOriginal)
		if len(clean) <= maxCharsAllowed {
			cleanedComments = append(cleanedComments, clean)
			validYoutubeComments = append(validYoutubeComments, comment.Snippet.TopLevelComment)
		}
	}
	return validYoutubeComments, cleanedComments
}

func RobertaAnalysis(
	originalComments []*youtube.CommentThread,
	cleanedComments []*youtube.Comment,
	cleanedAIInputs []string) (*models.ResRobertaAI, *models.RobertaAIResults, error) {
	tmpResults := &models.RobertaAIResults{}
	reqRoberta := models.ReqRobertaAI{Inputs: make([]string, 0)}
	resRoberta := models.ResRobertaAI{}

	reqRoberta.Inputs = cleanedAIInputs
	tmpResults.ErrorsCount += len(originalComments) - len(cleanedComments)

	err := MakeAICall(AIEndpoints["roberta"], &reqRoberta, &resRoberta)
	if err != nil {
		log.Printf("[RobertaAnalysis] error making the request: %v", err)
		tmpResults.ErrorsCount += len(cleanedComments)
		return nil, tmpResults, err
	}

	tmpResults.SuccessCount = len(resRoberta)

	callback := func(commentResults models.ResAISchema) {
		for _, result := range commentResults {
			if result.Label == "Negative" || result.Label == "negative" {
				tmpResults.Negative += result.Score
			} else if result.Label == "Neutral" || result.Label == "neutral" {
				tmpResults.Neutral += result.Score
			} else {
				tmpResults.Positive += result.Score
			}
		}
	}

	for _, res := range resRoberta {
		callback(res)
	}

	return &resRoberta, tmpResults, nil
}

func BertAnalysis(
	originalComments []*youtube.CommentThread,
	cleanedComments []*youtube.Comment,
	cleanedAIInputs []string,
) (*models.ResBertAI, *models.BertAIResults, error) {
	tmpResults := &models.BertAIResults{}
	reqBert := models.ReqBertAI{Inputs: make([]string, 0)}
	resBert := models.ResBertAI{}

	reqBert.Inputs = cleanedAIInputs
	tmpResults.ErrorsCount += len(originalComments) - len(cleanedComments)

	err := MakeAICall(AIEndpoints["bert"], &reqBert, &resBert)
	if err != nil {
		log.Printf("[BertAnalysis] error making the request: %v", err)
		tmpResults.ErrorsCount += len(cleanedComments)
		return nil, tmpResults, err
	}

	tmpResults.SuccessCount = len(resBert)

	callback := func(commentResults models.ResAISchema) {
		tmpBertScore := models.ResAISchema{{
			Label: "1 star",
			Score: math.Inf(-1),
		}}[0]

		for _, result := range commentResults {
			if result.Score > tmpBertScore.Score {
				tmpBertScore.Label = result.Label
				tmpBertScore.Score = result.Score
			}
		}

		switch tmpBertScore.Label {
		case "1 star":
			tmpResults.Score1++
		case "2 stars":
			tmpResults.Score2++
		case "3 stars":
			tmpResults.Score3++
		case "4 stars":
			tmpResults.Score4++
		default:
			tmpResults.Score5++
		}
	}

	for _, res := range resBert {
		callback(res)
	}

	return &resBert, tmpResults, nil
}
