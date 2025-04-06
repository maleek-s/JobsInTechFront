import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Helmet } from "react-helmet-async";
import useGetAllJobs from "../hooks/useGetAllJobs"

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const dispatch = useDispatch();

  // Filter jobs based on the searchedQuery
  useEffect(() => {
    // Apply the filter only if searchedQuery exists
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      // If no query, show all jobs
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  // Modal closing function should NOT reset searchedQuery
  const handleCloseFilter = () => {
    setShowFilterModal(false); // Just close the modal, but keep the search query intact
  };

  useEffect(() => {
    return () => {
      // Reset searchedQuery ONLY when this component unmounts (not on modal close)
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="dark:bg-[#141718] h-screen overflow-scroll">
      <Helmet>
        <title>All jobs</title>
        <meta name="description" content="Search for your next remote job" />
        <link rel="canonical" href="https://jobsintech.live/jobs" />
      </Helmet>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-20 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Only show the filter card on desktop */}
          <div className="w-full md:w-1/4 hidden md:block">
            <FilterCard onClose={handleCloseFilter} />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for FilterCard on mobile */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-4/5 h-4/5 rounded-lg relative p-5 overflow-hidden">
            <button
              onClick={handleCloseFilter}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
            >
              &times;
            </button>
            <div className="h-full w-full overflow-y-auto">
              <FilterCard onClose={handleCloseFilter} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter button */}
      <button
  onClick={() => setShowFilterModal(true)}
  className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg md:hidden"
>
  Filters
</button>

    </div>
  );
};

export default Jobs;
