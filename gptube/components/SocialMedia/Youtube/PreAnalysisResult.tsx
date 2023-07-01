import React, { useState } from "react";
import { Layout, Tag, Image, Input, Button } from "antd";

import { openSans } from "@/components/Common/Fonts";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const { Content } = Layout;

interface PreAnalysisResultProps {
  videoID: string;
  videoTitle: string;
  tags: string[];
  numberOfComments: number;
  imageURL: string;
  requiresEmail: boolean;
}

const PreAnalysisResult: React.FC<PreAnalysisResultProps> = ({
  videoID,
  videoTitle,
  tags,
  numberOfComments,
  imageURL,
  requiresEmail,
}) => {
  const { user } = useAuth();
  const [time, setTime] = useState<number>(10);
  const [email, setEmail] = useState(requiresEmail ? user?.email ?? "" : "");
  const router = useRouter();

  const startAnalysisHandler = async () => {
    const bodyAnalysis = {
      video_id: videoID,
      video_title: videoTitle,
      email: email,
    };
    const toastLoading = toast.loading("Analyzing...");
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/youtube/analysis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyAnalysis),
        }
      );

      if (response.ok && requiresEmail) {
        toast.success("Results were sent");
        toast.dismiss(toastLoading);
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to send data.");
      }

      toast.dismiss(toastLoading);
      router.push(`/youtube/${data.results_id}`);
    } catch (error) {
      toast.dismiss(toastLoading);
      toast.error(`${String(error)}. Try again later.`);
    }
  };

  const progress = setTimeout(() => {
    if (time > 0) {
      setTime(time - 1);
    } else {
      clearTimeout(progress);
    }
  }, 1000);

  return (
    <div
      className={`${openSans.className} grid gap-6 lg:mx-48 sm:mx-10 px-4 mb-6`}
    >
      <Content className="grid grid-cols-1 md:grid-cols-2 bg-black-medium mx-auto w-full rounded-2xl shadow-lg md:p-6 sm:py-4 px-4 py-2 items-center">
        <div className="grid lg:gap-6 gap-2 mx-4">
          <div className="flex gap-2">
            <p className="text-typo text-2xl font-medium">
              {videoTitle || "Without title"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 border-2 border-typo rounded-lg w-fit">
            <p className="text-xl sm:text-lg font-normal text-typo px-1">
              Comments to analyze
            </p>
            <p className="text-2xl font-bold text-typo">
              {numberOfComments || "No comments"}
            </p>
          </div>
          {tags && (
            <div className="flex-col gap-2">
              {tags.map((tag: string, index: number) => {
                if (index < 10) {
                  return (
                    <Tag
                      className="border-1 mt-1 border-white bg-black-low text-white font-light"
                      key={index}
                    >
                      #{tag}
                    </Tag>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
        <div className="grid justify-center mx-auto">
          <Image className="rounded-xl" src={imageURL} alt="Video image" />
        </div>
        {requiresEmail ? (
          <>
            <div className="col-span-2 mt-4 mx-4">
              <p className={`text-typo mb-2 ${openSans.className}`}>
                We&apos;ll sent your results later
              </p>
              <div className="flex items-center space-x-4">
                <Input
                  className="focus:border-none hover:border-none h-8"
                  defaultValue={user?.email ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    setEmail(value);
                  }}
                />
                <Button
                  onClick={startAnalysisHandler}
                  className="primary-button"
                >
                  <span className={`${openSans.className}`}>Analyze</span>{" "}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-2 mt-4 mx-auto">
            <Button onClick={startAnalysisHandler} className="primary-button">
              <span className={`${openSans.className}`}>Analyze</span>{" "}
            </Button>
          </div>
        )}
      </Content>
    </div>
  );
};

export default PreAnalysisResult;
