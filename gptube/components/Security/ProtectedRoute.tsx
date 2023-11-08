import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push({
        pathname: "/login",
        query: {
          from: router.query.from,
        },
      });
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
}

export default ProtectedRoute;
