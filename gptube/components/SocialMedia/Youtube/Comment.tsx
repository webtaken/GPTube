import { Menu } from '@headlessui/react'
import Image from 'next/image'
import { AiFillLike, AiOutlineEllipsis } from 'react-icons/ai'

interface CommentProps {
  key?: React.Key
  url: string
  authorName: string
  authorProfileImageURL: string
  text: string
  likes?: number
  // ModerationStatus: The comment's moderation status. Will not be set if
  // the comments were requested through the id filter.
  //
  // Possible values:
  //   "published" - The comment is available for public display.
  //   "heldForReview" - The comment is awaiting review by a moderator.
  //   "likelySpam"
  //   "rejected" - The comment is unfit for display.
  moderationStatus?: string
}

function Comment({ authorName, authorProfileImageURL, text, url, likes }: CommentProps) {
  return (
    <div className="p-3 my-3 border rounded-md">
      <div className="items-center flow-root space-x-2">
        <Image
          alt="profile image"
          className="float-left object-cover w-8 h-8 rounded-full"
          height={32}
          src={authorProfileImageURL}
          width={32}
        />
        <a className="font-bold text-typo" href={url} rel="noopener" target="_blank">
          {authorName}
        </a>
        <div className="float-right">
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="text-typo primary-button">
              <AiOutlineEllipsis className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 text-center origin-top-right rounded text-typo bg-primary hover:bg-white hover:text-black-low w-36">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`w-full ${active ? 'text-primary' : ''}`}
                    href={url}
                    rel="noopener"
                    target="_blank"
                  >
                    Link to comment
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <p className="mt-2 text-typo">{text}</p>
      <div className="flex items-center gap-2 text-typo">
        <AiFillLike /> {likes ?? 0}
      </div>
    </div>
  )
}

export default Comment
