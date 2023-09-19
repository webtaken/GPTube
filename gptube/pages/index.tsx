import { type FormEvent } from "react";

import { ArrowDown, CornerDownLeft } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";

import { LayoutsAvailable } from "@/components/Layouts/map-layouts";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import {
  Card,
  CardHeader,
  useDisclosure,
  Image,
  CardBody,
  Divider,
  CardFooter,
} from "@nextui-org/react";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

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

function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenChange();
  };

  return (
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
        Expand your YouTube influence with our comment analysis providing instant feedback to
        content creators.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <Input
          disabled={isOpen}
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
        {isOpen ? (
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
                >
                  See full analysis
                </Button>
              </div>
            </CardFooter>
          </>
        ) : null}
      </Card>
      <section className="mt-10">
        <div className="flex items-center justify-center gap-4">
          <div className="w-24 h-4 bg-success-400"></div>
          <h2 className="text-4xl font-bold text-center md:text-5xl">
            What offer to you
          </h2>
          <div className="w-24 h-4 bg-success-400"></div>
        </div>
      </section>
    </section>
  );
}

export default Home;
Home.Layout = LayoutsAvailable.Admin;
