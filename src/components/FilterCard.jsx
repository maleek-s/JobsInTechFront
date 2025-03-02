import React, { useEffect, useState, useMemo } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

// Helper function to get unique items
const getUniqueItems = (items, key) => {
    return [...new Set(items.map(item => item[key]))];
};

const FilterCard = ({ onClose }) => {
    const { allJobs } = useSelector((store) => store.job);
    const uniqueJobTitles = useMemo(() => getUniqueItems(allJobs, 'title'), [allJobs]);
    const uniqueCompanyNames = useMemo(() => getUniqueItems(allJobs, 'company'), [allJobs]);

    const filterData = [
        { filterType: "Job Titles", array: uniqueJobTitles },
        { filterType: "Company Name", array: uniqueCompanyNames }
    ];

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = async (value) => {
        setSelectedValue(value);
        // Dispatch the setSearchedQuery action with a short delay to ensure it's fully updated
        await new Promise((resolve) => {
            dispatch(setSearchedQuery(value));
            setTimeout(resolve, 0);
        });
        // Close the modal after selection
        if (onClose) {
            onClose();
        }
    };

    const resetHandler = async() => {
        setSelectedValue("");
        await new Promise((resolve) => {
            dispatch(setSearchedQuery(""));
            setTimeout(resolve, 0);
        });
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className='w-full h-screen overflow-scroll p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <button onClick={resetHandler}>Reset filters</button>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h2 className='font-bold text-lg'>{data.filterType}</h2>
                        {data.array.map((item, idx) => (
                            <div key={idx} className='flex items-center space-x-2 my-2'>
                                <RadioGroupItem value={item} id={`id${index}-${idx}`} />
                                <Label htmlFor={`id${index}-${idx}`}>{item}</Label>
                            </div>
                        ))}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
