import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setJobCategory } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useFetchCategories = () => {
  const dispatch = useDispatch();
  const cachedCategories = useSelector((state) => state.job.categories); // Fetch from cache

  useEffect(() => {
    if (cachedCategories.length > 0) {
      dispatch(setJobCategory(cachedCategories)); // Show cached data instantly
    }

    const fetchCategories = async () => {
      dispatch(setLoading(true)); // Show loader

      try {
        const res = await axios.get(`${JOB_API_END_POINT}/categories`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setJobCategory(res.data.categories)); // Update store with fresh data
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        dispatch(setLoading(false)); // Hide loader
      }
    };

    fetchCategories(); // Fetch fresh data in background
  }, [dispatch, cachedCategories]);
};

export default useFetchCategories;
