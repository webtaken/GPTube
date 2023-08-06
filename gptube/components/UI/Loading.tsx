import React from "react";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <p
      className={`text-center text-2xl animate-bounce ${
        className && className
      }`}
    >
      🐱
    </p>
  );
};

export default Loading;
