import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const cachedJobs = useSelector((state) => state.job.allJobs); // Get cached jobs

  useEffect(() => {
    if (cachedJobs.length > 0) {
      dispatch(setAllJobs(cachedJobs)); // Show cached data instantly
    }

    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs)); // Update store with fresh data
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchAllJobs(); // Fetch fresh data in the background
  }, [dispatch, cachedJobs]);
};

export default useGetAllJobs;
