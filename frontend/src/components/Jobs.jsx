import React, { useEffect, useMemo, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import "./Jobs.css";

const Jobs = () => {
  const { allJobs = [], searchedQuery = "" } = useSelector(
    (store) => store.job
  );

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  /*
   * -----------------------------------------
   * SAFE TEXT HELPER
   * -----------------------------------------
   */
  const normalizeText = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value).trim().toLowerCase();
  };

  /*
   * -----------------------------------------
   * SALARY PARSER
   * -----------------------------------------
   *
   * Handles values such as:
   * "3-4 LPA"
   * "4-5 LPA"
   * "8-12 LPA"
   * "12-15 LPA"
   * "5 LPA or Above"
   *
   * Also uses salaryMin / salaryMax if
   * those fields exist in the database.
   */
  const getSalaryRange = (job) => {
    let min = Number(job?.salaryMin);
    let max = Number(job?.salaryMax);

    /*
     * If salaryMin/salaryMax are valid,
     * use those directly.
     */
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      return {
        min,
        max,
      };
    }

    /*
     * Otherwise try to read job.salary.
     */
    const salaryText = normalizeText(job?.salary);

    const numbers = salaryText.match(/\d+(?:\.\d+)?/g);

    if (!numbers || numbers.length === 0) {
      return {
        min: null,
        max: null,
      };
    }

    if (numbers.length === 1) {
      const value = Number(numbers[0]);

      return {
        min: value,
        max: value,
      };
    }

    return {
      min: Number(numbers[0]),
      max: Number(numbers[1]),
    };
  };

  /*
   * -----------------------------------------
   * SALARY FILTER
   * -----------------------------------------
   *
   * We use OVERLAP logic.
   *
   * Example:
   *
   * Job = 3-4 LPA
   * Filter = 2-5 LPA
   *
   * Result = MATCH
   *
   * This fixes the previous problem where
   * Hyderabad jobs like 3-4 LPA were being
   * incorrectly removed.
   */
  const matchesSalaryFilter = (job, salaryFilter) => {
    if (!salaryFilter) {
      return true;
    }

    const { min, max } = getSalaryRange(job);

    if (min === null || max === null) {
      return false;
    }

    switch (salaryFilter) {
      case "0 LPA-2 LPA":
        return min <= 2 && max >= 0;

      case "2 LPA-5 LPA":
        return min <= 5 && max >= 2;

      case "5 LPA or Above":
        return max >= 5;

      default:
        return true;
    }
  };

  /*
   * -----------------------------------------
   * FILTER JOBS
   * -----------------------------------------
   */
  const filterJobs = useMemo(() => {
    let filtered = [...allJobs];

    /*
     * SEARCH
     */
    const search = normalizeText(searchedQuery);

    if (search) {
      filtered = filtered.filter((job) => {
        const title = normalizeText(job?.title);
        const description = normalizeText(job?.description);
        const location = normalizeText(job?.location);
        const companyName = normalizeText(job?.company?.name);
        const companyLocation = normalizeText(job?.company?.location);

        return (
          title.includes(search) ||
          description.includes(search) ||
          location.includes(search) ||
          companyName.includes(search) ||
          companyLocation.includes(search)
        );
      });
    }

    /*
     * LOCATION
     */
    if (selectedLocation) {
      const selected = normalizeText(selectedLocation);

      filtered = filtered.filter((job) => {
        const jobLocation = normalizeText(job?.location);
        const companyLocation = normalizeText(job?.company?.location);

        return (
          jobLocation.includes(selected) ||
          companyLocation.includes(selected)
        );
      });
    }

    /*
     * INDUSTRY
     */
    if (selectedIndustry) {
      const selected = normalizeText(selectedIndustry);

      filtered = filtered.filter((job) => {
        const title = normalizeText(job?.title);
        const description = normalizeText(job?.description);
        const industry = normalizeText(job?.industry);
        const category = normalizeText(job?.category);
        const position = normalizeText(job?.position);

        return (
          title.includes(selected) ||
          description.includes(selected) ||
          industry.includes(selected) ||
          category.includes(selected) ||
          position.includes(selected)
        );
      });
    }

    /*
     * SALARY
     */
    if (selectedSalary) {
      filtered = filtered.filter((job) =>
        matchesSalaryFilter(job, selectedSalary)
      );
    }

    return filtered;
  }, [
    allJobs,
    searchedQuery,
    selectedLocation,
    selectedIndustry,
    selectedSalary,
  ]);

  /*
   * -----------------------------------------
   * CLEAR FILTERS
   * -----------------------------------------
   */
  const handleClearFilters = () => {
    setSelectedLocation("");
    setSelectedIndustry("");
    setSelectedSalary("");
  };

  /*
   * -----------------------------------------
   * MOBILE FILTER CLOSE
   * -----------------------------------------
   */
  const handleFilterSelect = () => {
    /*
     * Don't automatically close on desktop.
     *
     * On mobile, close after selection.
     */
    if (window.innerWidth <= 750) {
      setShowFilters(false);
    }
  };

  /*
   * -----------------------------------------
   * BODY SCROLL LOCK FOR MOBILE FILTER
   * -----------------------------------------
   */
  useEffect(() => {
    if (showFilters && window.innerWidth <= 750) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  return (
    <div className="jobs-page">
      <Navbar />

      {/* MOBILE FILTER BUTTON */}
      <button
        className="mobile-filter-button"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <Menu size={20} />
        <span>Filters</span>
      </button>

      {/* MOBILE OVERLAY */}
      {showFilters && (
        <div
          className="filter-overlay"
          onClick={() => setShowFilters(false)}
        />
      )}

      <main className="jobs-container">

        {/* -----------------------------------------
            FILTER SIDEBAR
        ----------------------------------------- */}
        <aside
          className={`filter-sidebar ${
            showFilters ? "filter-sidebar-open" : ""
          }`}
        >
          <FilterCard
            selectedLocation={selectedLocation}
            selectedIndustry={selectedIndustry}
            selectedSalary={selectedSalary}
            setSelectedLocation={setSelectedLocation}
            setSelectedIndustry={setSelectedIndustry}
            setSelectedSalary={setSelectedSalary}
            onFilterSelect={handleFilterSelect}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* -----------------------------------------
            JOB CONTENT
        ----------------------------------------- */}
        <section className="jobs-content">

          <div className="jobs-heading">
            <span className="jobs-eyebrow">
              JOB DISCOVERY
            </span>

            <h1>
              Find your next opportunity
            </h1>

            <p>
              {filterJobs.length}{" "}
              {filterJobs.length === 1 ? "job" : "jobs"} found
            </p>
          </div>

          {/* -----------------------------------------
              NO JOBS
          ----------------------------------------- */}
          {filterJobs.length === 0 ? (
            <div className="no-jobs">

              <div className="no-jobs-icon">
                <Menu size={25} />
              </div>

              <h2>
                No jobs found
              </h2>

              <p>
                Try changing your filters or search query.
              </p>

              <button
                className="clear-results-button"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>

            </div>
          ) : (
            /* -----------------------------------------
               JOB GRID
            ----------------------------------------- */
            <div className="jobs-grid">

              {filterJobs.map((job) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  key={job?._id}
                  className="job-grid-item"
                >
                  <Job job={job} />
                </motion.div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default Jobs;