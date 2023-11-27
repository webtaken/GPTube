/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from '@/gptube-api'

import BertStats from './BertStats'
import RobertaStats from './RobertaStats'

interface MainStatisticsProps extends ModelsYoutubeVideoAnalyzed {
  isLoading: boolean
}

export function MainStatistics({ results, isLoading }: MainStatisticsProps) {
  if (isLoading) {
    return <p className="font-semibold">Loading stats...</p>
  }

  return (
    <>
      <section className="w-full px-8 py-4 my-4 border rounded shadow-sm">
        <h1 className="text-xl font-bold">Agent recommendation</h1>
        <p className="py-4 text-base">
          This recommendation is based on the most negative comments you received in your video.
          Such comments may stem from discomfort with the discussed topic, disagreement with your
          views, or simply the presence of detractors. We don&apos;t have the truth maybe your
          channel treats controversial topics so don&apos;t take it to seriously 😉.
        </p>
        <section>
          <p className="h-56 py-2 pl-3 overflow-auto text-sm whitespace-pre-line rounded-lg bg-slate-50">
            {results?.recommendationChatGpt}
          </p>
        </section>
      </section>
      <div className="grid grid-cols-2 gap-4 pb-4">
        <BertStats results={results} />
        <RobertaStats results={results} />
      </div>
    </>
  )
}
