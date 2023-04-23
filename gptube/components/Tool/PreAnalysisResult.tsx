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
        <div className="grid gap-4 lg:m-10 sm:m-2 lg:p-10 py-10">
            <Content
                className="bg-white flex-col mx-auto w-4/5 lg:grid-cols-2 grid-cols-1 rounded-2xl shadow-lg py-2 px-4 items-center"
            >
                <div className="flex float-left">
                    {time === 0 ? (
                        <p className="flex items-end text-2xl font-medium text-green-600 my-1">
                            Your video have been analyzed!!
                        </p>
                    ) : (
                        <>
                            <p className="text-lg font-light flex items-end">Estimated time to complete analyze ...</p>&nbsp;
                            <p className="text-2xl font-semibold">{time}s</p>
                        </>
                    )}
                </div>
                <Button type="primary" size="large" className="bg-blue-500 text-white p-1 float-right">
                    {time === 0 ? "Send to email" : "Send email when completed"}
                </Button>
                <Progress
                    className="my-2"
                    size={[1000, 16]}
                    percent={TIME_OUT / 100 * (TIME_OUT - time)}
                    status={time === 0 ? "success" : "active"}
                    showInfo={false}
                />
            </Content>
            <Content
                className="bg-white grid mx-auto w-4/5 lg:grid-cols-2 grid-cols-1 rounded-2xl shadow-lg p-6 items-center"
            >
                <div className="grid lg:gap-5 gap-3 mx-4">
                    <div className="flex gap-2">
                        <p className=" text-2xl font-medium">Como GitHub Copilot X te Potenciará como Programador (incluye GPT-4)</p>
                        <p className="text-xl font-medium text-red-600 border-[3px] border-red-600 p-1 h-fit rounded-lg">LIVE</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 p-2 border-2 border-blue-500 rounded-lg w-fit">
                        <p className="text-xl font-normal text-blue-500 px-1">Comments to analyze ...</p>
                        <p className="text-2xl font-bold text-blue-500">543.4K</p>
                    </div>
                    <div className="flex w-full gap-3">
                        <div className="flex items-center justify-center gap-2 p-2 border-2 border-green-600 rounded-lg w-fit">
                            <LikeTwoTone twoToneColor="#04CB19" style={iconSize} />
                            <p className="text-xl font-semibold text-green-600">53.3K</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-2 border-2 border-red-600 rounded-lg w-fit">
                            <DislikeTwoTone twoToneColor="#F10505" style={iconSize} />
                            <p className="text-xl font-semibold text-red-600">2343</p>
                        </div>
                    </div>
                    <div className="flex-col gap-1">
                        {tags.map((tag: string, index: number) => {
                            return index < 8 ? (
                                <Tag
                                    className=" border-0 bg-blue-50 text-blue-800 font-light "
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
                        className="rounded-2xl shadow-lg shadow-slate-500"
                        width={400}
                        src="https://i.ytimg.com/vi/Nx-T5zuD8Oo/hqdefault.jpg" alt="Video image"
                    />
                </div>
            </Content>
        </div>
    );
};

export default PreAnalysisResult;