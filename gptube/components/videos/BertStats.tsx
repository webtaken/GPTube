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
  Legend,
  Label,
  Rectangle,
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
    {
      total: results?.bertResults?.errorsCount || 0,
      status: ModelScores.ERROR,
      name: "Errors ❌",
    },
  ];

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
          <ReTooltip />
          <Bar dataKey="total" fill="black" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => {
              if (entry.status === ModelScores.ERROR && entry.total === 0) {
                return null;
              }
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.status === ModelScores.ERROR ? "#f31260" : "#5CB85C"}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
