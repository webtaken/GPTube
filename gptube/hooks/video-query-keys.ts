export const videoQueryKeys = {
  videoPreview: (videoURL: string) => ['video-preview', videoURL] as const,
  videoAnalysis: (videoId: string) => ['video-analysis', videoId] as const,
  videosAnalyzed: (args: { userId: string; page: number; pageSize: number }) =>
    ['videos-analyzed', { ...args }] as const,
  videoStats: (args: { userId: string; videoId: string }) => ['video-stats', { ...args }] as const,
  videoNegativeComments: (args: {
    userId: string
    videoId: string
    page: number
    pageSize: number
  }) => ['video-negative-comments', { ...args }] as const,
  videoLanding: () => ['video-landing'] as const,
}
