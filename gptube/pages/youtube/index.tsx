import { useEffect, useState } from "react";
import Tooltip from "../../components/UI/Tooltip";
import dayjs from "dayjs";
import { Pagination } from "antd";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiOutlineSearch, AiOutlineLink } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import { useAuth } from "@/context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { YoutubeRecord } from "@/types/youtube";
import Link from "next/link";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

dayjs.extend(relativeTime);

const YoutubePanel: MyPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [records, setRecords] = useState<YoutubeRecord[]>([]);
  const [loadedRecords, setLoadedRecords] = useState(false);

  const pageSize = 10;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const getYoutubeRecords = async (newPage: number) => {
    setPage(newPage);
    setLoadedRecords(false);
    try {
      if (!user) throw new Error("no user email");
      const userEmail = user.email || "";
      const userYoutubeColl = collection(
        firestore,
        "users",
        userEmail,
        "youtube"
      );

      /* Counting the total number of records */
      const totalRecords = await getCountFromServer(userYoutubeColl);
      setTotalRecords(totalRecords.data().count);
      /* ------------------------------------ */

      if (totalRecords.data().count === 0) {
        // No records
        setLoadedRecords(true);
        return;
      }

      const order = orderBy("last_update", "desc");
      let q = query(userYoutubeColl, order, limit(pageSize));

      // If it's not the first page, use startAfter to specify the document to start after
      if (newPage > 1) {
        const previousPageSnapshot = await getDocs(
          query(userYoutubeColl, order, limit(pageSize * (newPage - 1)))
        );
        const lastDoc =
          previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
        q = query(userYoutubeColl, order, startAfter(lastDoc), limit(pageSize));
      }

      const snapshot = await getDocs(q);
      // Check if the page exists
      if (snapshot.docs.length === 0) {
        toast.error(`Page ${newPage} does not exist.`);
        setLoadedRecords(true);
        return;
      }

      const tmpYoutubeRecords: YoutubeRecord[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          video_id: docData.video_id,
          video_title: docData.video_title,
          created_at: new Date(docData.created_at.seconds * 1000),
          last_update: new Date(docData.last_update.seconds * 1000),
        };
      });
      setRecords([...tmpYoutubeRecords]);
      setLoadedRecords(true);
    } catch (error) {
      toast.error(String(error));
      setLoadedRecords(true);
    }
  };

  useEffect(() => {
    getYoutubeRecords(1);
  }, []);

  let recordsGrid = (
    <div className="bg-black-full border border-white-full rounded-md my-4 p-4">
      <p className="text-center mb-4 text-base sm:text-lg md:text-xl lg:text-2xl text-typo">
        You don&apos;t have analyzed any youtube video yet 🙀!
      </p>
      <Link
        href="/youtube/labs"
        className="primary-button w-1/2 sm:w-1/3 md:w-1/4 mx-auto px-1 py-2 text-center"
      >
        Analyze new video
      </Link>
    </div>
  );

  if (loadedRecords && totalRecords > 0) {
    recordsGrid = (
      <>
        <div className="grid grid-cols-1 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {records
            .filter(
              (record) =>
                searchVal === "" ||
                record.video_title.toLowerCase().includes(searchVal)
            )
            .map((record, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 content-between gap-y-2 bg-black-full py-4 px-3 rounded-lg border border-white-low hover:border-white-full"
                >
                  <div>
                    <p className="text-typo text-base font-medium">
                      {record.video_title}
                    </p>
                    <a
                      href={`https://youtu.be/${record.video_id}`}
                      target="_blank"
                      className="flex items-center gap-1 text-white-low text-sm hover:underline"
                    >
                      https://youtu.be/{record.video_id}
                      <BiLinkExternal />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <Tooltip
                      title={`${dayjs(record.last_update).format(
                        "DD MMM, YYYY"
                      )}`}
                    >
                      <span className="text-white-low text-sm">
                        {dayjs(record.last_update).fromNow()}
                      </span>
                    </Tooltip>
                    <Link
                      href={`/youtube/${record.video_id}`}
                      className="flex items-center gap-1 text-typo hover:underline"
                    >
                      See results <AiOutlineLink className="text-typo" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="grid my-2">
          <Pagination
            className="custom-pagination mx-auto"
            defaultCurrent={page}
            total={totalRecords}
            pageSize={pageSize}
            onChange={(page, _) => getYoutubeRecords(page)}
            itemRender={(current, type, originalElement) => {
              if (type === "jump-next") {
                return (
                  <button className="bg-none rounded-r-md px-2 py-2 text-white-full">
                    <BsChevronRight
                      className="h-5 w-5 text-white-low hover:text-primary"
                      aria-hidden="true"
                    />
                  </button>
                );
              }
              if (type === "jump-prev") {
                return (
                  <button className="bg-none rounded-r-md px-2 py-2 text-white-full">
                    <BsChevronLeft
                      className="h-5 w-5 text-white-low hover:text-primary"
                      aria-hidden="true"
                    />
                  </button>
                );
              }
              if (type === "prev") {
                return (
                  <button className="bg-none rounded-r-md px-2 py-2 text-white-full">
                    <BsChevronLeft
                      className={`h-5 w-5 text-white-low ${
                        page !== 1 ? "hover:stroke-2" : "cursor-not-allowed"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              }
              if (type === "next") {
                return (
                  <button className="bg-black-full rounded-r-md px-2 py-2 text-white-full">
                    <BsChevronRight
                      className={`h-5 w-5 text-white-low ${
                        page !== totalPages
                          ? "hover:stroke-2"
                          : "cursor-not-allowed"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              }
              if (type === "page") {
                return (
                  <button className="w-full border text-typo border-white-low text rounded-md">
                    {current}
                  </button>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div className={`${openSans.className} w-full`}>
      <Toaster />
      {loadedRecords ? (
        <div className="px-8">
          <h1 className="text-typo text-xl font-semibold mb-3">
            Latest Youtube videos
          </h1>
          <div className="flex items-center relative gap-2  ">
            <AiOutlineSearch className="absolute ml-3 text-white-full" />
            <input
              type="text"
              id="search"
              className="bg-black-full border text-gray-900 text-sm rounded-lg block w-full p-2 pl-10 dark:bg-black-full dark:border-white-full dark:placeholder-white-low dark:text-white-full"
              placeholder="Search..."
              onChange={(e) => {
                const searchVal = e.target.value.trim().toLowerCase();
                setSearchVal(searchVal);
              }}
            />
            <Link
              href="/youtube/labs"
              className="rounded-sm primary-button w-32 py-2"
            >
              New analysis
            </Link>
          </div>
          {recordsGrid}
        </div>
      ) : (
        <div className="py-52 w-full">
          <p className="text-center text-5xl animate-bounce mx-auto">🐱</p>
        </div>
      )}
    </div>
  );
};

export default YoutubePanel;
YoutubePanel.Layout = "Admin";
