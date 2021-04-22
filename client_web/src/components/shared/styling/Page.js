import React from "react";

export default function Page({ children, className }) {
  return (
    <div className="flex justify-center pt-2">
      <div className={`flex flex-col w-full max-w-xl ${className}`}>
        {children}
      </div>
    </div>
  );
}
