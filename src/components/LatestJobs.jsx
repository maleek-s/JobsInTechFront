import React, { useState, useEffect, useRef } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

// Helper function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [randomJobs, setRandomJobs] = useState([]);
    const hasShuffled = useRef(false);

    useEffect(() => {
        if (allJobs.length > 0 && !hasShuffled.current) {
            // Shuffle jobs initially
            const shuffled = shuffleArray([...allJobs]).slice(0, 12);
            setRandomJobs(shuffled);
            hasShuffled.current = true; // Mark that shuffling has occurred

            // Set interval to reshuffle jobs every 8 seconds
            const interval = setInterval(() => {
                const shuffledJobs = shuffleArray([...allJobs]).slice(0, 12);
                setRandomJobs(shuffledJobs);
            }, 8000);

            // Clear the interval when the component unmounts
            return () => clearInterval(interval);
        }
    }, [allJobs]);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                {
                    randomJobs.length <= 0 ? <span>No Job Available</span> : randomJobs.map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                }
            </div>
        </div>
    );
};

export default LatestJobs;
