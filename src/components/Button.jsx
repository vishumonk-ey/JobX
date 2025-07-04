import React from "react";

function Button({ children, className, onClick, ...props }) {
  return (
    <button
      className={`w-fit px-3 py-2 hover:bg-indigo-400 bg-indigo-500 transition-colors duration-200 ease-in-out rounded-lg text-white ${className} `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
