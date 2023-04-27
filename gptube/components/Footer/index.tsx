import { Button } from "antd";
import { GithubOutlined, LinkedinOutlined, GoogleOutlined } from "@ant-design/icons";

const iconSize = {
    fontSize: "30px",
    backgroundColor: "#6C6C6C",
    padding: "10px",
    borderRadius: "100%",
    color: "white"
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-black-full mt-auto mb-6 mx-10">
            <Button className="text-white">
                CONTACT US
            </Button>
            <div className="flex gap-4 mb-4 justify-center">
                <a
                    href="mailto:gptube.team@gmail.com?subject=Hi, I want to know something"
                    className="flex items-center gap-1"
                >
                    <GoogleOutlined style={iconSize} />
                </a>
                <a href=""><GithubOutlined style={iconSize} /></a>
                <a href=""><LinkedinOutlined style={iconSize} /></a>
            </div>
            <p className="text-center text-white mt-2">
                Copyright © 2023 GPTube, 2023
            </p>
        </footer>
    );
};

export default Footer;
