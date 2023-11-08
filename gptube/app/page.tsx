"use client";

import { DashboardUI } from "@/components/dashboard/dashboard-ui";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LandingUI } from "@/components/landing/landing-ui";
import { useAuth } from "@/hooks/use-auth";

// TODO: Set this page as the default landing page, the Dashboard component should be in the "/dashboard" route
export default function Home() {
  const { isLoadingAuth, user } = useAuth();

  if (isLoadingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {user ? (
        <DashboardUI />
      ) : (
        <>
          <LandingUI />
          <Footer />
        </>
      )}
    </>
  );
}
