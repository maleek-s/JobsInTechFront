import { setAllAppliedJobs } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice"; // Import setLoading action
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      dispatch(setLoading(true)); // Show Loader

      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
          withCredentials: true, // Keep this for cookies
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          headers,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          dispatch(setAllAppliedJobs([]));
        } else {
          console.log(error);
        }
      } finally {
        dispatch(setLoading(false)); // Hide Loader
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
