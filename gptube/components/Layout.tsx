import React from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ className, children }) => {
  return (
    <div className={`flex flex-col min-h-screen bg-black-full ${className}`}>
      <Header />
      <main className="my-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
