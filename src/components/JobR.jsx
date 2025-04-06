import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const JobR = ({ job }) => {
  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/description/${job?._id}`, "_blank");
  };

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-bold text-lg dark:text-white">{job?.title}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{job?.companyName}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            job?.jobType === 'Full-time' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            job?.jobType === 'Part-time' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {job?.jobType}
          </span>
          
          <button 
            onClick={handleBookmarkClick}
            className="p-2 text-gray-400 hover:text-[#7209b7] dark:hover:text-[#9d4edd] transition-colors"
            aria-label="View job details in new tab"
            title="View details in new tab"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="my-4">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex justify-end mt-6">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            asChild
          >
            <Link to={`/description/${job?._id}`}>Details</Link>
          </Button>
          <Button
            className="bg-[#7209b7] hover:bg-[#5d078f]"
            onClick={() => window.open(job?.jobLink, "_blank")}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobR;