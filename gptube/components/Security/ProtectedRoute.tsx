import { useAuth, localStoreAuthVar } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(localStoreAuthVar);
    if (!user && !isAuthenticated) {
      router.push("/login");
    } else {
      localStorage.setItem(localStoreAuthVar, "true");
    }
  }, [router, user]);
  return <>{user ? children : null}</>;
};
export default ProtectedRoute;
