import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Users,
  CalendarDays,
} from "lucide-react";

import "./JobDescription.css";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) =>
        application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] =
    useState(isIntiallyApplied);

  /*
   * -----------------------------------------
   * APPLY JOB
   * -----------------------------------------
   */

  const applyJobHandler = async () => {
    try {
      if (!user?._id) {
        toast.error("Please login to apply for this job.");
        return;
      }

      const payload = {
        applicant: user._id,
      };

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            {
              applicant: user?._id,
            },
          ],
        };

        dispatch(
          setSingleJob(updatedSingleJob)
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while applying."
      );
    }
  };

  /*
   * -----------------------------------------
   * FETCH SINGLE JOB
   * -----------------------------------------
   */

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(
            setSingleJob(res.data.job)
          );

          setIsApplied(
            res.data.job.applications?.some(
              (application) =>
                application.applicant ===
                user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  /*
   * -----------------------------------------
   * LOADING
   * -----------------------------------------
   */

  if (!singleJob) {
    return (
      <div className="job-description-loading">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  /*
   * -----------------------------------------
   * POSTED DATE
   * -----------------------------------------
   */

  const postedDate = singleJob?.createdAt
    ? new Date(
        singleJob.createdAt
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  /*
   * -----------------------------------------
   * RENDER
   * -----------------------------------------
   */

  return (
    <div className="job-description-page">

      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <div className="job-detail-navbar">

        <Button
          onClick={() => navigate("/jobs")}
          variant="outline"
          className="back-button"
        >
          <ArrowLeft size={18} />
          <span>Back to Jobs</span>
        </Button>

      </div>

      {/* =====================================
          MAIN CONTAINER
      ===================================== */}

      <main className="job-detail-container">

        {/* ===================================
            JOB HEADER
        =================================== */}

        <section className="job-detail-header">

          <div className="job-header-left">

            <p className="job-detail-label">
              JOB OPPORTUNITY
            </p>

            <h1 className="job-detail-title">
              {singleJob?.title ||
                "Job title not available"}
            </h1>

            <div className="job-detail-company">
              <strong>
                {singleJob?.company?.name ||
                  "Company"}
              </strong>

              <span>•</span>

              <span>
                {singleJob?.location ||
                  singleJob?.company?.location ||
                  "Location not specified"}
              </span>
            </div>

            {/* =============================
                JOB META
            ============================= */}

            <div className="job-meta">

              {singleJob?.position && (
                <Badge className="detail-badge position-badge">
                  <BriefcaseBusiness
                    size={15}
                  />
                  {singleJob.position}
                </Badge>
              )}

              {singleJob?.jobType && (
                <Badge className="detail-badge type-badge">
                  {singleJob.jobType}
                </Badge>
              )}

              {singleJob?.salary && (
                <Badge className="detail-badge salary-badge">
                  <IndianRupee size={15} />
                  {singleJob.salary}
                </Badge>
              )}

            </div>

          </div>

          {/* =============================
              APPLY BUTTON
          ============================= */}

          <div className="apply-section">

            <Button
              onClick={
                isApplied
                  ? undefined
                  : applyJobHandler
              }
              disabled={isApplied}
              className={`apply-button ${
                isApplied
                  ? "already-applied"
                  : ""
              }`}
            >
              {isApplied
                ? "Already Applied"
                : "Apply Now"}
            </Button>

          </div>

        </section>

        {/* ===================================
            JOB CONTENT
        =================================== */}

        <div className="job-detail-layout">

          {/* =================================
              LEFT CONTENT
          ================================= */}

          <section className="job-detail-content">

            {/* ===============================
                DESCRIPTION
            =============================== */}

            <div className="detail-card">

              <h2 className="detail-section-title">
                Job Description
              </h2>

              <p className="description-text">
                {singleJob?.description ||
                  "No description available for this position."}
              </p>

            </div>

            {/* ===============================
                REQUIREMENTS
            =============================== */}

            {singleJob?.requirements?.length >
              0 && (
              <div className="detail-card">

                <h2 className="detail-section-title">
                  Requirements
                </h2>

                <ul className="requirements-list">

                  {singleJob.requirements.map(
                    (req, idx) => (
                      <li key={idx}>
                        <span className="bullet">
                          ✓
                        </span>

                        <span>{req}</span>
                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

            {/* ===============================
                PREFERRED QUALIFICATIONS
            =============================== */}

            {singleJob
              ?.preferredQualifications
              ?.length > 0 && (
              <div className="detail-card">

                <h2 className="detail-section-title">
                  Preferred Qualifications
                </h2>

                <div className="qualifications">

                  {singleJob.preferredQualifications.map(
                    (qual, idx) => (
                      <div
                        className="qualification-item"
                        key={idx}
                      >

                        {qual?.category && (
                          <h3>
                            {qual.category}
                          </h3>
                        )}

                        {qual?.details
                          ?.length > 0 && (
                          <ul>

                            {qual.details.map(
                              (
                                detail,
                                detailIndex
                              ) => (
                                <li
                                  key={
                                    detailIndex
                                  }
                                >
                                  {detail}
                                </li>
                              )
                            )}

                          </ul>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </section>

          {/* =================================
              RIGHT SIDEBAR
          ================================= */}

          <aside className="job-detail-sidebar">

            <div className="sidebar-card">

              <h2>
                Job Overview
              </h2>

              <div className="overview-item">

                <div className="overview-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <span>Location</span>

                  <strong>
                    {singleJob?.location ||
                      "Not specified"}
                  </strong>
                </div>

              </div>

              <div className="overview-item">

                <div className="overview-icon">
                  <IndianRupee size={19} />
                </div>

                <div>
                  <span>Salary</span>

                  <strong>
                    {singleJob?.salary ||
                      "Not specified"}
                  </strong>
                </div>

              </div>

              <div className="overview-item">

                <div className="overview-icon">
                  <BriefcaseBusiness
                    size={19}
                  />
                </div>

                <div>
                  <span>Job Type</span>

                  <strong>
                    {singleJob?.jobType ||
                      "Not specified"}
                  </strong>
                </div>

              </div>

              <div className="overview-item">

                <div className="overview-icon">
                  <Users size={19} />
                </div>

                <div>
                  <span>Total Applicants</span>

                  <strong>
                    {singleJob?.applications
                      ?.length || 0}
                  </strong>
                </div>

              </div>

              <div className="overview-item">

                <div className="overview-icon">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <span>Posted Date</span>

                  <strong>
                    {postedDate}
                  </strong>
                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
};

export default JobDescription;