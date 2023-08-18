import type { MyPage } from '@/components/Common/Types'
import type { YoutubeRecord } from '@/types/youtube'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Pagination } from 'antd'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiOutlineSearch, AiOutlineLink } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { toast, Toaster } from 'react-hot-toast'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import Link from 'next/link'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { useAuth } from '@/context/AuthContext/AuthContext'
import { openSans } from '@/components/Common/Fonts'
import { firestore } from '@/lib/firebase/config-firebase'

import Tooltip from '../../components/UI/Tooltip'

dayjs.extend(relativeTime)

// eslint-disable-next-line react/function-component-definition
const YoutubePanel: MyPage = () => {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [searchVal, setSearchVal] = useState('')
  const [records, setRecords] = useState<YoutubeRecord[]>([])
  const [loadedRecords, setLoadedRecords] = useState(false)

  const pageSize = 10
  const totalPages = Math.ceil(totalRecords / pageSize)

  const getYoutubeRecords = async (newPage: number) => {
    setPage(newPage)
    setLoadedRecords(false)
    try {
      if (!user) throw new Error('no user email')
      const userEmail = user.email || ''
      const userYoutubeColl = collection(firestore, 'users', userEmail, 'youtube')

      /* Counting the total number of records */
      const totalRecords = await getCountFromServer(userYoutubeColl)

      setTotalRecords(totalRecords.data().count)
      /* ------------------------------------ */

      if (totalRecords.data().count === 0) {
        // No records
        setLoadedRecords(true)

        return
      }

      const order = orderBy('last_update', 'desc')
      let q = query(userYoutubeColl, order, limit(pageSize))

      // If it's not the first page, use startAfter to specify the document to start after
      if (newPage > 1) {
        const previousPageSnapshot = await getDocs(
          query(userYoutubeColl, order, limit(pageSize * (newPage - 1))),
        )
        const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1]

        q = query(userYoutubeColl, order, startAfter(lastDoc), limit(pageSize))
      }

      const snapshot = await getDocs(q)

      // Check if the page exists
      if (snapshot.docs.length === 0) {
        toast.error(`Page ${newPage} does not exist.`)
        setLoadedRecords(true)

        return
      }

      const tmpYoutubeRecords: YoutubeRecord[] = snapshot.docs.map(doc => {
        const docData = doc.data()

        return {
          video_id: docData.video_id,
          video_title: docData.video_title,
          created_at: new Date(docData.created_at.seconds * 1000),
          last_update: new Date(docData.last_update.seconds * 1000),
        }
      })

      setRecords([...tmpYoutubeRecords])
      setLoadedRecords(true)
    } catch (error) {
      toast.error(String(error))
      setLoadedRecords(true)
    }
  }

  useEffect(() => {
    getYoutubeRecords(1)
  }, [])

  let recordsGrid = (
    <div className="p-4 my-4 border rounded-md bg-black-full border-white-full">
      <p className="mb-4 text-base text-center sm:text-lg md:text-xl lg:text-2xl text-typo">
        You don&apos;t have analyzed any youtube video yet 🙀!
      </p>
      <Link
        className="w-1/2 px-1 py-2 mx-auto text-center primary-button sm:w-1/3 md:w-1/4"
        href="/youtube/labs"
      >
        Analyze new video
      </Link>
    </div>
  )

  if (loadedRecords && totalRecords > 0) {
    recordsGrid = (
      <>
        <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {records
            .filter(
              record => searchVal === '' || record.video_title.toLowerCase().includes(searchVal),
            )
            .map((record, index) => {
              return (
                <div
                  key={index}
                  className="grid content-between grid-cols-1 px-3 py-4 border rounded-lg gap-y-2 bg-black-full border-white-low hover:border-white-full"
                >
                  <div>
                    <p className="text-base font-medium text-typo">{record.video_title}</p>
                    <a
                      className="flex items-center gap-1 text-sm text-white-low hover:underline"
                      href={`https://youtu.be/${record.video_id}`}
                      rel="noopener"
                      target="_blank"
                    >
                      https://youtu.be/{record.video_id}
                      <BiLinkExternal />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <Tooltip title={`${dayjs(record.last_update).format('DD MMM, YYYY')}`}>
                      <span className="text-sm text-white-low">
                        {dayjs(record.last_update).fromNow()}
                      </span>
                    </Tooltip>
                    <Link
                      className="flex items-center gap-1 text-typo hover:underline"
                      href={`/youtube/${record.video_id}`}
                    >
                      See results <AiOutlineLink className="text-typo" />
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="grid my-2">
          <Pagination
            className="mx-auto custom-pagination"
            defaultCurrent={page}
            itemRender={(current, type, originalElement) => {
              if (type === 'jump-next') {
                return (
                  <button className="px-2 py-2 bg-none rounded-r-md text-white-full">
                    <BsChevronRight
                      aria-hidden="true"
                      className="w-5 h-5 text-white-low hover:text-primary"
                    />
                  </button>
                )
              }
              if (type === 'jump-prev') {
                return (
                  <button className="px-2 py-2 bg-none rounded-r-md text-white-full">
                    <BsChevronLeft
                      aria-hidden="true"
                      className="w-5 h-5 text-white-low hover:text-primary"
                    />
                  </button>
                )
              }
              if (type === 'prev') {
                return (
                  <button className="px-2 py-2 bg-none rounded-r-md text-white-full">
                    <BsChevronLeft
                      aria-hidden="true"
                      className={`h-5 w-5 text-white-low ${
                        page !== 1 ? 'hover:stroke-2' : 'cursor-not-allowed'
                      }`}
                    />
                  </button>
                )
              }
              if (type === 'next') {
                return (
                  <button className="px-2 py-2 bg-black-full rounded-r-md text-white-full">
                    <BsChevronRight
                      aria-hidden="true"
                      className={`h-5 w-5 text-white-low ${
                        page !== totalPages ? 'hover:stroke-2' : 'cursor-not-allowed'
                      }`}
                    />
                  </button>
                )
              }
              if (type === 'page') {
                return (
                  <button className="w-full border rounded-md text-typo border-white-low text">
                    {current}
                  </button>
                )
              }

              return originalElement
            }}
            pageSize={pageSize}
            total={totalRecords}
            onChange={(page, _) => getYoutubeRecords(page)}
          />
        </div>
      </>
    )
  }

  return (
    <div className={`${openSans.className} w-full`}>
      <Toaster />
      {loadedRecords ? (
        <div className="px-8">
          <h1 className="mb-3 text-xl font-semibold text-typo">Latest Youtube videos</h1>
          <div className="relative flex items-center gap-2 ">
            <AiOutlineSearch className="absolute ml-3 text-white-full" />
            <input
              className="block w-full p-2 pl-10 text-sm text-gray-900 border rounded-lg bg-black-full dark:bg-black-full dark:border-white-full dark:placeholder-white-low dark:text-white-full"
              id="search"
              placeholder="Search..."
              type="text"
              onChange={e => {
                const searchVal = e.target.value.trim().toLowerCase()

                setSearchVal(searchVal)
              }}
            />
            <Link className="w-32 py-2 rounded-sm primary-button" href="/youtube/labs">
              New analysis
            </Link>
          </div>
          {recordsGrid}
        </div>
      ) : (
        <div className="w-full py-52">
          <p className="mx-auto text-5xl text-center animate-bounce">🐱</p>
        </div>
      )}
    </div>
  )
}

export default YoutubePanel
YoutubePanel.Layout = 'Admin'
