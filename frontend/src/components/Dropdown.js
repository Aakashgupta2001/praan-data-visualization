import React, { useState } from "react";

const Dropdown = ({ onSelect, options, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white dark:bg-slate-500 dark:text-white border font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>{selectedValue}</span>
          <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12l-4-4h8l-4 4z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10">
          <div className="py-1 rounded-md bg-white shadow-xs">
            {options.map((option) => (
              <a
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
