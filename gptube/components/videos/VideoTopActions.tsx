/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from "@/gptube-api";

import { formatDate } from "@/utils/date.utils";
import { Button } from "../Common/button";

export function VideoTopActions({
  snippet,
  createdAt,
  lastUpdate,
  videoId,
}: ModelsYoutubeVideoAnalyzed) {
  return (
    <div className="flex items-center gap-4 p-4 justify-between">
      <section>
        <a
          href={`https://youtu.be/${videoId}`}
          target="_blank"
          className="flex items-center gap-2 font-semibold text-ellipsis hover:underline"
        >
          {snippet?.title} &gt;
        </a>
      </section>
      <section className="flex items-center gap-2">
        <Button className="text-sm font-medium rounded-md bg-transparent shadow hover:shadow-lg border">
          See negative comments
        </Button>
      </section>
    </div>
  );
}
