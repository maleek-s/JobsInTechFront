import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import useFetchCategories from "@/hooks/useFetchCategories";
import {
  User,
  Headphones,
  Gamepad2,
  Smartphone,
  BarChart,
  PieChart,
  Monitor,
  Shield,
  Briefcase,
  MessageCircle,
  DollarSign,
  Code,
  Server,
  Package,
  Cloud,
  Wrench,
  Cpu,
  AlertCircle,
} from "lucide-react";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchTriggered, setFetchTriggered] = useState(false);

  // Call the useFetchCategories hook to fetch data and dispatch to Redux
  useFetchCategories();

  // Mapping of categories to their corresponding icons
  const categoryIconMap = {
    UXUI: User,
    SupportIT: Headphones,
    GameDevelopment: Gamepad2,
    MobileDevelopment: Smartphone,
    DataAnalyst: BarChart,
    Marketing: PieChart,
    Frontend: Monitor,
    Security: Shield,
    ProductManager: Briefcase,
    CustomerSupport: MessageCircle,
    Finance: DollarSign,
    Fullstack: Code,
    Backend: Server,
    Miscellaneous: Package,
    Cloud: Cloud,
    DevOps: Wrench,
    Robotics: Cpu,
  };

  // Function to get the icon for a category (defaults to AlertCircle if not found)
  const getCategoryIcon = (category) => {
    return categoryIconMap[category] || AlertCircle;
  };

  // Subscribe to the Redux state to get categories
  const jobCategories = useSelector((state) => state.job.jobCategory);

  // Handle category click: update Redux state and navigate
  const handleCategoryClick = (category) => {
    dispatch(setSearchedQuery(category)); // Set the searched category in Redux
    navigate(`/categories/${category}`);
  };

  // Handle loading state
  if (!jobCategories || jobCategories.length === 0) {
    return <p>Loading categories...</p>;
  }

  // Sort categories alphabetically
  // Filter out invalid or null values and then sort
  const sortedCategories = [...jobCategories]
    .filter((category) => category) // Remove null, undefined, or falsy values
    .sort((a, b) => a.localeCompare(b));

  const handleMouseEnter = () => {
    if (!fetchTriggered) {
      useFetchCategories();
      setFetchTriggered(true);
    }
  };

  return (
    <div className="w-full dark:bg-[#141718] mt-10" onMouseEnter={handleMouseEnter}>
      {/* Content */}
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap w-11/12 md:w-8/12 justify-center">
          {sortedCategories.map((category, index) => {
            const Icon = getCategoryIcon(category); // Get the appropriate icon
            return (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="flex items-center justify-center m-2 md:m-4 px-3 md:px-2 py-2 border border-slate-300 text-white rounded-3xl shadow-lg transition dark:hover:bg-gray-700 hover:shadow-xl hover:scale-105"
              >
                {/* Dynamically render the icon */}
                <Icon className="w-5 h-5 mr-2 text-black dark:text-white" />
                <span className="text-black dark:text-white">
                  {category || "Unknown"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
