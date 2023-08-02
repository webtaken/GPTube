import Image from "next/image";
import { openSans } from "../Common/Fonts";
import { Layout } from "antd";

const { Content } = Layout;

interface ServiceCardProps {
  content: string;
  image: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ content, image }) => {
  return (
    <div className="bg-black-medium rounded-lg pt-4">
      <Image className="h-28 w-28 my-auto mx-auto" src={image} alt="service" />
      <div className="bg-black-medium p-4 rounded-lg">
        <p className="">{content}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
