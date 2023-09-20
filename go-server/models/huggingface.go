package models

import "gptube/utils"

type NegativeComment struct {
	CommentID             string `json:"commentID,omitempty" firestore:"commentID,omitempty"`
	TextDisplay           string `json:"textDisplay,omitempty" firestore:"textDisplay,omitempty"`
	TextOriginal          string `json:"textOriginal,omitempty" firestore:"textOriginal,omitempty"`
	TextCleaned           string `json:"textCleaned,omitempty" firestore:"textCleaned,omitempty"`
	AuthorDisplayName     string `json:"authorDisplayName,omitempty" firestore:"authorDisplayName,omitempty"`
	AuthorProfileImageUrl string `json:"authorProfileImageUrl,omitempty" firestore:"authorProfileImageUrl,omitempty"`
	ParentID              string `json:"parentID,omitempty" firestore:"parentID,omitempty"`
	LikeCount             int64  `json:"likeCount,omitempty" firestore:"likeCount,omitempty"`
	// ModerationStatus: The comment's moderation status. Will not be set if
	// the comments were requested through the id filter.
	//
	// Possible values:
	//   "published" - The comment is available for public display.
	//   "heldForReview" - The comment is awaiting review by a moderator.
	//   "likelySpam"
	//   "rejected" - The comment is unfit for display.
	ModerationStatus string `json:"moderationStatus,omitempty" firestore:"moderationStatus,omitempty"`
	// Score given to the comment
	Priority float64 `json:"priority,omitempty" firestore:"priority"`
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
