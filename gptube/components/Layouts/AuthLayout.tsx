import React, { PropsWithChildren, ReactNode } from "react";

interface AuthLayoutProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col min-h-screen bg-black-full ${className}`}>
      <main className="my-auto">{children}</main>
    </div>
  );
};

export default AuthLayout;
