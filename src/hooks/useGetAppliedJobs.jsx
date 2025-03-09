import { setAllAppliedJobs } from "@/redux/jobSlice";
import { setLoading } from "@/redux/loadingSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const cachedJobs = useSelector((state) => state.job.appliedJobs); // Get cached jobs

    useEffect(() => {
        // Show cached data immediately
        if (cachedJobs.length > 0) {
            dispatch(setAllAppliedJobs(cachedJobs));
        }

        const fetchAppliedJobs = async () => {
            dispatch(setLoading(true)); // Show Loader
        
            try {
                const token = localStorage.getItem("token"); 
        
                const headers = {
                    withCredentials: true,
                };
        
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
        
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { headers });
        
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
        
        fetchAppliedJobs(); // Fetch new data in the background
    }, [dispatch, cachedJobs]);
};

export default useGetAppliedJobs;
