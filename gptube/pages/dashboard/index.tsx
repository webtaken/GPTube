import { MyPage } from "@/components/Common/Types";
import { useAuth } from "@/context/AuthContext";

const Dashboard: MyPage = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="flex justify-center pt-8">
        <h2 className="text-xl text-typo">Welcome {user?.email}</h2>
      </div>
    </>
  );
};

export default Dashboard;
Dashboard.Layout = "Admin";
