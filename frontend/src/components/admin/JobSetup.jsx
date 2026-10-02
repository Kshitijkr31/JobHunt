import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, BriefcaseBusiness } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById";
import "./JobSetup.css";

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
    formData.append("description", input.description);
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
        description: Array.isArray(singleJob.description)
          ? singleJob.description.join("\n")
          : singleJob.description || "",
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
//  text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125
  return (
    <div>
      <Navbar />
      
      <div className='job-setup-page'>
        <Button
          onClick={() => navigate("/admin/jobs")}
          variant='outline'
          className='job-back-btn'
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </Button>

        <div className='job-setup-container'>
          <div className='job-setup-card'>
            {/* Header */}
            <div className='job-setup-header'>
              <div className='job-header-content'>
                <div className='job-header-icon'>
                  <BriefcaseBusiness size={22} />
                </div>

                <div>
                  <h1>Update Job</h1>
                  <p>Edit job details, requirements and qualifications</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className='job-setup-form'>
              {/* ================= GENERAL INFORMATION ================= */}

              <div className='form-section'>
                <div className='form-section-title'>Job Information</div>

                <div className='job-form-grid'>
                  <div className='job-form-field'>
                    <Label>Job Title</Label>

                    <Input
                      type='text'
                      name='title'
                      value={input.title}
                      placeholder='Software Engineer, Manager etc.'
                      onChange={changeEventHandler}
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Location</Label>

                    <Input
                      type='text'
                      name='location'
                      value={input.location}
                      placeholder='City, Country'
                      onChange={changeEventHandler}
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Salary</Label>

                    <Input
                      type='text'
                      name='salary'
                      value={input.salary}
                      placeholder='e.g. 50000 per annum'
                      onChange={changeEventHandler}
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Job Type</Label>

                    <Input
                      type='text'
                      name='jobType'
                      value={input.jobType}
                      placeholder='Full-time, Permanent'
                      onChange={changeEventHandler}
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Experience</Label>

                    <Input
                      type='text'
                      name='experience'
                      value={input.experience}
                      placeholder='e.g. 5-7 years'
                      onChange={changeEventHandler}
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Position</Label>

                    <Input
                      type='number'
                      name='position'
                      value={input.position}
                      placeholder='Position count'
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>
              </div>

              {/* ================= DESCRIPTION ================= */}

              <div className='form-section'>
                <div className='form-section-title'>Job Description</div>

                <div className='job-description-field'>
                  <Label>Description</Label>

                  <Input
                    type='text'
                    name='description'
                    value={input.description}
                    placeholder='Describe the role and responsibilities'
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>

              {/* ================= REQUIREMENTS ================= */}

              <div className='form-section'>
                <div className='form-section-title'>Requirements</div>

                <div className='job-requirements'>
                  <Label>Required Skills & Requirements</Label>

                  <div className='requirement-inputs'>
                    {input.requirements.map((requirement, index) => (
                      <Input
                        key={index}
                        type='text'
                        value={requirement}
                        placeholder={`Requirement ${index + 1}`}
                        onChange={(e) => handleRequirementsChange(e, index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= QUALIFICATIONS ================= */}

              <div className='form-section'>
                <div className='form-section-title'>
                  Preferred Qualifications
                </div>

                <div className='qualifications-grid'>
                  <div className='job-form-field'>
                    <Label>Education</Label>

                    <Input
                      type='text'
                      value={input.preferredQualifications.Education}
                      onChange={(e) =>
                        handleQualificationChange("Education", e)
                      }
                      placeholder='Preferred Education'
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Experience</Label>

                    <Input
                      type='text'
                      value={input.preferredQualifications.Experience}
                      onChange={(e) =>
                        handleQualificationChange("Experience", e)
                      }
                      placeholder='Preferred Experience'
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Skills</Label>

                    <Input
                      type='text'
                      value={input.preferredQualifications.Skills}
                      onChange={(e) => handleQualificationChange("Skills", e)}
                      placeholder='Preferred Skills'
                    />
                  </div>

                  <div className='job-form-field'>
                    <Label>Other Skills</Label>

                    <Input
                      type='text'
                      value={input.preferredQualifications.OtherSkills}
                      onChange={(e) =>
                        handleQualificationChange("OtherSkills", e)
                      }
                      placeholder='Preferred Other Skills'
                    />
                  </div>
                </div>
              </div>

              {/* ================= UPDATE ================= */}

              {loading ? (
                <Button className='job-update-btn'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button type='submit' className='job-update-btn'>
                  Update Job
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSetup;
