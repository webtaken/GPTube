/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from '@/gptube-api'

import { Tooltip } from '@nextui-org/react'
import { HelpCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip, Legend } from 'recharts'

import { ModelScores } from '@/constants/ai-models'

const RADIAN = Math.PI / 180

export default function RobertaStats({ results }: ModelsYoutubeVideoAnalyzed) {
  const data = [
    {
      percentageFormatted: Math.round(100 * (results?.robertaResults?.negative || 0)),
      percentage: results?.robertaResults?.negative || 0,
      status: ModelScores.NEGATIVE,
      color: '#f31260',
      name: 'negative 😠',
    },
    {
      percentageFormatted: Math.round(100 * (results?.robertaResults?.neutral || 0)),
      percentage: results?.robertaResults?.neutral || 0,
      status: ModelScores.NEUTRAL,
      color: '#006FEE',
      name: 'neutral 😐',
    },
    {
      percentageFormatted: Math.round(100 * (results?.robertaResults?.positive || 0)),
      percentage: results?.robertaResults?.positive || 0,
      status: ModelScores.POSITIVE,
      color: '#17c964',
      name: 'positive 😃',
    },
  ]

  return (
    <section className="w-full px-8 py-4 border rounded shadow-sm">
      <h1 className="flex items-center gap-2 mb-4 text-xl font-bold">
        RoBERTa model results{' '}
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
        <PieChart height={600} width={600}>
          {/* TODO: Pass this to a separate component to avoid unstable-nested-components, same as bert stats component */}
          <ReTooltip
            content={({ active, payload }) => {
              if (active && payload?.length) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { payload: payloadData } = payload[0]
                let label = ''
                const comments = Math.ceil(
                  payloadData.percentage * (results?.robertaResults?.successCount || 0),
                )

                switch (payloadData.status) {
                  case ModelScores.NEGATIVE:
                    label = 'Negative'
                    break
                  case ModelScores.NEUTRAL:
                    label = 'Neutral'
                    break
                  default:
                    label = 'Positive'
                }

                return (
                  <div className="p-2 text-base rounded-md bg-foreground-50">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">
                      {comments} of {results?.robertaResults?.successCount || 0} comments
                    </p>
                  </div>
                )
              }

              return null
            }}
          />
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="percentageFormatted"
            fill="#8884d8"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <text
                  dominantBaseline="central"
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  x={x}
                  y={y}
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              )
            }}
            labelLine={false}
            outerRadius={80}
          >
            {data.map(entry => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="px-8 text-sm text-center">
        <span className="font-bold">RoBERTa</span> model classifies the sentiment of the comments in
        negative, neutral or positive, this is the average perception about your video.
        <br />
        {(results?.robertaResults?.errorsCount || 0) > 0 && (
          <span className="text-sm font-medium">
            <span className="font-bold text-red-600">
              {results?.robertaResults?.errorsCount} comments
            </span>{' '}
            could not be analyzed.
          </span>
        )}
      </p>
    </section>
  )
}
