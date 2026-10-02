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
import { ArrowLeft, Loader2, BriefcaseBusiness } from "lucide-react";
import "./PostJob.css";

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
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferredQualificationsChange = (
    category,
    value,
    index
  ) => {
    setInput((prevState) => {
      const updatedQualifications = [
        ...prevState.preferredQualifications,
      ];

      updatedQualifications[index] = {
        ...updatedQualifications[index],
        details: value.split(","),
      };

      return {
        ...prevState,
        preferredQualifications: updatedQualifications,
      };
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-page">
      <Navbar />

      {/* Back Button */}
      <Button
        onClick={() => navigate("/admin/jobs")}
        variant="outline"
        className="post-back-button"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </Button>

      <main className="post-container">
        {/* Page Header */}
        <div className="post-page-header">
          <div className="post-title-icon">
            <BriefcaseBusiness size={28} />
          </div>

          <div>
            <h1>Post New Job</h1>
            <p>
              Create and publish a new job opportunity for your company
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="post-form-card">
          <div className="post-form-heading">
            <div>
              <h2>Job Details</h2>
              <p>
                Enter the information below to create your job posting
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler}>
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-grid">
                <div className="form-field">
                  <Label>Job Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="Software Engineer, Manager etc."
                  />
                </div>

                <div className="form-field">
                  <Label>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="City, Country"
                  />
                </div>

                <div className="form-field">
                  <Label>Salary</Label>
                  <Input
                    type="text"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    placeholder="e.g. ₹6,00,000 per annum"
                  />
                </div>

                <div className="form-field">
                  <Label>Job Type</Label>
                  <Input
                    type="text"
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    placeholder="Full-time, Permanent"
                  />
                </div>

                <div className="form-field">
                  <Label>Experience Level</Label>
                  <Input
                    type="text"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    placeholder="e.g. 2-4 years"
                  />
                </div>

                <div className="form-field">
                  <Label>Number of Positions</Label>
                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    placeholder="Number of vacancies"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-section">
              <h3>Job Description</h3>

              <div className="form-field">
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Describe the role and responsibilities"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="form-section">
              <h3>Requirements</h3>

              <div className="form-field">
                <Label>Required Skills & Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="React, JavaScript, Node.js, MongoDB..."
                />
              </div>
            </div>

            {/* Qualifications */}
            <div className="form-section">
              <h3>Preferred Qualifications</h3>

              <div className="form-grid">
                {input.preferredQualifications.map(
                  (qualification, index) => (
                    <div
                      key={qualification.category + index}
                      className="form-field"
                    >
                      <Label>{qualification.category}</Label>

                      <Input
                        type="text"
                        value={qualification.details.join(", ")}
                        onChange={(e) =>
                          handlePreferredQualificationsChange(
                            qualification.category,
                            e.target.value,
                            index
                          )
                        }
                        placeholder={`Preferred ${qualification.category}`}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Company */}
            <div className="form-section">
              <h3>Company</h3>

              {companies.length > 0 ? (
                <div className="form-field company-field">
                  <Label>Select Company</Label>

                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="company-select">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="no-company-message">
                  <span>
                    * Please register a company first before posting a job.
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="post-submit-area">
              {loading ? (
                <Button
                  disabled
                  className="post-submit-button"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="post-submit-button"
                  disabled={companies.length === 0}
                >
                  Post New Job
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostJob;