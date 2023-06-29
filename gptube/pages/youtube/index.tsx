import { useEffect, useState } from "react";
import Tooltip from "../../components/UI/Tooltip";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiOutlineSearch } from "react-icons/ai";
import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import { useAuth } from "@/context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { YoutubeRecord } from "@/types/youtube";
import Link from "next/link";

dayjs.extend(relativeTime);

const YoutubePanel: MyPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [youtubeRecords, setYoutubeRecords] = useState<YoutubeRecord[]>([]);
  const [loadedRecords, setLoadedRecords] = useState(false);

  const pageSize = 12;

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

      let q = query(userYoutubeColl, limit(pageSize));

      // If it's not the first page, use startAfter to specify the document to start after
      if (newPage > 1) {
        const previousPageSnapshot = await getDocs(
          query(userYoutubeColl, limit(pageSize * (newPage - 1)))
        );
        const lastDoc =
          previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
        q = query(userYoutubeColl, startAfter(lastDoc), limit(pageSize));
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
      setYoutubeRecords([...tmpYoutubeRecords]);
      setLoadedRecords(true);
    } catch (error) {
      toast.error(String(error));
      setLoadedRecords(true);
    }
  };

  useEffect(() => {
    getYoutubeRecords(1);
  }, []);

  return (
    <div>
      <Toaster />
      {loadedRecords ? (
        <div className={`${openSans.className} px-8`}>
          <h1 className="text-typo text-xl font-semibold mb-3">
            Latest Youtube videos
          </h1>
          <div className="flex items-center relative gap-2">
            <AiOutlineSearch className="absolute ml-3 text-white-full" />
            <input
              type="text"
              id="search"
              className="bg-black-full border text-gray-900 text-sm rounded-lg block w-full p-2 pl-10 dark:bg-black-full dark:border-white-full dark:placeholder-white-low dark:text-white-full"
              placeholder="Search..."
            />
            <Link href="/youtube/labs" className="primary-button w-32 py-2">
              New analysis
            </Link>
          </div>

          <div className="grid grid-cols-1 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {youtubeRecords.map((record, index) => {
              return (
                <Link
                  href={`/youtube/${record.video_id}`}
                  key={index}
                  className="bg-gray-900 py-4 px-3 rounded-lg border border-white-low hover:border-white-full"
                >
                  <p className="text-typo text-base font-medium">
                    {record.video_title}
                  </p>
                  <p className="text-white-low text-sm">
                    https://youtu.be/{record.video_id}
                  </p>
                  <p className="mt-4 text-white-low text-sm">
                    last update:{" "}
                    <Tooltip
                      title={`${dayjs(record.last_update).format(
                        "DD MMM, YYYY"
                      )}`}
                    >
                      {dayjs(record.last_update).fromNow()}
                    </Tooltip>
                  </p>
                </Link>
              );
            })}
          </div>
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
