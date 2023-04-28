import React, { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header/Header";

interface AdminLayoutProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = ({
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col min-h-screen bg-black-full ${className}`}>
      <Header />
      <main className="my-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
