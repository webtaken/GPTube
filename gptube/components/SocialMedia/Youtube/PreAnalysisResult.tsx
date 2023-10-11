import React, { useState } from 'react'
import { Layout, Tag, Image, Input, Button } from 'antd'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/use-auth'
import { ENV_CONFIG } from '@/config/env-config'

const { Content } = Layout

interface PreAnalysisResultProps {
  videoID: string
  videoTitle: string
  tags: string[]
  numberOfComments: number
  imageURL: string
  requiresEmail: boolean
}

function PreAnalysisResult({
  videoID,
  videoTitle,
  tags,
  numberOfComments,
  imageURL,
  requiresEmail,
}: PreAnalysisResultProps) {
  const { user } = useAuth()
  const [time, setTime] = useState<number>(10)
  const [email, setEmail] = useState(requiresEmail ? user?.email ?? '' : '')
  const router = useRouter()

  const startAnalysisHandler = async () => {
    const bodyAnalysis = {
      video_id: videoID,
      video_title: videoTitle,
      email: email,
      owner_email: user?.email,
    }
    const toastLoading = toast.loading('Analyzing...')

    try {
      const response = await fetch(`${ENV_CONFIG.backend.url ?? ''}/api/youtube/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyAnalysis),
      })

      if (response.ok && requiresEmail) {
        toast.success('Results were sent')
        toast.dismiss(toastLoading)

        return
      }

      if (!response.ok) {
        throw new Error('Failed to send data.')
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json()

      toast.dismiss(toastLoading)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      router.push(`/youtube/${data.results_id}`)
    } catch (error) {
      toast.dismiss(toastLoading)
      toast.error(`${String(error)}. Try again later.`)
    }
  }

  const progress = setTimeout(() => {
    if (time > 0) {
      setTime(time - 1)
    } else {
      clearTimeout(progress)
    }
  }, 1000)

  return (
    <div className={` grid gap-6 lg:mx-48 sm:mx-10 px-4 mb-6`}>
      <Content className="grid items-center w-full grid-cols-1 px-4 py-2 mx-auto shadow-lg md:grid-cols-2 bg-black-medium rounded-2xl md:p-6 sm:py-4">
        <div className="grid gap-2 mx-4 lg:gap-6">
          <div className="flex gap-2">
            <p className="text-2xl font-medium text-typo">{videoTitle || 'Without title'}</p>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 border-2 rounded-lg border-typo w-fit">
            <p className="px-1 text-xl font-normal sm:text-lg text-typo">Comments to analyze</p>
            <p className="text-2xl font-bold text-typo">{numberOfComments || 'No comments'}</p>
          </div>
          {tags.length > 0 ? (
            <div className="flex-col gap-2">
              {tags.map((tag, index) => {
                if (index < 10) {
                  return (
                    <Tag
                      key={`tag-${tag}`}
                      className="mt-1 font-light text-white border-white border-1 bg-black-low"
                    >
                      #{tag}
                    </Tag>
                  )
                }

                return null
              })}
            </div>
          ) : null}
        </div>
        <div className="grid justify-center mx-auto">
          <Image alt="Video image" className="rounded-xl" src={imageURL} />
        </div>
        {requiresEmail ? (
          <div className="col-span-2 mx-4 mt-4">
            <p className={`text-typo mb-2 `}>We&apos;ll sent your results later</p>
            <div className="flex items-center space-x-4">
              <Input
                className="h-8 focus:border-none hover:border-none"
                defaultValue={user?.email ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target

                  setEmail(value)
                }}
              />
              <Button className="primary-button" onClick={startAnalysisHandler}>
                <span className="">Analyze</span>{' '}
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-2 mx-auto mt-4">
            <Button className="primary-button" onClick={startAnalysisHandler}>
              <span className="">Analyze</span>{' '}
            </Button>
          </div>
        )}
      </Content>
    </div>
  )
}

export default PreAnalysisResult
