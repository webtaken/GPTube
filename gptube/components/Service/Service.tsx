import AnalysisReport from "@/assets/icons/analysis_report.svg";
import SentimentAnalysis from "@/assets/icons/sentiment_analysis.svg";
import ProudSelf from "@/assets/icons/proud_self.svg";
import ServiceCard from "./ServiceCard";

const Service: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center m-10">
      <ServiceCard
        content="Natural language processing to categorize comments and improve
              your content strategy..."
        image={AnalysisReport}
      />
      <ServiceCard
        content="We provide you with valuable insights into how your audience feels
        about your content..."
        image={SentimentAnalysis}
      />
      <ServiceCard
        content="Don't miss out on the opportunity to take your content to the next
        level - try our tool today!"
        image={ProudSelf}
      />
    </div>
  );
};

export default Service;
