/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from "@/gptube-api";
import { Tooltip } from "@nextui-org/react";
import { HelpCircle } from "lucide-react";
import { ModelScores } from "@/constants/ai-models";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  Legend,
} from "recharts";

const RADIAN = Math.PI / 180;

export default function RobertaStats({ results }: ModelsYoutubeVideoAnalyzed) {
  const data = [
    {
      percentageFormatted: Math.round(100 * (results?.robertaResults?.negative || 0)),
      percentage: results?.robertaResults?.negative || 0,
      status: ModelScores.NEGATIVE,
      color: "#f5a524",
      name: "negative 😠",
    },
    {
      percentageFormatted: Math.round(100 * (results?.robertaResults?.neutral || 0)),
      percentage: results?.robertaResults?.neutral || 0,
      status: ModelScores.NEUTRAL,
      color: "#006FEE",
      name: "neutral 😐",
    },
    {
      percentageFormatted: Math.round(100 * (results?.robertaResults?.positive || 0)),
      percentage: results?.robertaResults?.positive || 0,
      status: ModelScores.POSITIVE,
      color: "#17c964",
      name: "positive 😃",
    },
  ];

  return (
    <section className="px-8 py-4 border shadow-sm w-full rounded">
      <h1 className="text-xl font-bold flex gap-2 items-center mb-4">
        RoBERTa model results{" "}
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
      <ResponsiveContainer width="100%" height={345}>
        <PieChart width={600} height={600}>
          <ReTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const { payload: data } = payload[0];
                let label = "";
                const comments = Math.ceil(
                  data.percentage * (results?.robertaResults?.successCount || 0),
                );
                switch (data.status) {
                  case ModelScores.NEGATIVE:
                    label = "Negative";
                    break;
                  case ModelScores.NEUTRAL:
                    label = "Neutral";
                    break;
                  default:
                    label = "Positive";
                }
                return (
                  <div className="rounded-md text-base bg-foreground-50 p-2">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">
                      {comments} of {results?.robertaResults?.successCount || 0} comments
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentageFormatted"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-sm text-center px-8">
        <span className="font-bold">RoBERTa</span> model classifies the sentiment of the comments in
        negative, neutral or positive, this is the average perception about your video.
        <br />
        {(results?.robertaResults?.errorsCount || 0) > 0 && (
          <span className="text-sm font-medium">
            <span className="font-bold text-red-600">
              {results?.robertaResults?.errorsCount} comments
            </span>{" "}
            could not be analyzed.
          </span>
        )}
      </p>
    </section>
  );
}
