import { type FormEvent } from "react";

import { CornerDownLeft, Plus } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { LayoutsAvailable } from "@/components/Layouts/map-layouts";
import { Input } from "@/components/Common/input";
import { Button } from "@/components/Common/button";
import {
  Card,
  CardHeader,
  useDisclosure,
  Image,
  CardBody,
  Divider,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Footer } from "@/components/footer";

import openai_logo from "@/assets/icons/openai.svg";
import youtube_logo from "@/assets/icons/youtube.svg";
import huggingface_logo from "@/assets/icons/hf-logo-with-title.svg";

import NextImage from "next/image";
import { rubikFont } from "@/components/Common/fonts";

const data = [
  {
    name: "Poor",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Fair",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Good",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Very good",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Excellent",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function Home() {
  const { isOpen, onOpenChange } = useDisclosure();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <Input
            endContent={
              <Button className="!outline-none" type="submit" size="sm" variant="faded">
                <CornerDownLeft className="text-gray-500" size={14} />
              </Button>
            }
            placeholder="Paste a YouTube video link here"
            startContent={<LinkIcon className="text-gray-500" size={14} />}
            variant="faded"
            name="videoLink"
          />
        </form>
        <Card className="p-4 h-[40rem] bg-gray-100" fullWidth>
          <>
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">NextUI</p>
                <p className="text-small text-default-500">nextui.org</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <section className="flex flex-col gap-6">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis
                  mollitia a velit, dicta illo vero rerum voluptatem similique deleniti nisi aut
                  sequi consequuntur quidem hic dolores consectetur sapiente amet.
                </p>
                <section className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
                  <YoutubeEmbed embedId="-PFT1hEgxGY" title="GPTube demo" />
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                      <XAxis
                        dataKey="name"
                        stroke="#000a0a"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis stroke="#000a0a" fontSize={12} tickLine={false} axisLine={false} />
                      <Bar dataKey="total" fill="rgba(129,247,172,.425)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </section>
              </section>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center w-full">
                <Button
                  color="success"
                  variant="shadow"
                  radius="sm"
                  className="px-10 font-medium text-white"
                  onClick={onOpenChange}
                >
                  See full analysis
                </Button>
              </div>
            </CardFooter>
          </>
        </Card>
        <section className="mt-10 space-y-20">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-4 bg-success-400"></div>
              <h2 className="text-4xl font-bold text-center md:text-5xl">
                <span>Get ready to get</span>
                <br />
                <span>your audience grow</span>
              </h2>
              <div className="w-24 h-4 bg-success-400"></div>
            </div>
            <p className="text-base text-center opacity-70 md:text-lg max-w-[60ch] mx-auto">
              In our ongoing analysis, we have been employing three distinct models to ensure that
              we deliver the most comprehensive and valuable feedback to you.
            </p>
          </div>
          <Card className="p-4 h-[40rem] bg-gray-100" fullWidth>
            Video
          </Card>
          <section className="flex flex-wrap items-center justify-center gap-8">
            <NextImage alt="youtube logo" height={40} src={youtube_logo} width={180} />
            <Plus className="hidden md:block" />
            <NextImage alt="huggingface logo" height={70} src={huggingface_logo} width={280} />
            <Plus className="hidden md:block" />
            <NextImage alt="openai logo" height={40} src={openai_logo} width={180} />
          </section>
          <div className="flex justify-center">
            <Button
              variant="shadow"
              color="success"
              radius="sm"
              className="px-10 font-medium text-white"
            >
              Get a plan or start for free
            </Button>
          </div>
        </section>
      </section>
      <Footer />
      <Modal className={rubikFont.className} isOpen={isOpen} onOpenChange={onOpenChange} radius="sm">
        <ModalContent className="p-2">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">Features that are you missing</h3>
                <Divider />
              </ModalHeader>
              <ModalBody>
                Roberta model
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

Home.Layout = LayoutsAvailable.Admin;
