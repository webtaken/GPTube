import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import PreAnalysis from "@/components/Tools/Youtube/PreAnalysis";

const YoutubePanel: MyPage = () => {
  return (
    <>
      <div className="flex justify-center pt-8">
        <h2 className={`${openSans.className} text-xl text-typo`}>
          Let's check what your subscriber think about your video
        </h2>
      </div>
      <PreAnalysis />
    </>
  );
};

export default YoutubePanel;
YoutubePanel.Layout = "Admin";
