/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from "@/gptube-api";
import { Youtube } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Button } from "../Common/button";
import { Tooltip, Skeleton } from "@nextui-org/react";

dayjs.extend(relativeTime);

interface VideoTopActionsProps extends ModelsYoutubeVideoAnalyzed {
  isLoading: boolean;
}

export function VideoTopActions({
  snippet,
  createdAt,
  lastUpdate,
  videoId,
  isLoading,
}: VideoTopActionsProps) {
  return (
    <>
      <div className="flex items-center gap-4 py-4 justify-between">
        <section>
          {isLoading ? (
            <div className="space-y-1">
              <Skeleton className="h-6 w-[400px] rounded-md" />
              <Skeleton className="h-4 w-[200px] rounded-md" />
              <Skeleton className="h-4 w-[200px] rounded-md" />
            </div>
          ) : (
            <>
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                className="flex items-center gap-2 font-semibold text-ellipsis hover:underline"
              >
                <Youtube className="w-5 h-5" />
                {snippet?.title}
              </a>
              <p className="text-sm">
                Created at:{" "}
                <Tooltip
                  closeDelay={200}
                  content={<p>{dayjs(createdAt).format("DD MMM, YYYY (HH:mm)")}</p>}
                >
                  <span className="font-medium">{dayjs(createdAt).fromNow()}</span>
                </Tooltip>
              </p>
              <p className="text-sm">
                Last update:{" "}
                <Tooltip
                  closeDelay={200}
                  content={<p>{dayjs(lastUpdate).format("DD MMM, YYYY (HH:mm)")}</p>}
                >
                  <span className="font-medium">{dayjs(lastUpdate).fromNow()}</span>
                </Tooltip>
              </p>
            </>
          )}
        </section>
        {!isLoading && (
          <section>
            <Button className="text-sm font-medium rounded-md bg-transparent shadow hover:shadow-lg border">
              See negative comments
            </Button>
          </section>
        )}
      </div>
    </>
  );
}
