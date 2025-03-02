import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchJobs } from "../redux/thunks/searchJob";
import { setSearchedQuery, setSearchJobByText } from "../redux/jobSlice";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchContainerRef = useRef(null); // To track the search container

  const {
    searchResults = [],
    searchLoading,
    searchError,
  } = useSelector((state) => state.job);

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchedQuery(value)); // Track the search query in Redux
    setIsDropdownVisible(value.length >= 3);
  };
  

  useEffect(() => {
    if (query.length >= 3) {
      dispatch(searchJobs(query)); // Trigger search when query is long enough
    } else {
      dispatch(setSearchJobByText([])); // Clear search results if the query is too short
    }
  }, [query, dispatch]);

  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-5 mt-10 pt-12">
        <h3 className="text-5xl md:text-6xl sm:text-4xl md:text-6xl lg:mt-16 font-bold">
          Jobs In{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text ">
            Tech
          </span>
          , Nothing Else
        </h3>
        <div className="search-bar mt-3 w-4/5 md:w-2/5">
          <div className="flex relative" ref={searchContainerRef}>
            <input
              type="text"
              placeholder="Search jobs..."
              value={query}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-l-lg dark:text-white dark:bg-[#44494B] focus:outline-none focus:ring-0"
            />
            <button className="bg-[#1C64F2] w-12 rounded-r-lg flex items-center justify-center">
              <Search className="text-white"></Search>
            </button>

            {/* Loader inside the search bar */}
            {searchLoading && (
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            )}

            {isDropdownVisible && (
              <ul className="absolute top-full left-0 w-full bg-gray-200 dark:bg-[#232627] bg-opacity-95 shadow-lg rounded-lg max-h-80 overflow-y-auto z-10 border border-gray-200">
                {searchResults.length > 0 ? (
                  searchResults.map((job) => (
                    <li
                      key={job._id}
                      className="p-4 border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        navigate(`/description/${job._id}`); // No need to pass similarJobs here
                      }}
                    >
                      <h3 className="font-bold dark:text-white text-black">
                        {job.description}
                      </h3>
                      <p className="dark:text-gray-100 text-slate-700">
                        {job.company}
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Optional error message */}
          {searchError && <p className="text-red-500 mt-4">{searchError}</p>}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
