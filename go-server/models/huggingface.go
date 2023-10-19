package models

import "gptube/utils"

type BertAIResults struct {
	Score1       int `json:"score_1" firestore:"score_1"`
	Score2       int `json:"score_2" firestore:"score_2"`
	Score3       int `json:"score_3" firestore:"score_3"`
	Score4       int `json:"score_4" firestore:"score_4"`
	Score5       int `json:"score_5" firestore:"score_5"`
	SuccessCount int `json:"success_count" firestore:"success_count"`
	ErrorsCount  int `json:"errors_count" firestore:"errors_count"`
}

type ReqBertAI struct {
	Inputs []string `json:"inputs"`
}

type ResAISchema []struct {
	Label string  `json:"label"`
	Score float64 `json:"score"`
}

type ResBertAI []ResAISchema

type RobertaAIResults struct {
	Negative     float64 `json:"negative" firestore:"negative"`
	Neutral      float64 `json:"neutral" firestore:"neutral"`
	Positive     float64 `json:"positive" firestore:"positive"`
	SuccessCount int     `json:"success_count" firestore:"success_count"`
	ErrorsCount  int     `json:"errors_count" firestore:"errors_count"`
}

// We average the results to show the correct answer
func (res *RobertaAIResults) AverageResults() {
	res.Negative /= float64(res.SuccessCount)
	res.Neutral /= float64(res.SuccessCount)
	res.Positive /= float64(res.SuccessCount)
	res.Negative = utils.RoundFloat(res.Negative, 4)
	res.Positive = utils.RoundFloat(res.Positive, 4)
	res.Neutral = utils.RoundFloat(res.Neutral, 4)
}

type ReqRobertaAI struct {
	Inputs []string `json:"inputs"`
}

type ResRobertaAI []ResAISchema
