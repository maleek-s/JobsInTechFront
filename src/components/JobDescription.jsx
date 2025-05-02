import React, { useEffect, useState, useRef } from "react";
import "./styles/job-description.css";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { fetchSingleJob } from "@/redux/thunks/fetchSingleJob";
import { fetchSimilarJobs } from "@/redux/thunks/fetchSimilarJobs";
import { clearJobs } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { Helmet } from "react-helmet-async";
import Bitmap from "../assets/Bitmap.svg";
import axiosInstance from "@/utils/axiosInstance";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Bookmark,
  Share,
} from "lucide-react";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob, similarJobs, singleJobLoading, similarJobsLoading } =
    useSelector((state) => state.job);

  const isInitiallyApplied =
    singleJob?.appliedUsers?.some((application) => application === user?._id) ||
    false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const scrollContainerRef = useRef(null);

  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const previousCategoryRef = useRef();

  useEffect(() => {
    if (jobId) {
      dispatch(fetchSingleJob(jobId))
        .unwrap()
        .catch((error) => {
          toast.error(
            error || "An unexpected error occurred. Please try again."
          );
        });
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (
      singleJob?.jobCategory &&
      singleJob.jobCategory !== previousCategoryRef.current
    ) {
      previousCategoryRef.current = singleJob.jobCategory; // Update the ref with the current category
      dispatch(fetchSimilarJobs(singleJob.jobCategory))
        .unwrap()
        .catch((error) => {
          toast.error(
            error || "An unexpected error occurred. Please try again."
          );
        });
    }
  }, [singleJob.jobCategory, dispatch]);

  useEffect(() => {
    dispatch(clearJobs()); // Reset state before fetching new job data
    dispatch(fetchSingleJob(jobId)).unwrap().catch(/* error handling */);
  }, [jobId, dispatch]);

  const applyJobHandler = async () => {
    if (!user?._id) {
      navigate(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    setIsApplying(true);
    try {
      const res = await axiosInstance.post(
        `${APPLICATION_API_END_POINT}/post/${jobId}`,
        { applicant: user._id }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Job saved successfully!");

        dispatch(
          setSingleJob({
            ...singleJob,
            appliedUsers: [...(singleJob?.appliedUsers || []), user._id],
          })
        );

        setIsApplied(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleButtonClick = (url, openInNewTab = false) => {
    if (openInNewTab) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  useEffect(() => {
    setIsApplied(
      singleJob?.appliedUsers?.some(
        (application) => application === user?._id
      ) || false
    );
  }, [singleJob, user]);

  const handleNavigation = (index) => {
    if (similarJobs.length === 0) return; // Early exit if no similar jobs
    const clampedIndex = Math.max(0, Math.min(index, similarJobs.length - 1));
    setCurrentIndex(clampedIndex);
    navigate(`/description/${similarJobs[clampedIndex]._id}`);
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsModalVisible(true);
        setTimeout(() => setIsModalVisible(false), 3000);
      })
      .catch((err) => console.error("Failed to copy URL:", err));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [jobId]);

  return (
    <div
      className="dark:bg-[#141718] h-screen overflow-scroll flex flex-col"
      ref={scrollContainerRef}
    >
      <Helmet>
        <title>{singleJob?.title || "Job Details"}</title>
        <meta
          name="description"
          content={singleJob?.description || "Job description page."}
        />
        <link
          rel="canonical"
          href={`https://jobsintech.live/description/${jobId}`}
        />
      </Helmet>
      <Navbar />
      <div>
        {/* Job Header */}
        <div
          className="relative bg-center mt-20 px-4 md:px-0 h-28 md:h-20"
          style={{
            backgroundImage: `url(${Bitmap})`,
            backgroundColor: "#233876",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-white">
            <div className="flex flex-col md:flex-row md:justify-between items-center h-20 w-11/12 max-w-6xl mx-auto pt-[1em] md:pt-0">
              <h1 className="text-xl md:text-3xl font-bold">
                {singleJob?.title}
              </h1>
              <div className="flex space-x-4 mt-1 md:mt-0">
                <Button
                  onClick={() => handleButtonClick(singleJob?.jobLink, true)}
                >
                  <ExternalLink className="inline-block mr-2" />
                  Open Job Post
                </Button>
                <Button
                  onClick={isApplied ? null : applyJobHandler}
                  disabled={isApplied}
                  className={`rounded-lg transition-all shadow-lg ${
                    isApplied
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-500"
                  }`}
                >
                  <Bookmark className="inline-block mr-2" />
                  {isApplied ? "Already Saved" : "Save To Apply Later"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Share and Navigation */}
        <div className="flex justify-between items-center h-fit lg:h-10 w-11/12 max-w-6xl mx-auto mt-5">
          <div className="flex">
            <button
              onClick={handleCopyUrl}
              className="flex bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg transition shadow-md"
            >
              <Share className="mr-2" />
              Share
            </button>
            {isModalVisible && (
              <div className="ml-4 text-green-500">Copied page URL!</div>
            )}
          </div>
          <div>
            <button
              onClick={() => handleNavigation(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="bg-gray-600 hover:bg-gray-500 px-2 py-2 rounded text-white disabled:opacity-50 shadow-md ml-1"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => handleNavigation(currentIndex + 1)}
              disabled={currentIndex === similarJobs.length - 1}
              className="bg-gray-600 hover:bg-gray-500 px-2 py-2 rounded text-white disabled:opacity-50 shadow-md ml-1"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 justify-items-center lg:grid-cols-3 gap-6 my-6">
          {/* Job Details */}
          <div className="w-[90%] md:w-[99%] col-span-2 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-md p-6">
            {singleJobLoading ? (
              <p>Loading job details...</p>
            ) : singleJob?.jobContent?.length > 0 ? (
              singleJob.jobContent.map((item, index) => (
                <div key={index} className="mb-6 p-2 rounded-lg">
                  <h2 className="font-bold text-lg text-black dark:text-white">
                    {item.heading}
                  </h2>
                  <ol className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {item.content.map((text, idx) => (
                      <li key={idx} className="my-1">
                        {text}
                      </li>
                    ))}
                  </ol>
                </div>
              ))
            ) : (
              <h3 className="text-lg mt-4 text-gray-600 dark:text-gray-400">
                For more information, visit the job link.
              </h3>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-[90%] md:w-[99%] h-fit bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
            {/* Company Details */}
            <div className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4 dark:text-white">
                Company Details
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Company:</strong> {singleJob?.company}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Website:</strong>{" "}
                <a
                  href={
                    singleJob?.jobLink
                      ? singleJob.jobLink.startsWith("http")
                        ? singleJob.jobLink
                        : `https://${singleJob.jobLink}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {singleJob?.jobLink
                    ? new URL(singleJob.jobLink).hostname.replace(/^www\./, "")
                    : ""}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Posted:</strong>{" "}
                {new Date(singleJob?.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Related Jobs */}
            <div>
              {/* Display Loading States */}
              {similarJobsLoading && <p>Loading similar jobs...</p>}

              {/* Similar Jobs */}
              {similarJobs && similarJobs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold border-b pb-2 mb-4 dark:text-white">
                    Related Jobs
                  </h2>
                  {similarJobs.map((job) => (
                    <div
                      key={job._id}
                      className={`flex flex-col justify-between items-center mb-4 p-3 rounded-lg shadow-md ${
                        job._id === jobId
                          ? "bg-blue-100 dark:bg-blue-800"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {job.title}
                      </span>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {job.company}
                      </h4>
                      <button
                        onClick={() => navigate(`/description/${job._id}`)}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
