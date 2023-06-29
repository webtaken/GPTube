import { MyPage } from "@/components/Common/Types";
import { useAuth } from "@/context/AuthContext";

const Dashboard: MyPage = () => {
  const { user } = useAuth();
  return (
    <div className="mx-8">
      <h2 className="text-2xl text-typo absolute">
        Welcome {user?.displayName || user?.email}
      </h2>
    </div>
  );
};

export default Dashboard;
Dashboard.Layout = "Admin";
