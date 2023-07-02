import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import NextPage from "../../../assets/icons/NextIcon";
import PrevPage from "../../../assets/icons/PrevPage";
import { Layout } from "antd";
import { openSans } from "@/components/Common/Fonts";
import { toast, Toaster } from "react-hot-toast";
import {
  doc,
  getDoc,
  query,
  limit,
  getDocs,
  collection,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";
import Comment from "./Comment";
import { NegativeYoutubeComment } from "@/types/youtube";
import { useAuth } from "@/context/AuthContext";

const { Content } = Layout;

interface NegativeCommentsProps {
  videoID: string;
  recommendationChatGPT: string;
}

const NegativeComments: React.FC<NegativeCommentsProps> = ({
  videoID,
  recommendationChatGPT,
}) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<
    Map<number, NegativeYoutubeComment[]>
  >(new Map<number, NegativeYoutubeComment[]>());
  const [numComments, setNumComments] = useState(0);
  const [page, setPage] = useState(1);
  const [loadedComments, setLoadedComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const pageSize = 5;

  const countComments = async () => {
    try {
      if (!user) throw new Error("no user email");
      const userEmail = user.email || "";
      const userYoutubeColl = collection(
        firestore,
        "users",
        userEmail,
        "youtube"
      );
      const resultDoc = doc(userYoutubeColl, videoID);
      const docSnap = await getDoc(resultDoc);

      // Check if the document exists
      if (!docSnap.exists()) {
        return;
      }
      const negativeCommentsColl = collection(resultDoc, "NegativeComments");
      const snapshot = await getCountFromServer(negativeCommentsColl);
      setNumComments(snapshot.data().count);
    } catch (error) {
      toast.error(String(error));
    }
  };

  const getPaginatedComments = async (newPage: number) => {
    setPage(newPage);
    setLoadedComments(false);
    if (comments.has(newPage)) {
      setLoadedComments(true);
      return;
    }

    try {
      if (!user) throw new Error("no user email");
      const userEmail = user.email || "";
      const userYoutubeColl = collection(
        firestore,
        "users",
        userEmail,
        "youtube"
      );
      const resultDoc = doc(userYoutubeColl, videoID);
      const docSnap = await getDoc(resultDoc);
      // Check if the document exists
      if (!docSnap.exists()) {
        setLoadedComments(true);
        return;
      }
      const negativeCommentsColl = collection(resultDoc, "NegativeComments");

      let q = query(negativeCommentsColl, limit(pageSize));

      // If it's not the first page, use startAfter to specify the document to start after
      if (newPage > 1) {
        const previousPageSnapshot = await getDocs(
          query(negativeCommentsColl, limit(pageSize * (newPage - 1)))
        );
        const lastDoc =
          previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
        q = query(negativeCommentsColl, startAfter(lastDoc), limit(pageSize));
      }

      const snapshot = await getDocs(q);

      // Check if the page exists
      if (snapshot.docs.length === 0) {
        toast.error(`Page ${newPage} does not exist.`);
        setLoadedComments(true);
        return;
      }

      const tmpNegativeComments: NegativeYoutubeComment[] = snapshot.docs.map(
        (doc) => {
          const docData = doc.data();
          return {
            comment: {
              commentID: docData.comment.commentID,
              authorDisplayName: docData.comment.authorDisplayName,
              authorProfileImageUrl: docData.comment.authorProfileImageUrl,
              textDisplay: docData.comment.textDisplay,
              textOriginal: docData.comment.textOriginal,
              likeCount: docData.comment.likeCount,
            },
            priority: docData.priority,
          };
        }
      );
      setLoadedComments(true);
      setComments((prevComments) => {
        const newComments = new Map<number, NegativeYoutubeComment[]>();
        for (const [page, comments] of prevComments.entries()) {
          const commentsCopy = [...comments];
          newComments.set(page, commentsCopy);
        }
        newComments.set(newPage, tmpNegativeComments);
        return newComments;
      });
    } catch (error) {
      toast.error(String(error));
      setLoadedComments(true);
    }
  };

  useEffect(() => {
    countComments();
  }, []);

  let commentsSection = (
    <p className="text-center text-5xl animate-bounce">🐱</p>
  );

  if (loadedComments) {
    const commentsPage = comments.get(page);
    if (commentsPage) {
      commentsSection = (
        <>
          {commentsPage.length === 0 ? (
            <p className="text-center text-typo">There aren&apos;t comments</p>
          ) : (
            <div className="bg-black-medium">
              <div className="flex flex-col pb-4">
                {commentsPage.map((data, index) => {
                  const comment = data.comment;
                  return (
                    <Comment
                      key={index}
                      url={`https://youtu.be/${videoID}?lc=${comment.commentID}`}
                      authorName={comment.authorDisplayName}
                      authorProfileImageURL={comment.authorProfileImageUrl}
                      text={comment.textOriginal || comment.textDisplay}
                      likes={comment.likeCount}
                    />
                  );
                })}
                <div className="flex flex-col items-center text-typo">
                  <span className="text-sm">
                    Page <span className="font-semibold">{page}</span>
                  </span>
                  <span className="text-sm">
                    Total No. Comments{" "}
                    <span className="font-semibold">{numComments}</span>
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      className={`${
                        page > 1 ? "hover:bg-gray-900" : "cursor-not-allowed"
                      } inline-flex items-center px-4 py-2 text-sm font-medium text-typo bg-gray-800 rounded-l`}
                      disabled={page <= 1}
                      onClick={() => {
                        if (page > 1) {
                          getPaginatedComments(page - 1);
                        }
                      }}
                    >
                      <PrevPage className="w-5 h-5 mr-2" />
                      Prev
                    </button>
                    <button
                      className={`${
                        page <
                        Math.floor(numComments / pageSize) +
                          Number(numComments % pageSize > 0)
                          ? "hover:bg-gray-900"
                          : "cursor-not-allowed"
                      } inline-flex items-center px-4 py-2 text-sm font-medium text-typo bg-gray-800 border-0 border-l border-gray-700 rounded-r`}
                      disabled={
                        page >=
                        Math.floor(numComments / pageSize) +
                          Number(numComments % pageSize > 0)
                      }
                      onClick={() => {
                        const lastPage =
                          Math.floor(numComments / pageSize) +
                          Number(numComments % pageSize > 0);
                        if (page < lastPage) {
                          getPaginatedComments(page + 1);
                        }
                      }}
                    >
                      Next
                      <NextPage className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  }

  return (
    <Content
      className={`${openSans.className} bg-black-medium px-6 rounded-md text-typo`}
    >
      <Toaster />
      <p className="text-lg font-bold">OUR OBSERVATION ABOUT YOUR CONTENT 🐱</p>
      <p className="text-base text-justify">
        {recommendationChatGPT || "You don't have very negative comments."}
      </p>
      <br />
      {recommendationChatGPT && (
        <button
          className="primary-button p-2"
          onClick={() => {
            setShowComments(true);
            getPaginatedComments(page);
          }}
        >
          See negative comments
        </button>
      )}
      <Dialog
        as="div"
        className="relative z-10"
        open={showComments}
        onClose={() => setShowComments(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full mx-auto w-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-full transform overflow-hidden rounded-2xl bg-black-medium p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-typo"
              >
                Negative Comments
              </Dialog.Title>
              <p className="text-base text-justify text-typo mt-2">
                These comments have received the highest negative scores,
                reflecting a prevailing negative sentiment among your audience.
                Such comments may stem from discomfort with the discussed topic,
                disagreement with your views, or simply the presence of
                detractors.
                <br />
                <span className="font-semibold">
                  While our AI models strive for accuracy, it is possible that
                  occasional false positives may identify positive comments as
                  negative. We greatly appreciate your feedback in helping us
                  improve our analysis 🙏.
                </span>
                <br />
              </p>
              {commentsSection}
              <div className="flow-root">
                <button
                  type="button"
                  className="primary-button p-2 float-right"
                  onClick={() => setShowComments(false)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Content>
  );
};

export default NegativeComments;
