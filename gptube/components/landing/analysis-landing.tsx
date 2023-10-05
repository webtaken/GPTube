import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
  Skeleton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { YoutubeEmbed } from "../youtube-embed";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ModelsYoutubeAnalyzerLandingRespBody } from "@/gptube-api";
import { rubikFont } from "../Common/fonts";
import GPtubeLogo from "../../assets/icons/gptube-logo.svg";

export const AnalysisLanding = ({
  analysis,
  videoId,
}: {
  analysis: {
    data: ModelsYoutubeAnalyzerLandingRespBody | undefined;
    isLoading: boolean;
  };
  videoId: string | undefined;
}) => {
  const { onOpenChange, isOpen } = useDisclosure();

  const bertResults = analysis?.data?.results?.bertResults;

  const data = [
    {
      total: bertResults?.score1 || Math.random() * 10,
      name: "Poor",
    },
    {
      total: bertResults?.score2 || Math.random() * 10,
      name: "Fair",
    },
    {
      total: bertResults?.score3 || Math.random() * 10,
      name: "Good",
    },
    {
      total: bertResults?.score4 || Math.random() * 10,
      name: "Very good",
    },
    {
      total: bertResults?.score5 || Math.random() * 10,
      name: "Excellent",
    },
  ];

  const videoIdRender = analysis.data?.videoId ?? videoId ?? "ucX2zXAZ1I0";
  const videoSnippet = analysis.data?.snippet;

  return (
    <>
      <Card fullWidth className="p-4 h-[40rem] bg-gray-100">
        {analysis.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="w-3/5 h-3 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="w-4/5 h-3 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="w-2/5 h-3 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        ) : (
          <>
            <CardHeader className="flex gap-3">
              {!analysis.data?.snippet && (
                <div className="flex flex-col">
                  <p className="text-md">GPTube</p>
                  <p className="text-small text-default-500">GPTube.com</p>
                </div>
              )}
              {analysis.data?.snippet && (
                <div className="flex flex-col">
                  <p className="text-md">{videoSnippet?.title}</p>
                  <p className="text-small text-default-500">{videoSnippet?.description}</p>
                </div>
              )}
            </CardHeader>
            <Divider />
            <CardBody>
              <section className="flex flex-col gap-6">
                <p>
                  {analysis.data
                    ? "This is an analysis of your video, this analysis is based on the comments of your video, and it shows you how your video is perceived by the audience."
                    : "This is a fake analysis, that show you how one of our models would analyze your video, this model show you how your video is perceived by the audience based on the comments, if you want the same analysis, you can upload your video url, and we will analyze it for you."}
                </p>
                <section className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
                  <YoutubeEmbed embedId={videoIdRender} title="GPTube demo" />
                  <ResponsiveContainer height={350} width="100%">
                    <BarChart data={data}>
                      <XAxis
                        axisLine={false}
                        dataKey="name"
                        fontSize={12}
                        stroke="#000a0a"
                        tickLine={false}
                      />
                      <YAxis axisLine={false} fontSize={12} stroke="#000a0a" tickLine={false} />
                      <Bar dataKey="total" fill="rgba(129,247,172,.425)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </section>
              </section>
            </CardBody>
            {analysis.data ? (
              <CardFooter>
                <div className="flex justify-center w-full">
                  <Button
                    className="px-10 font-medium text-white"
                    color="success"
                    radius="sm"
                    variant="shadow"
                    onClick={onOpenChange}
                  >
                    See full analysis
                  </Button>
                </div>
              </CardFooter>
            ) : null}
          </>
        )}
      </Card>
      <Modal
        className={rubikFont.className}
        isOpen={isOpen}
        radius="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-2">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">Features that are you missing</h3>
                <Divider />
              </ModalHeader>
              <ModalBody>Roberta model</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
