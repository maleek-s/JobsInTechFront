import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setJobCategory } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useFetchCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const endpoint = `${JOB_API_END_POINT}/categories`;
        const res = await axios.get(endpoint, { withCredentials: true });

        if (res.data.success) {
          console.log("Fetched Categories:", res.data.categories);
          dispatch(setJobCategory(res.data.categories));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [dispatch]); // Only runs once on component mount
};

export default useFetchCategories;
