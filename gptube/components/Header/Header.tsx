import Link from "next/link";

const Header:React.FC = () => {
return <div className="flow-root p-6">
    <Link href="/" className="float-left text-5xl text-[#006FFF]">GPTube</Link>
</div>;
};

export default Header;