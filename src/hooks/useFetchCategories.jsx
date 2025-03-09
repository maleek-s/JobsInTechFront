import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setJobCategory } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useFetchCategories = () => {
  const dispatch = useDispatch();
  const cachedCategories = useSelector((state) => state.job.jobCategory) || []; // Ensure array
  const fetchedOnce = useRef(false); // Prevent unnecessary fetches

  useEffect(() => {
    // If categories exist in Redux, do not fetch again
    if (cachedCategories.length > 0 || fetchedOnce.current) {
      return;
    }

    const fetchCategories = async () => {
      dispatch(setLoading(true)); // Show loader
      fetchedOnce.current = true; // Mark as fetched

      try {
        const res = await axios.get(`${JOB_API_END_POINT}/categories`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setJobCategory(res.data.categories || [])); // Update store
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        dispatch(setLoading(false)); // Hide loader
      }
    };

    fetchCategories();
  }, [dispatch, cachedCategories]); // Only re-run if `cachedCategories` is empty initially
};

export default useFetchCategories;
