import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  toggleBookmark,
  toggleSavedJob,
  isBookmarked,
  isSavedJob,
} from "../utils/jobStorage";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const [bookmarked, setBookmarked] = useState(false);
  const [saved, setSaved] = useState(false);

  /*
   * -----------------------------------------
   * CHECK SAVED / BOOKMARKED STATE
   * -----------------------------------------
   */

  useEffect(() => {
    if (!job?._id) return;

    setBookmarked(isBookmarked(job));
    setSaved(isSavedJob(job));
  }, [job]);

  /*
   * -----------------------------------------
   * JOB AGE
   * -----------------------------------------
   */

  const getJobAge = (mongodbTime) => {
    if (!mongodbTime) {
      return "";
    }

    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();

    const difference =
      currentTime - createdAt;

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    /*
     * LESS THAN 1 HOUR
     */

    if (minutes < 60) {
      if (minutes <= 1) {
        return "Just now";
      }

      return `${minutes} minutes ago`;
    }

    /*
     * LESS THAN 1 DAY
     */

    if (hours < 24) {
      return hours === 1
        ? "1 hour ago"
        : `${hours} hours ago`;
    }

    /*
     * LESS THAN 1 WEEK
     */

    if (days < 7) {
      return days === 1
        ? "1 day ago"
        : `${days} days ago`;
    }

    /*
     * WEEKS
     */

    const weeks = Math.floor(days / 7);

    if (days < 30) {
      return weeks === 1
        ? "1 week ago"
        : `${weeks} weeks ago`;
    }

    /*
     * MONTHS
     */

    const months = Math.floor(days / 30);

    if (days < 365) {
      return months === 1
        ? "1 month ago"
        : `${months} months ago`;
    }

    /*
     * YEARS
     */

    const years = Math.floor(days / 365);

    return years === 1
      ? "1 year ago"
      : `${years} years ago`;
  };

  /*
   * -----------------------------------------
   * SAVE / UNSAVE JOB
   * -----------------------------------------
   */

  const handleSaveJob = () => {
    if (!job?._id) {
      toast.error("Unable to save this job");
      return;
    }

    const result = toggleSavedJob(job);

    setSaved(result);

    if (result) {
      toast.success(
        "Your job is successfully saved!",
        {
          position: "top-right",
          duration: 3000,
          style: {
            marginTop: "4rem",
          },
        }
      );
    } else {
      toast.success(
        "Job removed from Saved Jobs",
        {
          position: "top-right",
          duration: 3000,
          style: {
            marginTop: "4rem",
          },
        }
      );
    }

    window.dispatchEvent(
      new Event("savedJobsUpdated")
    );
  };

  /*
   * -----------------------------------------
   * BOOKMARK / UNBOOKMARK
   * -----------------------------------------
   */

  const handleBookMarkJob = () => {
    if (!job?._id) {
      toast.error(
        "Unable to bookmark this job"
      );
      return;
    }

    const result = toggleBookmark(job);

    setBookmarked(result);

    if (result) {
      toast.success(
        "Your job is bookmarked",
        {
          position: "top-right",
          duration: 3000,
          style: {
            marginTop: "4rem",
          },
        }
      );
    } else {
      toast.success(
        "Job removed from Bookmarks",
        {
          position: "top-right",
          duration: 3000,
          style: {
            marginTop: "4rem",
          },
        }
      );
    }

    window.dispatchEvent(
      new Event("bookmarkedJobsUpdated")
    );
  };

  return (
    <article className="job-card">

      {/* ======================================
          TOP
      ====================================== */}

      <div className="job-card-top">

        <p className="job-age">
          {getJobAge(job?.createdAt)}
        </p>

        <Button
          variant="outline"
          size="icon"
          className={`bookmark-button ${
            bookmarked
              ? "bookmark-active"
              : ""
          }`}
          onClick={handleBookMarkJob}
          title={
            bookmarked
              ? "Remove Bookmark"
              : "Bookmark Job"
          }
        >
          {bookmarked ? (
            <BookmarkCheck size={18} />
          ) : (
            <Bookmark size={18} />
          )}
        </Button>

      </div>

      {/* ======================================
          COMPANY
      ====================================== */}

      <div className="job-company">

        <div className="company-logo-container">

          {job?.company?.logo ? (
            <img
              src={job.company.logo}
              alt={
                job?.company?.name ||
                "Company"
              }
              className="company-logo-image"
            />
          ) : (
            <Avatar className="company-avatar">
              <AvatarImage
                src=""
                alt="Company"
              />
            </Avatar>
          )}

        </div>

        <div className="company-info">

          <h2 className="company-name">
            {job?.company?.name ||
              "Company"}
          </h2>

          <p className="company-location">
            {job?.company?.location ||
              job?.location ||
              "Location not specified"}
          </p>

        </div>

      </div>

      {/* ======================================
          JOB INFORMATION
      ====================================== */}

      <div className="job-information">

        <h3 className="job-title">
          {job?.title ||
            "Job title not available"}
        </h3>

        <p className="job-description">
          {job?.description ||
            "No description available for this position."}
        </p>

      </div>

      {/* ======================================
          BADGES
      ====================================== */}

      <div className="job-badges">

        {job?.position && (
          <Badge
            variant="ghost"
            className="job-badge badge-position"
          >
            {job.position}
          </Badge>
        )}

        {job?.jobType && (
          <Badge
            variant="ghost"
            className="job-badge badge-type"
          >
            {job.jobType}
          </Badge>
        )}

        {job?.salary && (
          <Badge
            variant="ghost"
            className="job-badge badge-salary"
          >
            {job.salary}
          </Badge>
        )}

      </div>

      {/* ======================================
          ACTIONS
      ====================================== */}

      <div className="job-actions">

        <Button
          variant="outline"
          className="details-button"
          onClick={() =>
            navigate(
              `/description/${job?._id}`
            )
          }
        >
          Details
        </Button>

        <Button
          className="save-button"
          onClick={handleSaveJob}
        >
          {saved
            ? "Unsave"
            : "Save For Later"}
        </Button>

      </div>

    </article>
  );
};

export default Job;