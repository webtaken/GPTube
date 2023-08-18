import Link from 'next/link'
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Divider } from 'antd'

import { useAuth } from '@/hooks/useAuth'

import { openSans } from '../Common/Fonts'
import DefaultUserImage from '../../assets/img/default_user_image.jpg'

function Header({ className }: { className?: string }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <>
      <header className={`${className ?? ''} ${openSans.className} flex justify-between mx-4 mt-4`}>
        <div className="flex items-center gap-4 mx-8 my-auto">
          <Link
            className="text-xl font-semibold rounded-lg md:text-4xl text-typo hover:text-primary"
            href="/"
          >
            GPTube
          </Link>
          {user ? (
            <div className="flex items-end gap-2">
              <Image
                alt="photo"
                className="rounded-full w-7 h-7"
                height={28}
                src={user.photoURL || DefaultUserImage}
                width={28}
              />
              <p className="text-xl text-typo">{user.displayName || user.email}</p>
            </div>
          ) : null}
        </div>
        <div className="flex order-last my-auto mr-5 space-x-8">
          {/* <Link
            href="/pricing"
            className="text-base font-medium text-typo hover:border-primary hover:text-primary"
          >
            Pricing
          </Link> */}
          <a
            className="flex items-center gap-1 text-base font-medium text-typo hover:border-primary hover:text-primary"
            href="https://twitter.com/node_srojas1/status/1665489150156439553"
            rel="noopener"
            target="_blank"
          >
            <AiOutlineTwitter className="w-6 h-6" /> Follow us
          </a>
          <a
            className="flex items-center gap-1 text-base font-medium text-typo hover:border-primary hover:text-primary"
            href="https://github.com/webtaken/GPTube.git"
            rel="noopener"
            target="_blank"
          >
            <AiOutlineGithub className="w-6 h-6" /> Developers
          </a>
          {user ? (
            <button
              className="text-base font-semibold text-typo hover:border-primary hover:text-primary"
              type="button"
              onClick={() => {
                // This can be a Link, I'm not sure
                logout()
                router.push({ pathname: '/' })
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              className="text-base font-semibold text-typo hover:border-primary hover:text-primary"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </header>
      <Divider className="w-full" style={{ backgroundColor: '#F2F2F2' }} />
    </>
  )
}

export default Header
