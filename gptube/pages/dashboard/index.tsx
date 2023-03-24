import AnalisysForm from "@/components/Tool/AnalisysForm";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-xl text-[#006FFF]">
          Let&#900;s check what your subscriber think about your video
        </h2>
      </div>
      <div className="mx-60 my-16">
        <AnalisysForm />
      </div>
    </>
  );
};

export default Dashboard;
