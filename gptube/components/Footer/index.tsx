import { AiFillGoogleCircle, AiFillInstagram } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8F8F8] mt-auto">
      <div className="flow-root ml-6 mx-8 mt-2">
        <p className="text-[#006FFF] text-4xl float-left">Connect with us</p>
      </div>
      <div className="grid grid-cols-5 m-6">
        <div className="flex items-center space-x-1">
          <a
            href="mailto:gptube.team@gmail.com?subject=Hi, I want to know something"
            className="flex items-center gap-1"
          >
            <AiFillGoogleCircle /> <p>G-Mail</p>
          </a>
        </div>
      </div>
      <div className="my-2">
        <p className="text-center">
          GPTube © 2023 - All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
