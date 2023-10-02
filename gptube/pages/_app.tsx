import "@/styles/globals.css";
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
import type { LayoutsAvailable } from "@/components/Layouts/map-layouts";

import { useRouter } from "next/router";
import Script from "next/script";
import { NextUIProvider } from "@nextui-org/react";

import { MapLayouts } from "@/components/Layouts/map-layouts";
import { AuthContextProvider } from "@/context/AuthContext/AuthContext";
import ProtectedRoute from "@/components/Security/ProtectedRoute";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const noAuthRequired = ["/", "/login", "/reset", "/pricing"];

type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    Layout: LayoutsAvailable;
  };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const Layout = MapLayouts[Component.Layout];

  return (
    <NextUIProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
            </Layout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthContextProvider>
      <Script defer src="https://assets.lemonsqueezy.com/lemon.js" />
    </NextUIProvider>
  );
}
