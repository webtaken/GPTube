import Image from "next/image";
import positiveThinking from "@/assets/img/positive-thinking.png";
import pessimistic from "@/assets/img/pessimistic.png";
import sadness from "@/assets/img/sadness.png";

const Service: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <div className="m-auto bg-slate-100 w-80 h-96 rounded-3xl p-4">
        <Image
          className="rounded-full bg-blue-100 p-4"
          src={positiveThinking}
          width={220}
          alt="Sentimental image"
        />
        <p className="text-xl uppercase font-black">Sentimental Analysis</p>
      </div>
      <div className="m-auto bg-slate-100 w-80 h-96 rounded-3xl p-4">
        <Image
          className="rounded-full bg-blue-100 p-4"
          src={pessimistic}
          width={210}
          alt="Total score image"
        />
        <p className="text-xl uppercase font-black">Total Score from video</p>
      </div>
      <div className="m-auto bg-slate-100 w-80 h-96 rounded-3xl p-4">
        <Image
          className="rounded-full bg-blue-100 p-4"
          src={sadness}
          width={210}
          alt="Best rated image"
        />
        <p className="text-xl uppercase font-black">Best rated comment</p>
      </div>
    </div>
  );
};

export default Service;
