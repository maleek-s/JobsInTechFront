import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { AvatarComponent } from "avatar-initials";
import { JOB_API_END_POINT } from "@/utils/constant";

import axios from "axios";

const Profile = () => {
  useGetAppliedJobs(); // Fetches applied jobs and updates Redux store
  const [open, setOpen] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.job); // Fetch saved jobs from store
  const navigate = useNavigate();

  // Calculate saved jobs count
  const savedJobsCount = allAppliedJobs?.length || 0;

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      const uniqueCategories = [
        ...new Set(allAppliedJobs.map((job) => job.jobCategory)),
      ];

      const recommendedJobsList = [];
      for (const category of uniqueCategories) {
        try {
          const response = await axios.get(
            `${JOB_API_END_POINT}/categories/${category}`
          );

          if (response.data.jobs && Array.isArray(response.data.jobs)) {
            recommendedJobsList.push(...response.data.jobs.slice(0, 2));
          }
        } catch (error) {}
      }

      setRecommendedJobs(recommendedJobsList);
    };

    if (allAppliedJobs.length > 0) {
      fetchRecommendedJobs();
    }
  }, [allAppliedJobs]);

  return (
    <div className="dark:bg-[#141718] bg-white h-screen overflow-scroll">
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 rounded-2xl mt-20 px-6 py-6">
        {/* Enhanced Profile Header */}
        <div className="flex items-center gap-6">
          <AvatarComponent
            classes="rounded-full"
            useGravatar={false}
            size={64}
            color="#000000"
            background="#f1f1f1"
            fontSize={24}
            fontWeight={600}
            offsetY={35}
            initials={`${user?.fullname.substring(0, 2).toUpperCase()}`}
          />
          <div>
            <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">
              {user?.fullname}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="ml-auto"
            variant="outline"
          >
            <Pen className="mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Horizontal Layout for Metrics and Quote */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Motivational Quote Section */}
        <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md border border-blue-200 dark:border-blue-700">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-100">
            "Success is not final, failure is not fatal: It is the courage to
            continue that counts." – Winston Churchill
          </h2>
        </div>

        {/* User Metrics Section */}
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Stats
          </h2>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {savedJobsCount}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Jobs Saved</p>
          </div>
        </div>
      </div>

      {/* Horizontal Layout for Recommended and Saved Jobs */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-4">
        {/* Personalized Recommendations Section */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="flex justify-center text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recommended Jobs
          </h2>
          <ul className="space-y-4">
            {recommendedJobs.map((job, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100 font-medium">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    At {job.company}
                  </p>
                </div>
                <Button size="sm"  onClick={() => navigate(`/description/${job._id}`)}>
                  View
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl">
          <h1 className="flex justify-center font-bold text-lg my-5">Saved Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
