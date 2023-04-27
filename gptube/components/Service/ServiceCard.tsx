import Image from "next/image";
import { Open_Sans } from "next/font/google";
import { Layout } from "antd";

const { Content } = Layout;
const openSans = Open_Sans({
  subsets: ["latin"],
});

interface ServiceCardProps {
  left?: boolean;
  content: string;
  image: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ left, content, image }) => {
  if (left) {
    return (
      <Content className="opacity-1 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mx-auto w-full rounded-2xl md:p-6 sm:py-4 px-4 py-2 items-center">
        <div className="grid justify-center w-fit mx-auto">
          <Image
            className="h-48 w-48 md:h-64 md:w-64 lg:w-72 lg:h-72 my-auto mx-auto"
            src={image}
            alt="analysis report"
          />
        </div>
        <div className="grid lg:gap-6 gap-2 mx-4">
          <div className="flex gap-2">
            <p
              className={`${openSans.className} text-typo text-lg text-justify font-medium mx-5`}
            >
              {content}
            </p>
          </div>
        </div>
      </Content>
    );
  }
  return (
    <Content className="opacity-1 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mx-auto w-full rounded-2xl md:p-6 sm:py-4 px-4 py-2 items-center">
      <div className="grid lg:gap-6 gap-2 mx-4">
        <div className="flex gap-2">
          <p
            className={`${openSans.className} text-typo text-lg text-justify font-medium mx-5`}
          >
            {content}
          </p>
        </div>
      </div>
      <div className="grid justify-center w-fit mx-auto">
        <Image
          className="h-48 w-48 md:h-64 md:w-64 lg:w-72 lg:h-72 my-auto mx-auto"
          src={image}
          alt="analysis report"
        />
      </div>
    </Content>
  );
};

export default ServiceCard;
