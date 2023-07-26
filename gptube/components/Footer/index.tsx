import { LinkedinOutlined, GoogleOutlined } from "@ant-design/icons";

const iconSize = {
  fontSize: "30px",
  backgroundColor: "#6C6C6C",
  padding: "10px",
  borderRadius: "100%",
  color: "white",
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black-full mt-auto mb-6 mx-10">
      <button className="cursor-auto text-base font-medium px-2 text-typo border-2 rounded-lg border-typo">
        CONTACT US
      </button>
      <div className="flex gap-4 mb-4 justify-center">
        <a
          href="mailto:gptube.team@gmail.com?subject=Hi, I want to know more about GPTube"
          className="flex items-center gap-1"
        >
          <GoogleOutlined rev style={iconSize} />
        </a>
        <a
          href="https://www.linkedin.com/posts/saul-rojas-6885b1188_buildinpublic-vercel-activity-7071255622289117184-lyh8?utm_source=share&utm_medium=member_desktop"
          target="_blank"
        >
          <LinkedinOutlined rev style={iconSize} />
        </a>
      </div>
      <p className="text-center text-white mt-2">
        Copyright © 2023 GPTube, 2023
      </p>
    </footer>
  );
};

export default Footer;
