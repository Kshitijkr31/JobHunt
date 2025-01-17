import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById";

const JobSetup = () => {
  const params = useParams();
  useGetJobById(params.id);
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: "",
    requirements: [],
    preferredQualifications: {
      Education: "",
      Skills: "",
      Experience: "",
      OtherSkills: "",
    },
  });
  const { singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    const updatedDescription = e.target.value.split("\n");
    setInput({ ...input, description: updatedDescription });
  };

  const handleRequirementsChange = (e, index) => {
    const updatedRequirements = [...input.requirements];
    updatedRequirements[index] = e.target.value;
    setInput({ ...input, requirements: updatedRequirements });
  };

  const handleQualificationChange = (category, e) => {
    setInput({
      ...input,
      preferredQualifications: {
        ...input.preferredQualifications,
        [category]: e.target.value,
      },
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description.join(", "));
    formData.append("location", input.location);
    formData.append("salary", input.salary);
    formData.append("jobType", input.jobType);
    formData.append("experience", input.experience);
    formData.append("position", input.position);
    formData.append("requirements", input.requirements.join(", "));

    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description.join("\n") || "",
        location: singleJob.location || "",
        salary: singleJob.salary || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experience || "",
        position: singleJob.position || "",
        requirements: singleJob.requirements || [],
        preferredQualifications: {
          Education: singleJob.preferredQualifications?.Education || "",
          Skills: singleJob.preferredQualifications?.Skills || "",
          Experience: singleJob.preferredQualifications?.Experience || "",
          OtherSkills: singleJob.preferredQualifications?.OtherSkills || "",
        },
      });
    }
  }, [singleJob]);

  return (
    <div>
      <Navbar />
      <div className='w-[45rem] mx-auto mt-[3rem]  ml-[23rem] '>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant='outline'
              className='bg-[#000000] ml-[-142px] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125'
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Update Job</h1>
          </div>

          {/* General Fields */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='font-bold'>Job Title</Label>
              <Input
                type='text'
                name='title'
                value={input.title}
                placeholder='Software Engineer, Manager etc.'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                placeholder='City, Country'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Salary</Label>
              <Input
                type='text'
                name='salary'
                value={input.salary}
                placeholder='e.g., 50000 per annum'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Job Type</Label>
              <Input
                type='text'
                name='jobType'
                value={input.jobType}
                placeholder='Full-time, Permanent'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Experience</Label>
              <Input
                type='text'
                name='experience'
                value={input.experience}
                placeholder='e.g., 5-7 years'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Position</Label>
              <Input
                type='number'
                name='position'
                value={input.position}
                placeholder='Position count'
                onChange={changeEventHandler}
              />
            </div>
          </div>

          {/* Description */}
          <div className='flex items-center mt-[1rem]'>
            <Label className='font-bold'>Description</Label>
            <Input
              type='text'
              name='description'
              value={input.description}
              placeholder='Job description'
              onChange={handleDescriptionChange}
              className='ml-[5rem]'
            />
          </div>

          {/* Requirements */}
          <div className='flex mt-4'>
            <Label className='font-bold'>Requirements</Label>
            {input.requirements.map((requirement, index) => (
              <Input
                key={index}
                type='text'
                value={requirement}
                placeholder={`Requirement ${index + 1}`}
                onChange={(e) => handleRequirementsChange(e, index)}
                className='ml-[1rem]'
              />
            ))}
          </div>

          <div className='flex mt-4'>
            {/* Column 1 */}
            <div className='grid gap-2'>
              {["Education", "Skills"].map((category) => (
                <div key={category} className='mt-2'>
                  <Label className='font-bold'>{category}</Label>
                  <Input
                    type='text'
                    value={input.preferredQualifications[category]}
                    onChange={(e) => handleQualificationChange(category, e)}
                    placeholder={`Preferred ${category}`}
                    className='w-[20rem]'
                  />
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className='grid gap-2 ml-4'>
              {["Experience", "Other Skills"].map((category) => (
                <div key={category} className='mt-2'>
                  <Label className='font-bold'>{category}</Label>
                  <Input
                    type='text'
                    value={input.preferredQualifications[category]}
                    onChange={(e) => handleQualificationChange(category, e)}
                    placeholder={`Preferred ${category}`}
                    className='w-[20rem]'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className='w-full my-4'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125' />
              Please wait
            </Button>
          ) : (
            <Button
              type='submit'
              className='w-full my-4 bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125'
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSetup;
