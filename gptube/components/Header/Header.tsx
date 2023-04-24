import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between h-24">
      <div className="flex my-auto mx-8">
        <Link href="/" className="text-4xl font-semibold mx-10 text-blue-600 rounded-lg">
          GPTube
        </Link>
      </div>
      <div className="flex order-last gap-14 mx-12 my-auto">
        <Link href="/#about" className="link text-lg rounded-lg">
          ABOUT
        </Link>
        <Link href="/#service" className="link text-lg rounded-lg">
          SERVICE
        </Link>
        <Link href="/#register" className="link text-lg rounded-lg">
          SIGN UP
        </Link>
      </div>
    </header>
  );
};

export default Header;
