import type { ModelsYoutubeAnalyzerLandingReqBody } from '@/gptube-api'

import { useEffect, type FormEvent } from 'react'
import { CornerDownLeft, Plus } from 'lucide-react'
import { Link as LinkIcon } from 'lucide-react'
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
} from '@nextui-org/react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'
import NextImage from 'next/image'

import { LayoutsAvailable } from '@/components/Layouts/map-layouts'
import { YoutubeEmbed } from '@/components/youtube-embed'
import { Footer } from '@/components/footer'
import openai_logo from '@/assets/icons/openai.svg'
import youtube_logo from '@/assets/icons/youtube.svg'
import huggingface_logo from '@/assets/icons/hf-logo-with-title.svg'
import { Button } from '@/components/Common/button'
import { Input } from '@/components/Common/input'
import { rubikFont } from '@/components/Common/fonts'
import { apiClient } from '@/gptube-api'

const data = [
  {
    name: 'Poor',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Fair',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Good',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Very good',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Excellent',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export default function Home() {
  const { isOpen, onOpenChange } = useDisclosure()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  async function performLandingAnalysis() {
    const videoData: ModelsYoutubeAnalyzerLandingReqBody = {
      videoId: '1xoy8Q5o8ws',
      videoTitle: 'The Truth About Bun',
    }

    try {
      const response = await apiClient.apiYoutubeAnalysisLandingPost({
        video: videoData,
      })

      // Check the response only for example purpose
      // erase this on your PR
      console.log('response: ', response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    performLandingAnalysis()
  }, [])

  return (
    <>
      <section className="flex flex-col max-w-screen-lg gap-10 p-20 px-4 mx-auto md:pt-28 lg:px-0">
        <h1 className="text-4xl font-bold text-center md:text-6xl">
          Check what people think about
          <br />
          <span
            style={{
              position: 'relative',
              whiteSpace: 'nowrap',
              backgroundImage: 'linear-gradient(120deg,rgba(129,247,172,.425),#81f7ac)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% .15em',
              backgroundPosition: '0 95%',
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
            endContent={
              <Button className="!outline-none" size="sm" type="submit" variant="faded">
                <CornerDownLeft className="text-gray-500" size={14} />
              </Button>
            }
            name="videoLink"
            placeholder="Paste a YouTube video link here"
            startContent={<LinkIcon className="text-gray-500" size={14} />}
            variant="faded"
          />
        </form>
        <Card fullWidth className="p-4 h-[40rem] bg-gray-100">
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
          </>
        </Card>
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
  )
}

Home.Layout = LayoutsAvailable.Admin
