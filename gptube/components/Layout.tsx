import * as React from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
