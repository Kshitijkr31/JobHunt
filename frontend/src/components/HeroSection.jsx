import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="mx-auto mt-[115px] text-center px-4">
            <div className="flex flex-col gap-5 my-10">
                <span className="px-4 py-2 rounded-full w-fit font-bold bg-gray-100 text-[#F83002] text-lg mx-auto sm:text-xl md:text-2xl">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl leading-tight">
                    Search, Apply & <br />
                    Get Your <span className="text-[#1b02f8]">Dream Jobs</span>
                </h1>
                <p className="text-base font-extralight sm:text-lg md:text-xl">
                    Find your dream job — Connect with top employers and start your journey today!
                </p>
                <div className="flex items-center w-full sm:w-[80%] md:w-[60%] shadow-lg border border-gray-400 pl-3 rounded-full gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full bg-transparent text-sm sm:text-base"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#1b02f8] px-4 py-2"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
