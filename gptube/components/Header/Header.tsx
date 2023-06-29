import Link from "next/link";
import { openSans } from "../Common/Fonts";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { useRouter } from "next/router";
import { Divider } from "antd";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  console.log(user);
  return (
    <>
      <header
        className={`${className} ${openSans.className} flex justify-between mx-4 mt-4`}
      >
        <div className="flex my-auto mx-8 items-center gap-4">
          <Link
            href="/"
            className="text-xl md:text-4xl font-semibold text-typo rounded-lg hover:text-primary"
          >
            GPTube
          </Link>
          {user && (
            <div className="flex items-end gap-2">
              <img
                className="w-7 h-7 rounded-full"
                src={
                  user.photoURL ||
                  "https://vercel.com/api/www/avatar/vz3qUGHwDbSCNuPeeDxSsJZk?&s=60"
                }
                alt="photo"
              />
              <p className="text-xl text-typo">
                {user.displayName || user?.email}
              </p>
            </div>
          )}
        </div>
        <div className="flex order-last my-auto space-x-8 mr-5">
          <a
            href="https://twitter.com/node_srojas1/status/1665489150156439553"
            target="_blank"
            className="flex items-center gap-3 text-base font-medium px-5 py-1 text-typo border-2 rounded-lg border-typo hover:border-primary hover:text-primary"
          >
            <AiOutlineTwitter className="w-6 h-6" /> Follow us
          </a>
          <a
            href="https://github.com/webtaken/GPTube.git"
            target="_blank"
            className="flex items-center gap-3 text-base font-medium px-5 py-1 text-typo border-2 rounded-lg border-typo hover:border-primary hover:text-primary"
          >
            <AiOutlineGithub className="w-6 h-6" /> Developers
          </a>
          {user ? (
            <button
              className="text-base font-medium px-5 py-1 text-typo border-2 rounded-lg border-typo hover:border-primary hover:text-primary"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-base font-medium px-5 py-1 text-typo border-2 rounded-lg border-typo hover:border-primary hover:text-primary"
            >
              Log In
            </Link>
          )}
        </div>
      </header>
      <Divider style={{ backgroundColor: "#F2F2F2" }} />
    </>
  );
};

export default Header;
