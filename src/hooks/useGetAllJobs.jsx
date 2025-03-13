import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            const startTime = Date.now();
            console.log('Request sent at:', new Date(startTime).toISOString());

            const config = {
                url: `${JOB_API_END_POINT}/get`,
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://jobsintech.live/',
                },
            };

            console.log('Request Config:', config);

            try {
                const res = await axios.get(config.url, {
                    withCredentials: config.withCredentials,
                    headers: config.headers,
                    timeout: config.timeout
                });

                console.log(res);

                const endTime = Date.now();
                console.log('Response received at:', new Date(endTime).toISOString());
                console.log('Time taken (ms):', endTime - startTime);
                console.log('Response status:', res.status);
                console.log('Response data:', res.data);

                if (res.data.success) {
                    console.log('Dispatching setAllJobs with:', res.data.jobs);
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                const endTime = Date.now();
                console.log('Request error at:', new Date(endTime).toISOString());
                console.log('Time taken (ms):', endTime - startTime);

                if (error.code === 'ECONNABORTED') {
                    console.log('Request timed out');
                } else {
                    console.log('Error:', error);
                }
            }
        };
        fetchAllJobs();
    }, []); 
}

export default useGetAllJobs;
