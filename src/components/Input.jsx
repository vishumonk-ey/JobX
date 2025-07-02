import { forwardRef, useId } from "react";
import React from "react";

const Input = forwardRef(
  ({ placeholder, label, type = "text", className = "", ...props }, ref) => {
    const id = useId()
    return (
      <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1 "
        htmlFor={id}>{label} : </label>}
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
