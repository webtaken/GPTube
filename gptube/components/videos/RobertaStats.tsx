/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from "@/gptube-api";
import { Tooltip } from "@nextui-org/react";
import { HelpCircle } from "lucide-react";
import { ModelScores } from "@/constants/ai-models";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

export default function RobertaStats({ results }: ModelsYoutubeVideoAnalyzed) {
  const data = [
    {
      total: results?.robertaResults?.negative || 0,
      status: ModelScores.NEGATIVE,
      name: "😠",
    },
    {
      total: results?.robertaResults?.neutral || 0,
      status: ModelScores.NEUTRAL,
      name: "😐",
    },
    {
      total: results?.robertaResults?.positive || 0,
      status: ModelScores.POSITIVE,
      name: "😃",
    },
    {
      total: results?.robertaResults?.errorsCount || 0,
      status: ModelScores.ERROR,
      name: "Errors ❌",
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
        <PieChart width={500} height={500}>
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
            dataKey="total"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
