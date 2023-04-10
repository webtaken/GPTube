import Image from "next/image";
import smile from "@/assets/img/smile.png";
import badMood from "@/assets/img/bad-mood.png";
import unhappy from "@/assets/img/unhappy.png";

const About: React.FC = () => {
  return (
    <div className="flex h-full mx-10">
      <div className=" flex-col mx-24 my-auto">
        <p className="text-3xl font-black uppercase mb-10 mr-10">
          Get insights from your video
        </p>
        <p className="text-xl text-gray-500">
          We use the <span className="font-bold">AI technology</span> to provide
          you with the most accurate{" "}
          <span className="font-bold">sentiment analysis</span> of your video
        </p>
      </div>
      <div className="flex my-auto">
        <div className="card">
          <Image src={smile} width={100} alt="Happy Face" />
          <p className="card-title">GOOD</p>
        </div>
        <div className="card">
          <Image src={badMood} width={100} alt="Neutral Face" />
          <p className="card-title">NEUTRAL</p>
        </div>
        <div className="card">
          <Image src={unhappy} width={100} alt="Sad Face" />
          <p className="card-title">BAD</p>
        </div>
      </div>
    </div>
  );
};

export default About;
