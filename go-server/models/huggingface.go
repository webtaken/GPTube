package models

import "gptube/utils"

type NegativeComment struct {
	Comment *Comment `json:"comment,omitempty" firestore:"comment"`
	// Priority is how bad this comment is considered by AI model
	Priority float64 `json:"priority,omitempty" firestore:"priority"`
	Index    int     `json:"-" firestore:"-"`
}

type HeapNegativeComments []*NegativeComment

func (pq HeapNegativeComments) Len() int { return len(pq) }
func (pq HeapNegativeComments) Less(i, j int) bool {
	return pq[i].Priority > pq[j].Priority // we sort by the highest value of bad comment
}
func (pq HeapNegativeComments) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}
func (pq *HeapNegativeComments) Push(x any) {
	n := len(*pq)
	item := x.(*NegativeComment)
	item.Index = n
	*pq = append(*pq, item)
}
func (pq *HeapNegativeComments) Pop() any {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil  // avoid memory leak
	item.Index = -1 // for safety
	*pq = old[0 : n-1]
	return item
}

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
