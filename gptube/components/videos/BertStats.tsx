/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from "@/gptube-api";
import { Tooltip } from "@nextui-org/react";
import { HelpCircle } from "lucide-react";
import { ModelScores } from "@/constants/ai-models";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from "recharts";

export default function BertStats({ results }: ModelsYoutubeVideoAnalyzed) {
  const data = [
    {
      total: results?.bertResults?.score1 || 0,
      status: ModelScores.NEGATIVE,
      name: "😠",
    },
    {
      total: results?.bertResults?.score2 || 0,
      status: ModelScores.BAD,
      name: "😑",
    },
    {
      total: results?.bertResults?.score3 || 0,
      status: ModelScores.NEUTRAL,
      name: "😐",
    },
    {
      total: results?.bertResults?.score4 || 0,
      status: ModelScores.FAIR,
      name: "🙂",
    },
    {
      total: results?.bertResults?.score5 || 0,
      status: ModelScores.POSITIVE,
      name: "😃",
    },
  ];

  if ((results?.bertResults?.errorsCount || 0) > 0) {
    data.push({
      total: results?.bertResults?.errorsCount || 0,
      status: ModelScores.ERROR,
      name: "Errors ❌",
    });
  }

  return (
    <section className="py-4 border shadow-sm w-full rounded">
      <h1 className="pl-8 text-xl font-bold flex gap-2 items-center mb-4">
        BERT model results{" "}
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="text-tiny">
                More{" "}
                <a
                  className="font-bold underline"
                  target="_blank"
                  href="https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment"
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
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const { payload: data } = payload[0];
                let label = "";
                switch (data.status) {
                  case ModelScores.NEGATIVE:
                    label = "Score 1";
                    break;
                  case ModelScores.BAD:
                    label = "Score 2";
                    break;
                  case ModelScores.NEUTRAL:
                    label = "Score 3";
                    break;
                  case ModelScores.FAIR:
                    label = "Score 4";
                    break;
                  case ModelScores.ERROR:
                    label = "Errors";
                    break;
                  default:
                    label = "Score 5";
                }
                return (
                  <div className="rounded-md text-base bg-foreground-50 p-2">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">
                      {data.total} of {results?.bertResults?.successCount || 0} comments
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="total" fill="black" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => {
              if (entry.status === ModelScores.ERROR && entry.total === 0) {
                return null;
              }
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.status === ModelScores.ERROR ? "#f31260" : "#5CB85C"}
                  fillOpacity={0.8}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-center px-8">
        <span className="font-bold">BERT</span> is our rate model that ranks the overall
        satisfaction of your users in a scale from <span className="font-bold">1 to 5</span>, where
        5 is an excellent opinion of your content and 1 is a bad opinion.
      </p>
    </section>
  );
}
