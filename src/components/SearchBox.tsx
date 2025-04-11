import React, { useState, ChangeEvent } from "react";

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");


const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    console.log("Search term changed:", newSearchTerm);
    onSearch(newSearchTerm);
  };
  return (
    <div className={`relative rounded-md shadow-sm ${className}`}>
      <input
        type="text"
        className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        {searchTerm && (
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
