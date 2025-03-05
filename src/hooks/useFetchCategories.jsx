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
      dispatch(setLoading(true)); // Start loading
      try {
        const endpoint = `${JOB_API_END_POINT}/categories`;
        const res = await axios.get(endpoint, { withCredentials: true });

        if (res.data.success) {
          dispatch(setJobCategory(res.data.categories));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        dispatch(setLoading(false)); // Stop loading
      }
    };

    fetchCategories();
  }, [dispatch]);
};

export default useFetchCategories;
