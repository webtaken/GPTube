import type { ModelsYoutubeAnalyzerLandingRespBody } from '@/gptube-api'

import {
  Card,
  Divider,
  useDisclosure,
  Skeleton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'

import { useLandingAnalysisFromCache } from '@/hooks/use-landing-analysis'

import { rubikFont } from '../Common/fonts'

import { ContentLandingAnalysis } from './content-landing-analysis'

export function AnalysisLanding({
  analysis,
}: {
  analysis: {
    data: ModelsYoutubeAnalyzerLandingRespBody | undefined
    isLoading: boolean
  }
}) {
  const { onOpenChange, isOpen } = useDisclosure()
  const { analysisCacheQuery } = useLandingAnalysisFromCache()

  const bertResults =
    analysis.data?.results?.bertResults ?? analysisCacheQuery.data?.results?.bertResults
  const videoMetadata = analysis.data?.snippet ?? analysisCacheQuery.data?.snippet

  const videoIdRender = analysis.data?.videoId ?? analysisCacheQuery.data?.videoId

  return (
    <>
      <Card fullWidth className="p-4 h-[40rem] bg-gray-100">
        {analysis.isLoading || analysisCacheQuery.isFetching ? (
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="w-3/5 h-3 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="w-4/5 h-3 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="w-2/5 h-3 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        ) : (
          <>
            {videoMetadata && bertResults ? (
              <ContentLandingAnalysis
                bertResults={bertResults}
                handleFullAnalysis={onOpenChange}
                videoId={videoIdRender ?? ''}
                videoMetadata={videoMetadata}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl font-bold">No analysis yet</p>
                <p className="text-base opacity-70">
                  Paste a YouTube video link to analyze it is completely free
                </p>
              </div>
            )}
          </>
        )}
      </Card>
      <Modal
        className={rubikFont.className}
        isOpen={isOpen}
        radius="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-2">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">Features that are you missing</h3>
                <Divider />
              </ModalHeader>
              <ModalBody>Roberta model</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
