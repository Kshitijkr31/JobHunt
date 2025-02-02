import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import './LatestJobs.css';
// const randomJobs = [1, 2, 3, 4, 5, 6];

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className='latest-jobs-container max-w-7xl mx-auto my-8 mt-48px ml-[55px]'>
      <h1 className='latest-jobs-title text-4xl font-bold'>
        <span className='text-[#1b02f8] ml-[70px]'>Latest & Top </span> Job Openings
      </h1>
      <div className='latest-jobs-grid  '>
        {
            // randomJobs.map((item,index)=> <LatestJobCards/>)
          allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
          )
        }
      </div>
    </div>
  );
};

export default LatestJobs;
