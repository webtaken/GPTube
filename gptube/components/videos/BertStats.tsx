/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from '@/gptube-api'

import { Tooltip } from '@nextui-org/react'
import { HelpCircle } from 'lucide-react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts'

import { ModelScores } from '@/constants/ai-models'

// Temporal

interface Data {
  total: number
  status: ModelScores
  name: string
}

export default function BertStats({ results }: ModelsYoutubeVideoAnalyzed) {
  const data: Data[] = [
    {
      total: results?.bertResults?.score1 || 0,
      status: ModelScores.NEGATIVE,
      name: '😠',
    },
    {
      total: results?.bertResults?.score2 || 0,
      status: ModelScores.BAD,
      name: '😑',
    },
    {
      total: results?.bertResults?.score3 || 0,
      status: ModelScores.NEUTRAL,
      name: '😐',
    },
    {
      total: results?.bertResults?.score4 || 0,
      status: ModelScores.FAIR,
      name: '🙂',
    },
    {
      total: results?.bertResults?.score5 || 0,
      status: ModelScores.POSITIVE,
      name: '😃',
    },
  ]

  if ((results?.bertResults?.errorsCount || 0) > 0) {
    data.push({
      total: results?.bertResults?.errorsCount || 0,
      status: ModelScores.ERROR,
      name: 'Errors ❌',
    })
  }

  return (
    <section className="w-full py-4 border rounded shadow-sm">
      <h1 className="flex items-center gap-2 pl-8 mb-4 text-xl font-bold">
        BERT model results{' '}
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="text-tiny">
                More{' '}
                <a
                  className="font-bold underline"
                  href="https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment"
                  rel="noopener"
                  target="_blank"
                >
                  info
                </a>
              </div>
            </div>
          }
        >
          <HelpCircle className="w-4 h-4" />
        </Tooltip>
      </h1>
      <ResponsiveContainer height={345} width="100%">
        <BarChart
          data={data}
          layout="horizontal"
          margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis axisLine={false} dataKey="name" fontSize={12} stroke="#000a0a" tickLine={false} />
          <YAxis axisLine={false} fontSize={12} stroke="#000a0a" tickLine={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <ReTooltip
            // eslint-disable-next-line react/no-unstable-nested-components
            content={({ active, payload }) => {
              if (active && payload?.length) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { payload: payloadData } = payload[0]
                let label = ''

                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                switch (payloadData?.status) {
                  case ModelScores.NEGATIVE:
                    label = 'Score 1'
                    break
                  case ModelScores.BAD:
                    label = 'Score 2'
                    break
                  case ModelScores.NEUTRAL:
                    label = 'Score 3'
                    break
                  case ModelScores.FAIR:
                    label = 'Score 4'
                    break
                  case ModelScores.ERROR:
                    label = 'Errors'
                    break
                  default:
                    label = 'Score 5'
                }

                return (
                  <div className="p-2 text-base rounded-md bg-foreground-50">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">
                      {payloadData?.total} of {results?.bertResults?.successCount || 0} comments
                    </p>
                  </div>
                )
              }

              return null
            }}
          />
          <Bar dataKey="total" fill="black" radius={[4, 4, 0, 0]}>
            {data.map(entry => {
              if (entry.status === ModelScores.ERROR && entry.total === 0) {
                return null
              }

              return (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={entry.status === ModelScores.ERROR ? '#f31260' : '#5CB85C'}
                  fillOpacity={0.8}
                />
              )
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="px-8 text-sm text-center">
        <span className="font-bold">BERT</span> is our rate model that ranks the overall
        satisfaction of your users in a scale from <span className="font-bold">1 to 5</span>, where
        5 is an excellent opinion of your content and 1 is a bad opinion.
      </p>
    </section>
  )
}
