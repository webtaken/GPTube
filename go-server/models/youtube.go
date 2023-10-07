package models

import (
	"time"

	"google.golang.org/api/youtube/v3"
)

type YoutubePreAnalyzerReqBody struct {
	VideoID string `json:"video_id"`
}

type YoutubePreAnalyzerRespBody struct {
	VideoID       string                `json:"video_id,omitempty"`
	NumOfComments int                   `json:"number_of_comments,omitempty"`
	RequiresEmail bool                  `json:"requires_email,omitempty"`
	Snippet       *youtube.VideoSnippet `json:"snippet,omitempty"`
}

type YoutubeAnalyzerLandingReqBody struct {
	VideoID string `json:"video_id,omitempty" example:"1xoy8Q5o8ws"`
}

type YoutubeAnalyzerLandingRespBody struct {
	VideoID   string                         `json:"video_id" firestore:"video_id"`
	Snippet   *youtube.VideoSnippet          `json:"snippet,omitempty" firestore:"snippet,omitempty"`
	Email     string                         `json:"email" firestore:"-"`
	CreatedAt time.Time                      `json:"created_at" firestore:"created_at"`
	Results   *YoutubeAnalysisLandingResults `json:"results" firestore:"results,omitempty"`
}

type YoutubeAnalyzerReqBody struct {
	VideoID    string `json:"video_id,omitempty"`
	VideoTitle string `json:"video_title,omitempty"`
	OwnerEmail string `json:"owner_email"` // The email of the account sending the request
	Email      string `json:"email,omitempty"`
}

type YoutubeAnalyzerRespBody struct {
	VideoID    string                  `json:"video_id" firestore:"video_id"`
	VideoTitle string                  `json:"video_title,omitempty" firestore:"video_title,omitempty"`
	OwnerEmail string                  `json:"owner_email" firestore:"-"`
	Email      string                  `json:"email" firestore:"-"`
	CreatedAt  time.Time               `json:"created_at" firestore:"created_at"`
	LastUpdate time.Time               `json:"last_update" firestore:"last_update"`
	Results    *YoutubeAnalysisResults `json:"-" firestore:"results,omitempty"`
	ResultsID  string                  `json:"results_id,omitempty" firestore:"-"` // firestore results id
}

type YoutubeAnalysisResults struct {
	VideoID               string             `json:"video_id,omitempty" firestore:"video_id,omitempty"`
	VideoTitle            string             `json:"video_title,omitempty" firestore:"video_title,omitempty"`
	BertResults           *BertAIResults     `json:"bert_results,omitempty" firestore:"bert_results,omitempty"`
	RobertaResults        *RobertaAIResults  `json:"roberta_results,omitempty" firestore:"roberta_results,omitempty"`
	NegativeComments      []*NegativeComment `json:"-" firestore:"-"`
	NegativeCommentsLimit int                `json:"-" firestore:"-"`
	// Recommendation given by ChatGPT based on all the comments retrieved
	RecommendationChatGPT string `json:"recommendation_chat_gpt,omitempty" firestore:"recommendation_chat_gpt,omitempty"`
}

type YoutubeAnalysisLandingResults struct {
	VideoID     string         `json:"video_id,omitempty" firestore:"video_id,omitempty"`
	VideoTitle  string         `json:"video_title,omitempty" firestore:"video_title,omitempty"`
	BertResults *BertAIResults `json:"bert_results,omitempty" firestore:"bert_results,omitempty"`
}
