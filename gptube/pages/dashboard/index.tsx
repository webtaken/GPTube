import AnalysisForm from "@/components/Tool/AnalysisForm";
import PreAnalysisResult from "@/components/Tool/PreAnalysisResult";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex justify-center pt-8">
        <h2 className="text-xl text-[#006FFF]">
          Let&#900;s check what your subscriber think about your video
        </h2>
      </div>
      <div className="mx-60 my-16">
        <AnalysisForm />
      </div>
      <div className="bg-slate-50">
        <PreAnalysisResult />
      </div>
    </>
  );
};

export default Dashboard;
