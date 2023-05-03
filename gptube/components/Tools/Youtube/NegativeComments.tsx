import { Image, Layout } from "antd";
import Comment from "./Comment";
import { openSans } from "@/components/Common/Fonts";

const { Content } = Layout;

interface NegativeCommentsProps {
  videoID: string;
  comments: any[];
}

const NegativeComments: React.FC<NegativeCommentsProps> = ({
  videoID,
  comments,
}) => {
  return (
    <Content
      className={`${openSans.className} bg-black-medium my-6 mx-20 rounded-md text-typo`}
    >
      <p className="p-4 text-center text-lg font-semibold">Top negative comments</p>
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
        {comments.map((data, index) => {
          const commentData = data.comment;
          return (
            <Comment
              key={index}
              url={`https://youtu.be/${videoID}?lc=${commentData.commentID}`}
              authorName={commentData.authorDisplayName}
              authorProfileImageURL={commentData.authorProfileImageUrl}
              text={commentData.textOriginal || commentData.textDisplay}
              likes={commentData.likeCount}
            />
          );
        })}
      </div>
    </Content>
  );
};

export default NegativeComments;
