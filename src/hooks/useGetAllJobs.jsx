import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axiosInstance.get(`${JOB_API_END_POINT}/get`);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      }
    };

    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
