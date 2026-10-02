import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LatestJobs.css";

const LatestJobs = () => {

  const { allJobs } = useSelector((store) => store.job);

  const navigate = useNavigate();

  return (
    <section className="latest-jobs-section">

      <div className="latest-jobs-container">

        {/* Header */}

        <div className="latest-jobs-header">

          <div>

            <div className="latest-label">
              <BriefcaseBusiness size={15} />
              FRESH OPPORTUNITIES
            </div>

            <h2>
              Latest & Top{" "}
              <span>Job Openings</span>
            </h2>

            <p>
              Explore the newest opportunities from companies hiring right now.
            </p>

          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="latest-view-button"
          >
            View all jobs
            <ArrowRight size={17} />
          </button>

        </div>

        {/* Jobs */}

        {allJobs?.length <= 0 ? (

          <div className="no-jobs">
            No jobs available right now.
          </div>

        ) : (

          <div className="latest-jobs-grid">

            {allJobs
              ?.slice(0, 6)
              .map((job) => (
                <LatestJobCards
                  key={job._id}
                  job={job}
                />
              ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default LatestJobs;