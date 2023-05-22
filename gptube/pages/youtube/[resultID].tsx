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
import { Spin } from "antd";

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
        <div className={`${openSans.className}`}>
          <p className="text-2xl text-typo text-center mt-6">
            Here is the analysis of your video 🤗!
          </p>
          <p className="text-lg text-typo text-center my-4">
            "{analysis?.video_title}"
          </p>
          <div className="grid justify-items-center">
            <a
              href={`https://youtu.be/${analysis?.video_id}`}
              target="_blank"
              className="flex gap-2 items-center mx-auto font-medium text-typo hover:underline"
            >
              <AiFillYoutube className="text-red-600" />{" "}
              <span className="text-center">
                https://youtu.be/{analysis.video_id}
              </span>
            </a>
          </div>
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
          <NegativeComments
            videoID={analysis.video_id}
            comments={analysis.results.negative_comments}
            recommendationChatGPT="Here is your recommendation"
          />
        </div>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default YoutubeResults;
YoutubeResults.Layout = "Admin";
