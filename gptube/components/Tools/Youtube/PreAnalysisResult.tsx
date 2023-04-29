import React, { useState } from "react";
import { Layout, Tag, Progress, Image } from "antd";
import { openSans } from "@/components/Common/Fonts";

const { Content } = Layout;

const TIME_OUT = 100;

interface PreAnalysisResultProps {
  videoTitle: string;
  tags: string[];
  numberOfComments: number;
  imageURL: string;
  requiresEmail: boolean;
}

const PreAnalysisResult: React.FC<PreAnalysisResultProps> = ({
  videoTitle,
  tags,
  numberOfComments,
  imageURL,
  requiresEmail,
}) => {
  const [time, setTime] = useState<number>(10);

  const progress = setTimeout(() => {
    if (time > 0) {
      setTime(time - 1);
    } else {
      clearTimeout(progress);
    }
  }, 1000);

  return (
    <div className="grid gap-6 lg:mx-48 sm:mx-10 lg:p-10 px-4">
      <Content className="bg-black-medium grid w-full mx-auto grid-cols-1 rounded-2xl shadow-lg px-6 py-4 items-center">
        <div className="flex justify-between">
          {time === 0 ? (
            <p className={`${openSans.className} flex items-end text-2xl font-medium text-typo my-1`}>
              Your video have been analyzed!!
            </p>
          ) : (
            <>
              <p className="text-typo text-lg font-light">
                Estimated time to complete analyze ...&nbsp;
                <span className="text-white text-2xl font-semibold">
                  {time}s
                </span>
              </p>
            </>
          )}
          <button className="text-base bg-primary border-2 border-primary font-medium text-typo hover:text-primary order-last hover:bg-primary-low rounded-lg px-3 py-2">
            {time === 0 ? "Send email" : "Send email when completed"}
          </button>
        </div>
        <Progress
          className="my-2"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={(TIME_OUT / 100) * (TIME_OUT - time)}
          status={time === 0 ? "success" : "active"}
          showInfo={false}
        />
      </Content>
      <Content className="bg-black-medium grid mx-auto w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 rounded-2xl shadow-lg md:p-6 sm:py-4 px-4 py-2 items-center">
        <div className="grid lg:gap-6 gap-2 mx-4">
          <div className="flex gap-2">
            <p className="text-typo text-2xl font-medium">{videoTitle}</p>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 border-2 border-typo rounded-lg w-fit">
            <p className="text-xl sm:text-lg font-normal text-typo px-1">
              Comments to analyze
            </p>
            <p className="text-2xl font-bold text-typo">{numberOfComments}</p>
          </div>
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
        </div>
        <div className="grid justify-center w-fit mx-auto">
          <Image className="rounded-xl" src={imageURL} alt="Video image" />
        </div>
      </Content>
    </div>
  );
};

export default PreAnalysisResult;
