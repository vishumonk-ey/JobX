import { forwardRef, useId } from "react";
import React from "react";

const Input = forwardRef(
  (
    { icon, placeholder, label, type = "text", className = "", ...props },
    ref
  ) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <div className="w-full flex items-center gap-1 mb-1">
            {icon ? icon : null}
            <label htmlFor={id} className="font-semibold text-base text-[#22223b]">{label} : </label>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 rounded-lg bg-[#3b82f6]/20 shadow-sm text-black transition-all  border-transparent
            duration-300 cursor-pointer dark:text-white  focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-300 hover:border-blue-400 border outline-none ${className}`}
          {...props}
          ref={ref}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
