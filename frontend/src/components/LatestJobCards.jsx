import React from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={()=> navigate(`/description/${job._id}`)}
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer ml-24 w-96 relative'
    >
                <div className='p-6' variant='outline' size='icon'>
                <Avatar className='ml-[14.25rem]  w-[5rem]'>
                  <AvatarImage
                    src=  {job?.company?.logo}
                  />
                </Avatar>
                </div> 
      <div className="mt-[-3.5rem]">
        <h1 className='text-xl font-bold'>{job?.company?.name}</h1>
        <p className='text-sm  text-gray-500'>{job?.company?.location}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-3'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4 absolute bottom-0 left-0  bg-white p-2'>
        <Badge className='text-[#1b02f8] font-bold' variant='ghost'>
          <Label className='text-xs font-bold '>Vacancy- </Label>{job?.position}
        </Badge>
        <Badge className='text-[#F83002] font-bold' variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge className='text-[#6b2599] font-bold' variant='ghost'>
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
