import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCardR from "./FilterCardR";
import JobR from "./JobR";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { fetchRemoteCompaniesWithActiveJobs } from "@/redux/thunks/companyThunk";

const RemoteJobs = () => {
  const dispatch = useDispatch();
  const { companiesWithActiveJobs } = useSelector((store) => store.company);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Changed to null initially

  // Flatten all jobs from all companies for filtering
  const allJobs = companiesWithActiveJobs.flatMap(company => 
    company.jobs.map(job => ({ ...job, companyName: company.companyName }))
  );

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory
    ? allJobs.filter(job => job.jobCategory === selectedCategory)
    : [];

  useEffect(() => {
    dispatch(fetchRemoteCompaniesWithActiveJobs());
  }, [dispatch]);

  const handleCloseFilter = () => {
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null); // Reset to null to show the initial message
  };

  return (
    <div className="dark:bg-[#141718] min-h-screen mt-10 pt-8">
      <Helmet>
        <title>Remote Jobs by Category</title>
        <meta name="description" content="Explore remote job opportunities by category" />
        <link rel="canonical" href="https://jobsintech.live/jobs" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-purple-800 dark:to-blue-900 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Remote Tech Jobs</h1>
          <p className="text-lg opacity-90">Browse remote positions by category</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter card for desktop */}
          <div className="w-full md:w-72 lg:w-80 hidden md:block sticky top-24 h-fit">
            <FilterCardR 
              jobs={allJobs} 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onClose={handleCloseFilter}
              onReset={handleResetFilters} // Pass reset handler
            />
          </div>

          {/* Jobs display */}
          <div className="flex-1">
            {/* Category filter header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold dark:text-white">
                {selectedCategory 
                  ? `${selectedCategory} Jobs (${filteredJobs.length})`
                  : "Select a category to see remote jobs"}
              </h2>
              <button
                onClick={() => setShowFilterModal(true)}
                className="md:hidden flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Filters
              </button>
            </div>

            {selectedCategory ? (
              filteredJobs.length === 0 ? (
                <div className="text-center py-16 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl font-medium mb-2">
                    No {selectedCategory} jobs found
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or check back later
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      key={job._id}
                    >
                      <JobR job={job} />
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-xl font-medium mb-2">
                  Select a category to view remote jobs
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose from the available job categories to see matching positions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter modal */}
      {showFilterModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 w-full max-w-md max-h-[80vh] rounded-lg relative overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold dark:text-white">Filter Jobs</h3>
              <button
                onClick={handleCloseFilter}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              <FilterCardR 
                jobs={allJobs}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onClose={handleCloseFilter}
                onReset={handleResetFilters}
              />
            </div>
            <div className="p-4 border-t dark:border-gray-700 flex justify-end">
              <button
                onClick={handleCloseFilter}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RemoteJobs;