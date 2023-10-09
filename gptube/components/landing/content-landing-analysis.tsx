import type { ModelsBertAIResults, YoutubeVideoSnippet } from '@/gptube-api'

import { CardHeader, CardBody, CardFooter, Image, Divider } from '@nextui-org/react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

import { YoutubeEmbed } from '../youtube-embed'
import { Button } from '../Common/button'

export function ContentLandingAnalysis({
  bertResults,
  handleFullAnalysis,
  videoId,
  videoMetadata,
}: {
  videoId: string
  bertResults: ModelsBertAIResults
  videoMetadata: YoutubeVideoSnippet
  handleFullAnalysis: () => void
}) {
  const data = [
    {
      total: bertResults.score1,
      name: 'Poor',
    },
    {
      total: bertResults.score2,
      name: 'Fair',
    },
    {
      total: bertResults.score3,
      name: 'Good',
    },
    {
      total: bertResults.score4,
      name: 'Very good',
    },
    {
      total: bertResults.score5,
      name: 'Excellent',
    },
  ]

  return (
    <>
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={videoMetadata.thumbnails?._default?.url}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{videoMetadata.title}</p>
          <p className="text-small text-default-500">{videoMetadata.channelTitle}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <section className="flex flex-col gap-6">
          <p>
            This is an ana lysis of your video, this analysis is based on the comments of your
            video, and it shows you how your video is perceived by the audience.
          </p>
          <section className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
            <YoutubeEmbed embedId={videoId} title="GPTube demo" />
            <ResponsiveContainer height={350} width="100%">
              <BarChart data={data}>
                <XAxis
                  axisLine={false}
                  dataKey="name"
                  fontSize={12}
                  stroke="#000a0a"
                  tickLine={false}
                />
                <YAxis axisLine={false} fontSize={12} stroke="#000a0a" tickLine={false} />
                <Bar dataKey="total" fill="rgba(129,247,172,.425)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </section>
      </CardBody>
      <CardFooter>
        <div className="flex justify-center w-full">
          <Button
            className="px-10 font-medium text-white"
            color="success"
            radius="sm"
            variant="shadow"
            onClick={handleFullAnalysis}
          >
            See full analysis
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
