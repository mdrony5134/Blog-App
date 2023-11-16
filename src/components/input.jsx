import React from "react";
import { useId } from "react";

const input = React.forwardRef(function Input(
  { label, type = "text", className='', ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 pl-1 inline-block" id={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border-gray-200 w-full ${className}`}
        id={id}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default input;
