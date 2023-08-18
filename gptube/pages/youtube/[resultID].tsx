import type { AnalysisResults } from '@/types/youtube'

import { useRouter } from 'next/router'
import { collection, doc, getDoc } from 'firebase/firestore'
import { AiFillYoutube } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Layout } from 'antd'

import BertResultsBanner from '@/components/SocialMedia/Youtube/BertResultsBanner'
import RobertaResultsBanner from '@/components/SocialMedia/Youtube/RobertaResultsBanner'
import { openSans } from '@/components/Common/Fonts'
import NegativeComments from '@/components/SocialMedia/Youtube/NegativeComments'
import { paramValToString } from '@/utils'
import { firestore } from '@/lib/firebase/config-firebase'
import { useAuth } from '@/hooks/useAuth'
import { LayoutsAvailable } from '@/components/Layouts/Layouts'

const { Content } = Layout

function YoutubeResults() {
  const { user } = useAuth()
  const router = useRouter()
  const resultID = paramValToString(router.query.resultID)
  const [analysis, setAnalysis] = useState<AnalysisResults>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const getResults = async () => {
      try {
        if (!user) throw new Error('no user email')
        const userEmail = user.email || ''
        const userYoutubeColl = collection(firestore, 'users', userEmail, 'youtube')
        const resultDoc = doc(userYoutubeColl, resultID)
        const docSnap = await getDoc(resultDoc)

        // Check if the document exists
        if (!docSnap.exists()) {
          setLoaded(true)

          return
        }

        // Extract the document data and map it to a MyData object
        const docData = docSnap.data()
        const analysisYoutube = {
          _id: docSnap.id,
          video_id: docData.video_id || null,
          video_title: docData.video_title || null,
          results: docData.results || null,
          error: docData.error || null,
        }

        setAnalysis(analysisYoutube)
        setLoaded(true)
      } catch (error) {
        toast.error(String(error))
      }
    }

    getResults()
  }, [resultID, user])

  if (!loaded) {
    return <p className="text-5xl text-center animate-bounce my-52">🐱</p>
  }

  return (
    <>
      <Toaster />
      {analysis ? (
        <>
          <Content
            className={`${openSans.className} bg-black-medium border-gray-500 border my-6 pb-6 mx-20 rounded-md text-typo`}
          >
            <p className="px-6 pt-6 text-2xl font-black text-typo">
              Here is the analysis of your video 🤗!
            </p>
            <p className="flex items-center gap-2 px-6 py-6 text-lg font-bold text-typo">
              <AiFillYoutube className="w-6 h-6 text-red-600" />
              <a
                className="font-bold text-typo hover:underline hover:text-typo"
                href={`https://youtu.be/${analysis.video_id}`}
                rel="noopener"
                target="_blank"
              >
                <span className="text-center">&quot;{analysis.video_title}&quot;</span>
              </a>
            </p>
            <NegativeComments
              recommendationChatGPT={analysis.results.recommendation_chat_gpt}
              videoID={analysis.video_id}
            />
          </Content>
          <Content
            className={`${openSans.className} bg-black-medium border-gray-500 border my-6 mx-20 rounded-md text-typo`}
          >
            <p className="px-6 pt-6 text-2xl font-black text-typo">AI models results 🧠</p>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <BertResultsBanner
                errors_count={analysis.results.bert_results.errors_count}
                score_1={analysis.results.bert_results.score_1}
                score_2={analysis.results.bert_results.score_2}
                score_3={analysis.results.bert_results.score_3}
                score_4={analysis.results.bert_results.score_4}
                score_5={analysis.results.bert_results.score_5}
                success_count={analysis.results.bert_results.success_count}
              />
              <RobertaResultsBanner
                errors_count={analysis.results.roberta_results.errors_count}
                negative={analysis.results.roberta_results.negative}
                neutral={analysis.results.roberta_results.neutral}
                positive={analysis.results.roberta_results.positive}
                success_count={analysis.results.roberta_results.success_count}
              />
            </div>
          </Content>
        </>
      ) : (
        <Content
          className={`${openSans.className} bg-black-medium border-gray-500 border my-6 mx-20 rounded-md text-typo`}
        >
          <p className="p-10 m-auto text-4xl text-center text-typo">
            We couldn&apos;t find your result 🙀 (404)!.
          </p>
        </Content>
      )}
    </>
  )
}

export default YoutubeResults
YoutubeResults.Layout = LayoutsAvailable.Admin
