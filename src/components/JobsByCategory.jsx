import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { JOB_API_END_POINT } from "@/utils/constant";

const JobsByCategory = () => {
  const { category } = useParams();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchJobsByCategory = async () => {
      try {
        if (category) {
          const response = await axios.get(`${JOB_API_END_POINT}/categories/${category}`);
          if (response.data.success) {
            setFilteredJobs(response.data.jobs);
  
            // Check sessionStorage for a previously selected job
            const savedJobId = sessionStorage.getItem("selectedJobId");
            const savedJob = response.data.jobs.find((job) => job._id === savedJobId);
  
            // Restore the saved job or set the first job as default
            if (savedJob) {
              setSelectedJob(savedJob);
            } else if (response.data.jobs.length > 0) {
              setSelectedJob(response.data.jobs[0]);
            }
          } else {
            console.error("Failed to fetch jobs");
            setFilteredJobs([]);
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setFilteredJobs([]);
      }
    };
  
    fetchJobsByCategory();
  }, [category]);
  

  const handleJobClick = (job) => {
    if (selectedJob && selectedJob._id === job._id) return;
  
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedJob(job);
      sessionStorage.setItem("selectedJobId", job._id); // Save job ID to sessionStorage
      setIsTransitioning(false);
    }, 200); // Duration matches the transition effect
  };
  

  return (
    <div className="dark:bg-[#141718] bg-[#F5F5F5] h-screen overflow-scroll flex flex-col">
      <Helmet>
        <title>{category ? `${category} Jobs` : "Jobs"}</title>
        <meta
          name="description"
          content={`Browse jobs in the ${category} category`}
        />
        <link rel="canonical" href={`/categories/${category}`} />
      </Helmet>
      <Navbar />
      <div className="flex flex-col lg:flex-row w-[90%] h-[85vh] lg:h-[80vh] rounded-lg dark:border-0 border border-gray-300 shadow-inner mx-auto mt-20 px-4 md:px-0 dark:bg-[#232627]">
        {/* Left Panel: Job List */}
        <div className="md:w-full lg:w-1/3 pr-0 lg:pr-4 border-r lg:border-gray-300 h-auto overflow-scroll mx-1 lg:mx-6">
          <h1 className="font-bold text-lg md:text-xl my-4">
            {category ? `${category} Jobs` : "All Jobs"} ({filteredJobs.length})
          </h1>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => handleJobClick(job)}
                className={`p-4 border mb-4 rounded-lg shadow-md cursor-pointer w-[95%] hover:dark:bg-[#343839] hover:bg-[#EAEAEA] ${
                  selectedJob && selectedJob._id === job._id
                    ? "bg-[#EAEAEA] dark:bg-[#343839]"
                    : "dark:bg-[#232627]"
                }`}
              >
                <h2 className="font-bold text-md">{job.description}</h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold dark:text-gray-300">
                    Company:{" "}
                  </span>
                  <span className="font-semibold dark:text-gray-300">
                    {job.company}
                  </span>
                </p>
                {/* Mobile-only button */}
                <Link
                  to={`/description/${job._id}`}
                  className="block mt-4 text-blue-500 hover:underline text-sm lg:hidden"
                >
                  View Job Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No jobs found in this category.
            </p>
          )}
        </div>
        {/* Right Panel: Job Details */}
        <div
          className={`hidden lg:block w-full h-auto overflow-scroll lg:w-2/3 pl-4 m-5 transform transition-transform duration-300 ${
            isTransitioning
              ? "opacity-0 translate-x-10"
              : "opacity-100 translate-x-0"
          }`}
        >
          {selectedJob ? (
            <div>
              <h2 className="font-bold text-xl mb-4">
                {selectedJob.description}
              </h2>
              <p className="dark:text-gray-300 text-gray-700 mb-4">
                <span className="font-semibold">Company: </span>
                <span className="font-semibold">{selectedJob.company}</span>
              </p>
              {selectedJob.jobContent && selectedJob.jobContent.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-md">
                    {selectedJob.jobContent[0].heading}
                  </h3>
                  <ul className="list-disc ml-6 text-sm dark:text-white text-gray-600">
                    {selectedJob.jobContent[0].content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                to={`/description/${selectedJob._id}`}
                state={{ similarJobs: filteredJobs }}
                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold dark:text-white text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 dark:bg-gray-500 bg-gray-50 group"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out dark:bg-gray-700 bg-indigo-600 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  More Job Details
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobsByCategory;
