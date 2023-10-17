package models

import (
	"time"

	"google.golang.org/api/youtube/v3"
)

// Models for the youtube pre-analysis
type YoutubePreAnalyzerReqBody struct {
	VideoID string `json:"video_id"`
}

type YoutubePreAnalyzerRespBody struct {
	VideoID       string                   `json:"video_id,omitempty"`
	RequiresEmail bool                     `json:"requires_email,omitempty"`
	Snippet       *youtube.VideoSnippet    `json:"snippet,omitempty"`
	Statistics    *youtube.VideoStatistics `json:"statistics,omitempty"`
}

// Models for the youtube analysis landing page
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

type YoutubeAnalysisLandingResults struct {
	VideoID     string         `json:"video_id,omitempty" firestore:"video_id,omitempty"`
	VideoTitle  string         `json:"video_title,omitempty" firestore:"video_title,omitempty"`
	BertResults *BertAIResults `json:"bert_results,omitempty" firestore:"bert_results,omitempty"`
}

// Models for the youtube analysis
type YoutubeAnalyzerReqBody struct {
	VideoID string `json:"video_id,omitempty"`
	// The email of the account sending the request
	AccountEmail string `json:"account_email"`
	// The email that will be used to send the results
	Email string `json:"email,omitempty"`
}

type YoutubeAnalyzerRespBody struct {
	VideoID      string                  `json:"video_id" firestore:"video_id"`
	AccountEmail string                  `json:"account_email" firestore:"-"`
	Email        string                  `json:"email" firestore:"-"`
	CreatedAt    time.Time               `json:"created_at" firestore:"created_at"`
	LastUpdate   time.Time               `json:"last_update" firestore:"last_update"`
	Results      *YoutubeAnalysisResults `json:"-" firestore:"results,omitempty"`
	Snippet      *youtube.VideoSnippet   `json:"-" firestore:"snippet,omitempty"`
	ResultsID    string                  `json:"results_id,omitempty" firestore:"-"` // firestore results id
}

type YoutubeAnalysisResults struct {
	VideoID               string             `json:"video_id,omitempty" firestore:"video_id,omitempty"`
	BertResults           *BertAIResults     `json:"bert_results,omitempty" firestore:"bert_results,omitempty"`
	RobertaResults        *RobertaAIResults  `json:"roberta_results,omitempty" firestore:"roberta_results,omitempty"`
	NegativeComments      []*youtube.Comment `json:"-" firestore:"-"`
	NegativeCommentsLimit int                `json:"-" firestore:"-"`
	// Recommendation given by ChatGPT based on all the comments retrieved
	RecommendationChatGPT string `json:"recommendation_chat_gpt,omitempty" firestore:"recommendation_chat_gpt,omitempty"`
}
