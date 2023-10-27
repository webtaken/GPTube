package models

import (
	"time"

	"google.golang.org/api/youtube/v3"
)

// GENERAL MODELS
type YoutubeAnalysisResults struct {
	BertResults           *BertAIResults    `json:"bert_results,omitempty" firestore:"bert_results"`
	RobertaResults        *RobertaAIResults `json:"roberta_results,omitempty" firestore:"roberta_results"`
	RecommendationChatGPT string            `json:"recommendation_chat_gpt,omitempty" firestore:"recommendation_chat_gpt"`
}

type YoutubeVideoAnalyzed struct {
	VideoId          string                  `json:"video_id" firestore:"video_id"`
	CreatedAt        time.Time               `json:"created_at" firestore:"created_at"`
	LastUpdate       time.Time               `json:"last_update" firestore:"last_update"`
	Results          *YoutubeAnalysisResults `json:"results" firestore:"results"`
	Snippet          *youtube.VideoSnippet   `json:"snippet" firestore:"snippet"`
	NegativeComments []*youtube.Comment      `json:"-" firestore:"-"`
}

// Models for the youtube videos endpoint
type YoutubeVideoDashboard struct {
	VideoID    string                `json:"video_id" firestore:"video_id"`
	CreatedAt  time.Time             `json:"created_at" firestore:"created_at"`
	LastUpdate time.Time             `json:"last_update" firestore:"last_update"`
	Snippet    *youtube.VideoSnippet `json:"snippet" firestore:"snippet"`
}

type YoutubeVideosRespBody struct {
	Count    int                     `json:"count" example:"10"`
	Next     *string                 `json:"next" example:"http://example.com"`
	Previous *string                 `json:"previous" example:"http://example.com"`
	Results  []YoutubeVideoDashboard `json:"results"`
}

// Models for the youtube pre-analysis
type YoutubePreAnalyzerReqBody struct {
	VideoID string `json:"video_id"`
}

type YoutubePreAnalyzerRespBody struct {
	VideoID       string                   `json:"video_id"`
	RequiresEmail bool                     `json:"requires_email"`
	Snippet       *youtube.VideoSnippet    `json:"snippet"`
	Statistics    *youtube.VideoStatistics `json:"statistics"`
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
	VideoId string `json:"video_id,omitempty"`
	// The email of the account sending the request
	AccountEmail string `json:"account_email"`
	// The email that will be used to send the results
	Email string `json:"email,omitempty"`
}

type YoutubeAnalyzerRespBody struct {
	VideoId      string                `json:"video_id"`
	AccountEmail string                `json:"account_email"`
	Email        string                `json:"email"`
	VideoResults *YoutubeVideoAnalyzed `json:"video_results"`
}
