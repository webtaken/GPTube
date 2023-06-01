export interface YoutubeComment {
  commentID: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textOriginal: string;
  textDisplay: string;
  likeCount: number;
}

export interface NegativeYoutubeComment {
  comment: YoutubeComment;
  priority: number;
}

export interface BertResults {
  score_1: number;
  score_2: number;
  score_3: number;
  score_4: number;
  score_5: number;
  success_count: number;
  errors_count: number;
}

export interface RobertaResults {
  positive: number;
  neutral: number;
  negative: number;
  success_count: number;
  errors_count: number;
}

export interface AnalysisResults {
  video_id: string;
  video_title: string;
  results: {
    bert_results: BertResults;
    roberta_results: RobertaResults;
    negative_comments: NegativeYoutubeComment[];
    recommendation_chat_gpt: string;
  };
}
