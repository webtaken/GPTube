export const videoQueryKeys = {
  videoPreview: (videoURL: string) => ['video-preview', videoURL] as const,
  videosAnalyzed: (args: { email: string; page: number; pageSize: number }) =>
    ['videos-analyzed', { ...args }] as const,
  videoLanding: () => ['video-landing'] as const,
}
