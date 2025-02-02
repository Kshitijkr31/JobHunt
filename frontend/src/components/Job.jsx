import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleSaveJob = () => {
    toast.success("Your job is successfully saved!", {
      position: "top-right",
      duration: 3000, 
      style: {
        marginTop:'4rem'
      },
    });
  };
  const handleBookMarkJob = () => {
    toast.success("Your job is BookMarked", {
      position: "top-right",
      duration: 3000, 
      style: {
        marginTop:'4rem'
      },
    });
  };

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 h-[27rem]'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant='outline'
          className='rounded-full transition-transform transform hover:scale-110 active:scale-125'
          size='icon' onClick={handleBookMarkJob}
        >
          <Bookmark />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6 w-[5.2rem]' variant='outline' size='icon'>
          <Avatar className=' w-[5rem]'>
            <AvatarImage
              src=  {job?.company?.logo}
            />
          </Avatar>
        </Button>
        <div  className="ml-[3rem]">
          <h1 className=' text-2xl font-bold'>{job?.company?.name}</h1>
          <p className='text-center text-sm text-gray-500'>{job?.company?.location}</p>
        </div>
      </div>

      <div  className="mt-[1.5rem]">
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant='ghost'>
          {job?.position}
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant='ghost'>
          {job?.salary}
        </Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant='outline'
          className='bg-[#f5f8f7] hover:bg-[#c2dfde] text-black border-black transition-transform transform hover:scale-110 active:scale-125'
        >
          Details
        </Button>
        <Button className='bg-[#7209b7] transition-transform transform hover:scale-110 active:scale-125' onClick={handleSaveJob} >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
