/* eslint-disable react-refresh/only-export-components */
import { useId } from "react";

const Select = ({ label, options, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div>
      {label && <label id={id}></label>}
      <select
        id={id}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border-gray-200 w-full ${className}`}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} id={id} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
