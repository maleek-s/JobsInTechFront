import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJobCategory } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";

const useFetchCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading(true));

      const cachedCategories = localStorage.getItem("jobCategories");
      if (cachedCategories) {
        dispatch(setJobCategory(JSON.parse(cachedCategories)));
      }

      try {
        const endpoint = `${JOB_API_END_POINT}/categories`;
        setTimeout(async () => {
          const res = await axiosInstance.get(endpoint);
          if (res.data.success) {
            dispatch(setJobCategory(res.data.categories));
            localStorage.setItem("jobCategories", JSON.stringify(res.data.categories));
          }
        }, 5000);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCategories();
  }, [dispatch]);
};

export default useFetchCategories;
