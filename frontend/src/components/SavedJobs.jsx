import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { BookmarkCheck } from "lucide-react";
import { getSavedJobs } from "../utils/jobStorage";
import "./SavedJobs.css";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(
    getSavedJobs()
  );

  useEffect(() => {
    const updateSavedJobs = () => {
      setSavedJobs(getSavedJobs());
    };

    window.addEventListener(
      "jobhunt-storage-change",
      updateSavedJobs
    );

    return () => {
      window.removeEventListener(
        "jobhunt-storage-change",
        updateSavedJobs
      );
    };
  }, []);

  return (
    <div className="saved-page">

      <Navbar />

      <main className="saved-container">

        <div className="saved-header">

          <div className="saved-icon">
            <BookmarkCheck size={25} />
          </div>

          <div>

            <p className="saved-small-title">
              YOUR JOBS
            </p>

            <h1>
              Saved Jobs
            </h1>

            <p>
              Jobs you saved to apply for later.
            </p>

          </div>

        </div>

        {savedJobs.length === 0 ? (

          <div className="empty-saved">

            <div className="empty-icon">
              <BookmarkCheck size={32} />
            </div>

            <h2>
              No saved jobs
            </h2>

            <p>
              Click "Save For Later" on any job
              to see it here.
            </p>

          </div>

        ) : (

          <div className="saved-job-grid">

            {savedJobs.map((job) => (
              <Job
                key={job?._id}
                job={job}
              />
            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default SavedJobs;