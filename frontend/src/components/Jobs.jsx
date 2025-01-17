import React, { useEffect, useState } from 'react'
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6,7,8,9];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [selectedSalary, setSelectedSalary] = useState('');

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

  return (
    <div>
      <Navbar />
      <div className='mx-auto '>
        <div className='flex '>
          <div>
            <FilterCard  setSelectedSalary={setSelectedSalary}/>
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className='flex-1 h-auto mt-24 overflow-y-auto pb-5 ml-6 '>
              <div className='grid grid-cols-3 gap-6 w-[75rem] '>
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
