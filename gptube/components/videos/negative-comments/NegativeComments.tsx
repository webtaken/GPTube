/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoNegativeCommentsRespBody } from '@/gptube-api'

import { NegativeCommentCard } from './NegativeCommentCard'

interface NegativeCommentsProps extends ModelsYoutubeVideoNegativeCommentsRespBody {
  isLoading: boolean
  isFetching: boolean
}

export function NegativeComments({ results, isLoading, isFetching }: NegativeCommentsProps) {
  return (
    <div className="w-full pb-5">
      {isLoading || isFetching ? (
        <p>Loading comments....</p>
      ) : (
        <div className="space-y-2">
          {results?.map(result => {
            return <NegativeCommentCard key={result.id} id={result.id} snippet={result.snippet} />
          })}
        </div>
      )}
    </div>
  )
}
