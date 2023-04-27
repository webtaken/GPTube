import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
});

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${className} ${openSans.className} flex justify-between mx-4 mt-4`}>
      <div className="flex my-auto mx-8">
        <Link
          href="/"
          className="text-xl md:text-4xl font-semibold text-typo rounded-lg"
        >
          GPTube
        </Link>
      </div>
      <div className="flex order-last my-auto">
        <Link href="/#register" className="link rounded-lg text-sm md:text-lg">
          SIGN UP / LOG IN
        </Link>
      </div>
    </header>
  );
};

export default Header;
