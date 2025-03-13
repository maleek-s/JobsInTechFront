import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setJobCategory } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice"; // Import setLoading
import { JOB_API_END_POINT } from "@/utils/constant";

const useFetchCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading(true));
  
      // Check localStorage for cached categories
      const cachedCategories = localStorage.getItem("jobCategories");
      if (cachedCategories) {
        dispatch(setJobCategory(JSON.parse(cachedCategories)));
      }
  
      try {
        const endpoint = `${JOB_API_END_POINT}/categories`;
        setTimeout(async () => { // Delay request slightly
          const res = await axios.get(endpoint, { withCredentials: true });
          if (res.data.success) {
            dispatch(setJobCategory(res.data.categories));
            localStorage.setItem("jobCategories", JSON.stringify(res.data.categories)); // Cache the categories
          }
        }, 5000); // 5s delay to allow server to warm up
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    fetchCategories();
  }, [dispatch]);
}  

export default useFetchCategories;
