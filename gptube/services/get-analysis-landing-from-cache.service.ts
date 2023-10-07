import type { ModelsYoutubeAnalyzerLandingRespBody } from '@/gptube-api'

import { KEY_ANALYSIS_LANDING } from '@/constants'

export function getAnalysisLandingFromCache() {
  const analysis = localStorage.getItem(KEY_ANALYSIS_LANDING)

  if (analysis) {
    return JSON.parse(analysis) as ModelsYoutubeAnalyzerLandingRespBody
  }

  return null
}
