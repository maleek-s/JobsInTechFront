import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // If 404 error, set applications to an empty array
                    dispatch(setAllAppliedJobs([]));
                } else {
                    console.log(error);
                }
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
