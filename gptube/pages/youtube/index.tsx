import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import PreAnalysis from "@/components/Tools/Youtube/PreAnalysis";

const YoutubePanel: MyPage = () => {
  return (
    <>
      <h2 className={`${openSans.className} text-xl text-center text-typo`}>
        Let's check what your subscriber think about your video
      </h2>
      <p className="text-typo text-sm text-center">
        Remember: A max of 1000 comments are allowed per video
      </p>
      <PreAnalysis />
    </>
  );
};

export default YoutubePanel;
YoutubePanel.Layout = "Admin";
