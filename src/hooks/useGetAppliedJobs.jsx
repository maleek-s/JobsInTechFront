import { setAllAppliedJobs } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      dispatch(setLoading(true));
      try {
        // Prefer the token from cookies
        const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        const token = tokenFromCookie ? tokenFromCookie.split('=')[1] : localStorage.getItem("token");

        if (!token) {
          console.warn("No authentication token found.");
          return; // You can handle this case, for example, by redirecting to login
        }

        const res = await axiosInstance.get(`${APPLICATION_API_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          dispatch(setAllAppliedJobs([]));
        } else {
          console.error("Error fetching applied jobs:", error);
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
