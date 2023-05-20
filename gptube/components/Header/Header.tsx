import Link from "next/link";
import { openSans } from "../Common/Fonts";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header
      className={`${className} ${openSans.className} flex justify-between mx-4 mt-4`}
    >
      <div className="flex my-auto mx-8">
        <Link
          href="/"
          className="text-xl md:text-4xl font-semibold text-typo rounded-lg hover:text-primary"
        >
          GPTube
        </Link>
      </div>
      {user ? (
        <div className="flex order-last my-auto space-x-8 mr-5">
          <button
            className="text-base font-medium px-5 py-1 text-typo border-2 rounded-lg border-typo hover:border-primary hover:text-primary"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex order-last my-auto space-x-8 mr-5">
          <Link
            href="/login"
            className="text-base font-medium px-5 py-1 text-typo border-2 rounded-lg border-typo hover:border-primary hover:text-primary"
          >
            Log In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
