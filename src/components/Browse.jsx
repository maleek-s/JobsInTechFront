import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    console.log("searchedQuery:", searchedQuery);
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
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Helmet>
        <title>Browse Jobs</title>
        <meta name="description" content="Search for your next remote job" />
        <link rel="canonical" href="/browse" />
      </Helmet>
      <Navbar />
      <div className="flex flex-col max-w-7xl mx-auto my-10 px-4 md:px-0">
        <h1 className="font-bold text-lg md:text-xl my-6 md:my-10">
          Search Results ({filterJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
        <Link to="/jobs" className="mt-6">Click here to view all the available jobs.</Link>
      </div>
    </div>
  );
};

export default Browse;
