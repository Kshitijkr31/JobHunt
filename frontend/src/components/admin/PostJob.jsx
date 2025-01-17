import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: [],
    preferredQualifications: [
      { category: "Education", details: [] },
      { category: "Skills", details: [] },
      { category: "Experience", details: [] },
      { category: "Other Skills", details: [] },
    ],
    requirements: [],
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePreferredQualificationsChange = (category, value, index) => {
    setInput((prevState) => {
      const updatedQualifications = [...prevState.preferredQualifications];
      updatedQualifications[index] = {
        ...updatedQualifications[index],
        details: value.split(","), // Split by comma or any separator
      };
      return { ...prevState, preferredQualifications: updatedQualifications };
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Button
        onClick={() => navigate("/admin/jobs")}
        variant='outline'
        className='bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125 ml-[9rem] mt-[5rem]'
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className='flex items-center justify-center w-screen my-5'>
        <form
          onSubmit={submitHandler}
          className='p-8 max-w-4xl border mt-[-4.6rem] border-gray-200 shadow-lg rounded-md'
        >
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Title</Label>
              <Input
                type='text'
                name='title'
                value={input.title}
                onChange={changeEventHandler}
                placeholder='Title of Job'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
                placeholder='Job Details'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            {input.preferredQualifications.map((qualification, index) => (
              <div key={qualification.category + index}>
                <Label>{qualification.category}</Label>
                <Input
                  type='text'
                  name={`${qualification.category}-${index}`}
                  value={qualification.details.join(", ")}
                  onChange={(e) =>
                    handlePreferredQualificationsChange(
                      qualification.category,
                      e.target.value,
                      index
                    )
                  }
                  className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                  placeholder={`Enter ${qualification.category} details`}
                />
              </div>
            ))}

            <div>
              <Label>Requirements</Label>
              <Input
                type='text'
                name='requirements'
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder='Requirements needed'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type='text'
                name='salary'
                value={input.salary}
                onChange={changeEventHandler}
                placeholder='Pay-Scale'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Job's Company Name"
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type='text'
                name='jobType'
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder='Type of Job'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type='text'
                name='experience'
                value={input.experience}
                onChange={changeEventHandler}
                placeholder='Experience Details'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            <div>
              <Label>No of Postion</Label>
              <Input
                type='number'
                name='position'
                value={input.position}
                onChange={changeEventHandler}
                placeholder='Vacancies'
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a Company' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className='w-full my-4'>
              {" "}
              <Loader2 className='mr-2 h-4 w-4 animate-spin bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125' />{" "}
              Please wait{" "}
            </Button>
          ) : (
            <Button
              type='submit'
              className='w-full my-4 bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125'
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className='text-xs text-red-600 font-bold text-center my-3'>
              *Please register a company first, before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
