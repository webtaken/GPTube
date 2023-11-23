/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoDashboard } from "@/gptube-api";
import Link from "next/link";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Button } from "../Common/button";
import { Dot, MoreVertical } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { formatDate } from "@/utils/date.utils";

export function CardVideo({ snippet, createdAt, videoId }: ModelsYoutubeVideoDashboard) {
  const { user } = useAuth();

  const { title, thumbnails, tags } = snippet ?? {};

  const imgCard = thumbnails?._default?.url;

  return (
    <article className="flex items-center gap-4 p-4 border rounded-md shadow">
      <section>
        {imgCard ? (
          <img alt={title} className="object-cover object-center w-32 rounded" src={imgCard} />
        ) : null}
      </section>
      <section className="flex items-center justify-between gap-2 w-full">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="flex items-center">
            <Avatar showFallback className="w-5 h-5 text-tiny" src={user?.photoURL ?? undefined} />
            {createdAt ? (
              <>
                <Dot />
                <small>{formatDate(createdAt)}</small>
              </>
            ) : null}
          </div>
        </div>
        <Dropdown className="relative">
          <DropdownTrigger>
            <MoreVertical className="w-5 h-5 hover:font-bold rounded hover:shadow hover:cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu variant="light" disabledKeys={["delete"]}>
            <DropdownItem key="stats">
              <Link href={`/dashboard/videos/${videoId}`}>Stats</Link>
            </DropdownItem>
            <DropdownItem key="negative-comments">Negative comments</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete analysis
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>
    </article>
  );
}
