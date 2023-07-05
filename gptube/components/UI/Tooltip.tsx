import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  position?: "top" | "right" | "left" | "bottom";
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, position }) => {
  return (
    <div className="group relative inline-block">
      {children}
      {position === "right" && (
        <div className="absolute left-full top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
          <span className="absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
          {title}
        </div>
      )}
      {position === "left" && (
        <div className="absolute right-full top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
          <span className="absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
          {title}
        </div>
      )}
      {position === "bottom" && (
        <div className="absolute top-full left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
          <span className="absolute top-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
          {title}
        </div>
      )}
      {position === "top" && (
        <div className="absolute bottom-full left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
          <span className="absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
          {title}
        </div>
      )}
      {position === undefined && (
        <div className="absolute bottom-full left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
          <span className="absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
          {title}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
