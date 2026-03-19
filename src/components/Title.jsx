import React from "react";
import { twMerge } from "tailwind-merge";

const Title = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-2xl font-semibold", className)}>
      {children}
    </h2>
  );
};

export default Title;