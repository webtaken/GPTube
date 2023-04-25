import React, { useState } from "react";
import { Layout, Tag, Button, Progress } from "antd";
import { LikeTwoTone, DislikeTwoTone } from "@ant-design/icons";

const { Content } = Layout;

const iconSize = { fontSize: "30px" };

const tags = [
    "developer",
    "software developer",
    "javascript",
    "develop",
    "midudev",
    "frontend",
    "web development",
    "ux designer",
    "chatgpt",
    "side projects",
    "github copilot",
    "gpt4",
    "copilot para pull request",
    "gpt-4",
    "github",
    "open-ai",
    "microsoft ai",
    "github ai"
];

const TIME_OUT = 100;

const PreAnalysisResult: React.FC = () => {
    const [time, setTime] = useState<number>(10);

    const progress = setTimeout(() => {
        if (time > 0) {
            setTime(time - 1);
        }
        else {
            clearTimeout(progress);
        }
    }, 1000);

    return (
        <div className="grid gap-6 lg:mx-48 sm:mx-10 lg:p-10 px-4">
            <Content
                className="bg-black-medium grid w-full mx-auto grid-cols-1 rounded-2xl shadow-lg px-6 py-4 items-center"
            >
                <div className="flex justify-between">
                    {time === 0 ? (
                        <p className="flex items-end text-2xl font-medium text-typo my-1">
                            Your video have been analyzed!!
                        </p>
                    ) : (
                        <>
                            <p className="text-typo text-lg font-light">
                                Estimated time to complete analyze ...&nbsp;
                                <span className="text-white text-2xl font-semibold">{time}s</span>
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
                    percent={TIME_OUT / 100 * (TIME_OUT - time)}
                    status={time === 0 ? "success" : "active"}
                    showInfo={false}
                />
            </Content>
            <Content
                className="bg-black-medium grid mx-auto w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 rounded-2xl shadow-lg md:p-6 sm:py-4 px-4 py-2 items-center"
            >
                <div className="grid lg:gap-6 gap-2 mx-4">
                    <div className="flex gap-2">
                        <p className="text-typo text-2xl font-medium">Como GitHub Copilot X te Potenciará como Programador (incluye GPT-4)</p>
                        {/* <p className="text-xl font-medium text-red-600 border-[3px] border-red-600 p-1 h-fit rounded-lg">LIVE</p> */}
                    </div>
                    <div className="flex items-center justify-center gap-2 p-2 border-2 border-typo rounded-lg w-fit">
                        <p className="text-xl sm:text-lg font-normal text-typo px-1">Comments to analyze</p>
                        <p className="text-2xl font-bold text-typo">543.4K</p>
                    </div>
                    {/* <div className="flex w-full gap-3">
                        <div className="flex items-center justify-center gap-2 p-2 border-2 border-green-600 rounded-lg w-fit">
                            <LikeTwoTone twoToneColor="#04CB19" style={iconSize} />
                            <p className="text-xl font-semibold text-green-600">53.3K</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-2 border-2 border-red-600 rounded-lg w-fit">
                            <DislikeTwoTone twoToneColor="#F10505" style={iconSize} />
                            <p className="text-xl font-semibold text-red-600">2343</p>
                        </div>
                    </div> */}
                    <div className="flex-col gap-1">
                        {tags.map((tag: string, index: number) => {
                            return index < 8 ? (
                                <Tag
                                    className="border-0 bg-black-low text-white font-light"
                                    key={index}
                                >
                                    #{tag}
                                </Tag>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="grid justify-center w-fit mx-auto">
                    <img
                        className="rounded-2xl shadow-lg shadow-black"
                        width={400}
                        src="https://i.ytimg.com/vi/Nx-T5zuD8Oo/hqdefault.jpg" alt="Video image"
                    />
                </div>
            </Content>
        </div>
    );
};

export default PreAnalysisResult;