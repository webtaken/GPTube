import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  return <>{user ? children : null}</>;
};
export default ProtectedRoute;
