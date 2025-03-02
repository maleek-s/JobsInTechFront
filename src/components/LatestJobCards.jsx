import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ jobs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const jobsPerSlide = 3; // Number of jobs to display per slide
  const totalSlides = Math.ceil(jobs.length / jobsPerSlide);

  // Update the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [totalSlides]);

  // Get the jobs for the current slide
  const currentJobs = jobs.slice(
    currentIndex * jobsPerSlide,
    currentIndex * jobsPerSlide + jobsPerSlide
  );

  return (
    <div className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <motion.div
            key={job._id}
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-md shadow-xl bg-white dark:bg-gray-900 border border-gray-100 cursor-pointer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="font-medium text-lg">{job?.company}</h3>
            </div>
            <div>
              <h3 className="font-bold text-lg my-2">{job?.title}</h3>
              <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobCards;
