import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { Bookmark } from "lucide-react";
import { getBookmarkedJobs } from "../utils/jobStorage";
import "./SavedJobs.css";

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState(
    getBookmarkedJobs()
  );

  useEffect(() => {
    const updateBookmarks = () => {
      setBookmarkedJobs(getBookmarkedJobs());
    };

    window.addEventListener(
      "jobhunt-storage-change",
      updateBookmarks
    );

    return () => {
      window.removeEventListener(
        "jobhunt-storage-change",
        updateBookmarks
      );
    };
  }, []);

  return (
    <div className="saved-page">

      <Navbar />

      <main className="saved-container">

        <div className="saved-header">

          <div className="saved-icon">
            <Bookmark size={25} />
          </div>

          <div>
            <p className="saved-small-title">
              YOUR JOBS
            </p>

            <h1>
              Bookmarked Jobs
            </h1>

            <p>
              Jobs you have bookmarked for quick access.
            </p>
          </div>

        </div>

        {bookmarkedJobs.length === 0 ? (

          <div className="empty-saved">

            <div className="empty-icon">
              <Bookmark size={32} />
            </div>

            <h2>
              No bookmarked jobs
            </h2>

            <p>
              Click the bookmark icon on any job
              to save it here.
            </p>

          </div>

        ) : (

          <div className="saved-job-grid">

            {bookmarkedJobs.map((job) => (
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

export default Bookmarks;