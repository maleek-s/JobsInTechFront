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

const formatCategoryDisplayName = (category) => {
  return category
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case words
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchTriggered, setFetchTriggered] = useState(false);

  useFetchCategories();

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

  const getCategoryIcon = (category) => {
    return categoryIconMap[category] || AlertCircle;
  };

  const jobCategories = useSelector((state) => state.job.jobCategory);

  const handleCategoryClick = (category) => {
    dispatch(setSearchedQuery(category));
    navigate(`/categories/${category}`);
  };

  if (!jobCategories || jobCategories.length === 0) {
    return <p>Loading categories...</p>;
  }

  const sortedCategories = [...jobCategories]
    .filter((category) => category)
    .sort((a, b) => a.localeCompare(b));

  const handleMouseEnter = () => {
    if (!fetchTriggered) {
      useFetchCategories();
      setFetchTriggered(true);
    }
  };

  return (
    <div className="w-full dark:bg-[#141718] mt-10" onMouseEnter={handleMouseEnter}>
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap w-11/12 md:w-8/12 justify-center">
          {sortedCategories.map((category, index) => {
            const Icon = getCategoryIcon(category);
            return (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="flex items-center justify-center m-2 md:m-4 px-3 md:px-2 py-2 border border-slate-300 text-white rounded-3xl shadow-lg transition dark:hover:bg-gray-700 hover:shadow-xl hover:scale-105"
              >
                <Icon className="w-5 h-5 mr-2 text-black dark:text-white" />
                <span className="text-black dark:text-white">
                  {formatCategoryDisplayName(category)}
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
