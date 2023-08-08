package models

import (
	"time"

	"google.golang.org/api/youtube/v3"
)

type Comment struct {
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
}

type YoutubePreAnalyzerReqBody struct {
	VideoID string `json:"video_id"`
}

type YoutubePreAnalyzerRespBody struct {
	VideoID       string                `json:"video_id,omitempty"`
	NumOfComments int                   `json:"number_of_comments,omitempty"`
	RequiresEmail bool                  `json:"requires_email,omitempty"`
	Snippet       *youtube.VideoSnippet `json:"snippet,omitempty"`
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
	ResultsID  string                  `json:"results_id,omitempty" firestore:"-"` // fireStore results id
}

type YoutubeAnalysisResults struct {
	VideoID               string                `json:"video_id,omitempty" firestore:"video_id,omitempty"`
	VideoTitle            string                `json:"video_title,omitempty" firestore:"video_title,omitempty"`
	BertResults           *BertAIResults        `json:"bert_results,omitempty" firestore:"bert_results,omitempty"`
	RobertaResults        *RobertaAIResults     `json:"roberta_results,omitempty" firestore:"roberta_results,omitempty"`
	NegativeComments      *HeapNegativeComments `json:"-" firestore:"-"`
	NegativeCommentsLimit int                   `json:"-" firestore:"-"`
	// Recommendation given by ChatGPT based on all the comments retrieved
	RecommendationChatGPT string `json:"recommendation_chat_gpt,omitempty" firestore:"recommendation_chat_gpt,omitempty"`
}
