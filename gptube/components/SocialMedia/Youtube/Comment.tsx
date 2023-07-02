import { Menu } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { AiFillLike, AiOutlineEllipsis } from "react-icons/ai";

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
      <div className="flow-root space-x-2 items-center">
        <Image
          src={authorProfileImageURL}
          alt="profile image"
          width={32}
          height={32}
          className="float-left object-cover rounded-full h-8 w-8"
        />
        <a href={url} target="_blank" className="font-bold text-typo">
          {authorName}
        </a>
        <div className="float-right">
          <Menu as="div" className="inline-block relative">
            <Menu.Button className="text-typo primary-button">
              <AiOutlineEllipsis className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="text-typo text-center bg-primary hover:bg-white hover:text-black-low rounded absolute right-0 w-36 origin-top-right">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`w-full ${active && "text-primary"}`}
                    target="_blank"
                    href={url}
                  >
                    Link to comment
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <p className="text-typo mt-2">{text}</p>
      <div className="flex items-center gap-2 text-typo">
        <AiFillLike /> {likes ?? 0}
      </div>
    </div>
  );
};

export default Comment;
