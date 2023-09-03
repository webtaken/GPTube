import type { ModelsYoutubeAnalyzerLandingReqBody } from '../gptube-api'

import Link from 'next/link'
import { useEffect } from 'react'

import Service from '@/components/Service/Service'
import YoutubeEmbed from '@/components/UI/YoutubeEmbed'
import { LayoutsAvailable } from '@/components/Layouts/map-layouts'

import { apiClient } from '../gptube-api'

function Home() {
  async function performLandingAnalysis() {
    const videoData: ModelsYoutubeAnalyzerLandingReqBody = {
      videoId: '1xoy8Q5o8ws',
      videoTitle: 'The Truth About Bun',
    }

    try {
      const response = await apiClient.apiYoutubeAnalysisLandingPost({
        video: videoData,
      })
      const video_id = response.videoId
      const video_title = response.videoTitle

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
    <div className={`gap-2 my-20 `}>
      <section className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 opacity-1">
        <div className="grid grid-cols-1 gap-8 mx-16 my-auto">
          <p className="text-2xl text-center md:text-4xl text-typo">
            Check what people think about your content
          </p>
          <p className="text-base text-justify text-white md:text-lg">
            Powered by AI technology, with <span className="font-bold">GPTube</span> you can analyze
            in a easy way what people think about your social media content in various platforms
            such as <span className="font-bold">Youtube, TikTok, Instagram, Facebook, etc...</span>
          </p>
          <div className="flex justify-center w-full">
            <Link
              className="p-2 primary-button"
              href={{ pathname: '/youtube', query: { from: 'youtube' } }}
            >
              Try GPTube
            </Link>
          </div>
        </div>
        <YoutubeEmbed embedId="-PFT1hEgxGY" title="GPTube demo" />
      </section>
      <Service />
    </div>
  )
}

export default Home
Home.Layout = LayoutsAvailable.Admin
