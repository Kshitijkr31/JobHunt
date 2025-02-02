import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import './JobDescription.css';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  // const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  // const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const payload = { applicant: user._id };
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        payload,
        { withCredentials: true }
      );
      console.log(jobId);

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Button
        onClick={() => navigate("/jobs")}
        variant='outline'
        className='btn bg-[#000000] ml-[1rem] mt-[4px] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125'>
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className='desc-main w-[78rem] mx-auto my-10 ml-[9rem] mt-[16px] flex items-center justify-between'>
        <div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`btn-app ml-[60rem] rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#32ad9a]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
          {/* Apply now */}
        </Button>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-[#1b02f8] font-bold' variant='ghost'>
              {singleJob?.position}
            </Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>
              {singleJob?.jobType}
            </Badge>
            <Badge className='text-[#6b2599] font-bold' variant='ghost'>
              {singleJob?.salary}
            </Badge>
          </div>
        </div>
      </div>
      <h1 className='jdh1 border-b-2 border-b-gray-300 font-bold text-[20px] mt-[-3rem] ml-[9rem] py-4'>
        Job Description
      </h1>
      <div className='descrip my-3 font-light w-[78rem] text-[5px] gap-2 ml-[9rem]'>
        <h1 className=' font-bold my-1'>
          Role:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.title}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Location:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.location}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Description:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.description
              ? singleJob.description
              : "No description available."}
          </span>
        </h1>

        <h1 className='font-bold my-1'>
          Requirements:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.requirements?.map((req, idx) => (
              <li key={idx} className='mb-1'>
                {req}
              </li>
            ))}
          </span>
        </h1>
        <h1 className='edu-qual font-bold my-1'>
          Preferred Qualifications:{" "}
          <span className='  pl-4 font-normal text-gray-800'>
            {singleJob?.preferredQualifications?.map((qual, idx) => (
              <div key={idx}>
                <h2 className='font-semibold'>{qual.category}</h2>
                <ul className='list-disc ml-4'>
                  {qual.details?.map((detail, idxDetail) => (
                    <li key={idxDetail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </span>
        </h1>

        <h1 className='font-bold my-1'>
          Salary:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.salary}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Total Applicants:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Posted Date:{" "}
          <span className='pl-4 font-normal text-gray-800'>
            {new Date(singleJob?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
