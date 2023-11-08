"use client";

import { DashboardUI } from "@/components/dashboard/dashboard-ui";
import { Header } from "@/components/header";
import { useParams } from "next/navigation";

// TODO: Set this page as protected route for new users
function Video() {
  const params = useParams();
  const { videoId } = params;

  return (
    <>
      <Header />
      <main className="max-w-screen-lg px-6 py-6 mx-auto space-y-6">
        <p>video {videoId}</p>
      </main>
    </>
  );
}

export default Video;
