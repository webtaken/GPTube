import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Layout } from "antd";
import { openSans } from "@/components/Common/Fonts";
import Comment from "./Comment";
import { NegativeYoutubeComment } from "@/types/youtube";

const { Content } = Layout;

interface NegativeCommentsProps {
  videoID: string;
  comments: NegativeYoutubeComment[];
  recommendationChatGPT: string;
}

const NegativeComments: React.FC<NegativeCommentsProps> = ({
  videoID,
  comments,
  recommendationChatGPT,
}) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <Content
      className={`${openSans.className} bg-black-medium px-6 rounded-md text-typo`}
    >
      <p className="text-lg font-bold">OUR RECOMMENDATION 🐱</p>
      <p className="text-base text-justify">
        {recommendationChatGPT ||
          "Your video doesn't contain very negative comments."}
      </p>
      <br />
      {recommendationChatGPT && (
        <button
          className="primary-button p-2"
          onClick={() => setShowComments(true)}
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
              <div className="bg-black-medium">
                <p className="text-base text-justify text-typo mt-2">
                  This are the comments with the highest negative scores,{" "}
                  <span className="font-bold">
                    we are not perfect so our AI models may occasionally
                    indicate comments that aren't negatives 🙏.
                  </span>
                  <br />
                  If you encounter a wrong answer let us know 😸.
                </p>
                <div className="flex flex-col pb-4">
                  {comments.map((data, index) => {
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
                </div>
              </div>
              <button
                type="button"
                className="primary-button p-2"
                onClick={() => setShowComments(false)}
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Content>
  );
};

export default NegativeComments;
