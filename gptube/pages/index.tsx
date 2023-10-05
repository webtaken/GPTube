import { useState, type FormEvent, useEffect } from "react";
import { CornerDownLeft, Plus } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { Card } from "@nextui-org/react";
import NextImage from "next/image";
import toast from "react-hot-toast";

import { LayoutsAvailable } from "@/components/Layouts/map-layouts";
import { Footer } from "@/components/footer";
import openai_logo from "@/assets/icons/openai.svg";
import youtube_logo from "@/assets/icons/youtube.svg";
import huggingface_logo from "@/assets/icons/hf-logo-with-title.svg";
import { Button } from "@/components/Common/button";
import { Input } from "@/components/Common/input";
import { useLandingAnalysis } from "@/hooks/use-landing-analysis";
import { extractYTVideoID } from "@/utils";
import { AnalysisLanding } from "@/components/landing/analysis-landing";

export default function Home() {
  const [videoId, setVideoId] = useState<string>();

  const analysisQuery = useLandingAnalysis({
    videoId: videoId,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const videoLink = formData.get("videoLink")?.toString();

    if (!videoLink) {
      toast.error("Please enter a valid YouTube video link");
      return;
    }

    const extractedVideoId = extractYTVideoID(videoLink);

    setVideoId(extractedVideoId);
  };

  return (
    <>
      <section className="flex flex-col max-w-screen-lg gap-10 p-20 px-4 mx-auto md:pt-28 lg:px-0">
        <h1 className="text-4xl font-bold text-center md:text-6xl">
          Check what people think about
          <br />
          <span
            style={{
              position: "relative",
              whiteSpace: "nowrap",
              backgroundImage: "linear-gradient(120deg,rgba(129,247,172,.425),#81f7ac)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% .15em",
              backgroundPosition: "0 95%",
            }}
          >
            your content
          </span>
        </h1>
        <p className="text-base text-center opacity-70 md:text-lg max-w-[60ch] mx-auto">
          Boost your YouTube influence with our comment analysis, which provides instant feedback to
          help you reach a broader audience
        </p>
        <form className="w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <Input
            disabled={analysisQuery.isFetching}
            endContent={
              <Button
                className="!outline-none"
                isLoading={analysisQuery.isFetching}
                size="sm"
                type="submit"
                variant="faded"
              >
                {!analysisQuery.isFetching && (
                  <CornerDownLeft className="text-gray-500" size={14} />
                )}
              </Button>
            }
            name="videoLink"
            placeholder="Paste a YouTube video link here"
            startContent={<LinkIcon className="text-gray-500" size={14} />}
            variant="faded"
          />
        </form>
        <AnalysisLanding
          analysis={{
            data: analysisQuery.data,
            isLoading: analysisQuery.isFetching,
          }}
          videoId={videoId}
        />
        <section className="mt-10 space-y-20">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-4 bg-success-400" />
              <h2 className="text-4xl font-bold text-center md:text-5xl">
                <span>Get ready to get</span>
                <br />
                <span>your audience grow</span>
              </h2>
              <div className="w-24 h-4 bg-success-400" />
            </div>
            <p className="text-base text-center opacity-70 md:text-lg max-w-[60ch] mx-auto">
              In our ongoing analysis, we have been employing three distinct models to ensure that
              we deliver the most comprehensive and valuable feedback to you.
            </p>
          </div>
          <Card fullWidth className="p-4 h-[40rem] bg-gray-100">
            Video
          </Card>
          <section className="flex flex-wrap items-center justify-center gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
            <NextImage alt="youtube logo" height={40} src={youtube_logo} width={180} />
            <Plus className="hidden md:block" />
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
            <NextImage alt="huggingface logo" height={70} src={huggingface_logo} width={280} />
            <Plus className="hidden md:block" />
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
            <NextImage alt="openai logo" height={40} src={openai_logo} width={180} />
          </section>
          <div className="flex justify-center">
            <Button
              className="px-10 font-medium text-white"
              color="success"
              radius="sm"
              variant="shadow"
            >
              Get a plan or start for free
            </Button>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

Home.Layout = LayoutsAvailable.Admin;
