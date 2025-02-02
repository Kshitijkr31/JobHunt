import React, { useEffect, useState } from 'react';
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import './Jobs.css';


// const jobsArray = [1, 2, 3, 4, 5, 6,7,8,9];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [selectedSalary, setSelectedSalary] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filteredJobs = allJobs;
    if (searchedQuery) {
        filteredJobs = filteredJobs.filter((job) => {
          return (
            job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            (typeof job.description === 'string' && job.description.toLowerCase().includes(searchedQuery.toLowerCase())) || 
             job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
    });
}

if (selectedSalary) {
  filteredJobs = filteredJobs.filter((job) => {
      if (selectedSalary === '0 LPA-2 LPA') {
          return job.salaryMin >= 0 && job.salaryMax <= 2;
      } else if (selectedSalary === '2 LPA-5 LPA') {
          return job.salaryMin > 2 && job.salaryMax <= 5;
      } else if (selectedSalary === '5 LPA or Above') {
          return job.salaryMin > 5;
      }
      return true;
  });
}


setFilterJobs(filteredJobs);

}, [allJobs, searchedQuery, selectedSalary]);

const handleFilterSelect = () => {
  setShowFilters(false); // Hide filter card when an option is selected
};

  return (
    <div className={`relative ${showFilters ? 'overflow-hidden' : ''}`}>
      <Navbar />
      <div className='mx-auto '>
        <div className='flex job-fl '>
        <button 
          className="lg:hidden h-[3rem] p-2 m-4 bg-gray-200 rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Menu size={24} />
        </button>

        {showFilters && (
            <div 
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setShowFilters(false)} // Close when clicking outside
            />
          )}
        <div className={`filter-container ${showFilters ? 'fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 translate-x-0' : 'hidden'} lg:block lg:relative lg:w-auto lg:h-auto lg:bg-transparent lg:z-auto lg:translate-x-0`}>
  <FilterCard setSelectedSalary={setSelectedSalary} onFilterSelect={handleFilterSelect} />
</div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className='flexbox-main flex-1 h-auto mt-24 overflow-y-auto pb-5 ml-6 '>
              <div className='flex-main2 grid grid-cols-3 gap-6 w-[75rem] '>
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
