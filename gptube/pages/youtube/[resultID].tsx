import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { AiFillYoutube } from "react-icons/ai";

import BertResultsBanner from "@/components/Tools/Youtube/BertResultsBanner";
import RobertaResultsBanner from "@/components/Tools/Youtube/RobertaResultsBanner";
import { MyPage } from "@/components/Common/Types";
import { openSans } from "@/components/Common/Fonts";
import { AnalysisResults } from "@/types/youtube";
import { firestore } from "@/config/firebase";
import NegativeComments from "@/components/Tools/Youtube/NegativeComments";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { paramValToString } from "@/utils";
import { Layout } from "antd";

const { Content } = Layout;

const YoutubeResults: MyPage = () => {
  const router = useRouter();
  const resultID = paramValToString(router.query.resultID);
  const [analysis, setAnalysis] = useState<AnalysisResults>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getResults = async () => {
      try {
        const docRef = doc(firestore, "YoutubeResults", resultID);
        const docSnap = await getDoc(docRef);
        // Check if the document exists
        if (!docSnap.exists()) {
          setLoaded(true);
          return;
        }

        // Extract the document data and map it to a MyData object
        const docData = docSnap.data();
        const analysisYoutube = {
          _id: docSnap.id,
          video_id: docData.video_id || null,
          video_title: docData.video_title || null,
          results: docData.results || null,
          error: docData.error || null,
        };
        setAnalysis(analysisYoutube);
        setLoaded(true);
      } catch (error) {
        toast.error(String(error));
      }
    };
    getResults();
  }, []);

  if (!loaded) {
    return <p className="text-center text-6xl animate-bounce">🐱</p>;
  }

  return (
    <>
      <Toaster />
      {analysis ? (
        <>
          <Content
            className={`${openSans.className} bg-black-medium border-gray-500 border my-6 pb-6 mx-20 rounded-md text-typo`}
          >
            <p className="text-2xl font-black text-typo pt-6 px-6">
              Here is the analysis of your video 🤗!
            </p>
            <p className="flex items-center gap-2 text-lg font-bold text-typo py-6 px-6">
              <AiFillYoutube className="text-red-600 w-6 h-6" />
              <a
                href={`https://youtu.be/${analysis?.video_id}`}
                target="_blank"
                className="font-bold text-typo hover:underline"
              >
                <span className="text-center">"{analysis?.video_title}"</span>
              </a>
            </p>
            <NegativeComments
              videoID={analysis.video_id}
              recommendationChatGPT={analysis.results.recommendation_chat_gpt}
            />
          </Content>
          <Content
            className={`${openSans.className} bg-black-medium border-gray-500 border my-6 mx-20 rounded-md text-typo`}
          >
            <p className="text-2xl font-black text-typo pt-6 px-6">
              AI models results 🧠
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <BertResultsBanner
                score_1={analysis.results.bert_results.score_1}
                score_2={analysis.results.bert_results.score_2}
                score_3={analysis.results.bert_results.score_3}
                score_4={analysis.results.bert_results.score_4}
                score_5={analysis.results.bert_results.score_5}
                success_count={analysis.results.bert_results.success_count}
                errors_count={analysis.results.bert_results.errors_count}
              />
              <RobertaResultsBanner
                positive={analysis.results.roberta_results.positive}
                neutral={analysis.results.roberta_results.neutral}
                negative={analysis.results.roberta_results.negative}
                success_count={analysis.results.roberta_results.success_count}
                errors_count={analysis.results.roberta_results.errors_count}
              />
            </div>
          </Content>
        </>
      ) : (
        <Content
          className={`${openSans.className} bg-black-medium border-gray-500 border my-6 mx-20 rounded-md text-typo`}
        >
          <p className="text-center m-auto p-10 text-4xl text-typo">
            We couldn't find your result 🙀!
          </p>
        </Content>
      )}
    </>
  );
};

export default YoutubeResults;
YoutubeResults.Layout = "Admin";
