/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from "@/gptube-api";
import { Skeleton } from "@nextui-org/react";
import BertStats from "./BertStats";
import RobertaStats from "./RobertaStats";

interface MainStatisticsProps extends ModelsYoutubeVideoAnalyzed {
  isLoading: boolean;
}

export function MainStatistics({ results, isLoading }: MainStatisticsProps) {
  if (isLoading) {
    return <p className="font-semibold">Loading stats...</p>;
  }
  return (
    <>
      <section className="my-4 px-8 py-4 border shadow-sm w-full rounded">
        <h1 className="text-xl font-bold">Agent recommendation</h1>
        <p className="text-base py-4">
          This recommendation is based on the most negative comments you received in your video.
          Such comments may stem from discomfort with the discussed topic, disagreement with your
          views, or simply the presence of detractors. Take it just as a recommendation, we don't
          have the truth maybe your channel treats controversial topics so don't take it to
          seriously 😉.
        </p>
        <section>
          <p className="overflow-auto rounded-lg bg-slate-50 pl-3 py-2 h-56 whitespace-pre-line text-sm">
            {results?.recommendationChatGpt}
          </p>
        </section>
      </section>
      <div className="grid grid-cols-2 gap-4 pb-4">
        <BertStats results={results} />
        <RobertaStats results={results} />
      </div>
    </>
  );
}
