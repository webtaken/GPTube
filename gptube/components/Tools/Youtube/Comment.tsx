import { Layout } from "antd";
import { AiFillLike } from "react-icons/ai";

const { Content } = Layout;

interface CommentProps {
  key?: React.Key;
  url: string;
  authorName: string;
  authorProfileImageURL: string;
  text: string;
  likes: number;
  // ModerationStatus: The comment's moderation status. Will not be set if
  // the comments were requested through the id filter.
  //
  // Possible values:
  //   "published" - The comment is available for public display.
  //   "heldForReview" - The comment is awaiting review by a moderator.
  //   "likelySpam"
  //   "rejected" - The comment is unfit for display.
  moderationStatus?: string;
}

const Comment: React.FC<CommentProps> = ({
  authorName,
  authorProfileImageURL,
  text,
  url,
  likes,
}) => {
  return (
    <div className="border rounded-md p-3 my-3">
      <div className="flex gap-3 items-center">
        <img
          src={authorProfileImageURL}
          alt="profile image"
          className="object-cover rounded-full h-8 w-8"
        />
        <a href={url} target="_blank" className="font-bold">
          {authorName}
        </a>
      </div>
      <p className="text-typo mt-2">{text}</p>
      <div className="flex items-center gap-2">
        <AiFillLike /> {likes ?? 0}
      </div>
    </div>
  );
};

export default Comment;
