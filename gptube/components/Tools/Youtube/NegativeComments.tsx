import { Image, Layout } from "antd";
import Comment from "./Comment";
import { openSans } from "@/components/Common/Fonts";
import { YoutubeComment } from "@/types/youtube";

const { Content } = Layout;

interface NegativeCommentsProps {
  videoID: string;
  comments: YoutubeComment[];
  recommendationChatGPT: string;
}

const NegativeComments: React.FC<NegativeCommentsProps> = ({
  videoID,
  comments,
}) => {
  return (
    <Content
      className={`${openSans.className} bg-black-medium my-6 mx-20 rounded-md text-typo`}
    >
      <p className="p-4 text-center text-lg font-semibold">
        Top negative comments
      </p>
      <p className="text-justify text-typo mx-8 md:mx-12">
        This are the comments with the highest negative scores,{" "}
        <span className="font-bold">
          we are not perfect so our AI models may occasionally indicate comments
          that aren't negatives 🙏.
        </span>
        <br />
        If you encounter a wrong answer let us know 😸.
      </p>
      <div className="flex flex-col pb-4 mx-8 md:mx-12">
        {comments.map((comment, index) => {
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
    </Content>
  );
};

export default NegativeComments;
