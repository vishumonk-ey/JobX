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
            <label htmlFor={id}>{label} : </label>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 rounded-lg focus:bg-emerald-600/80 bg-emerald-600 outline-none text-black transition-all duration-200 dark:text-white dark:focus:  ${className}`}
          {...props}
          ref={ref}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
