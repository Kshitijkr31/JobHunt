import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { BriefcaseBusiness, Plus, Search } from "lucide-react";
import "./AdminJobs.css";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="admin-jobs-page">
      <Navbar />

      <main className="admin-jobs-container">

        {/* Page Header */}
        <section className="admin-jobs-header">

          <div className="admin-jobs-title-section">
            <div className="admin-jobs-icon">
              <BriefcaseBusiness size={30} />
            </div>

            <div>
              <h1>Manage Jobs</h1>
              <p>
                Create, manage and organize your posted job opportunities
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="new-job-btn"
          >
            <Plus size={18} />
            Post New Job
          </Button>

        </section>

        {/* Search */}
        <section className="admin-jobs-search">
          <Search size={20} className="search-icon" />

          <Input
            value={input}
            placeholder="Search jobs by company or role..."
            onChange={(e) => setInput(e.target.value)}
          />
        </section>

        {/* Jobs Table Card */}
        <section className="jobs-table-card">

          <div className="jobs-table-header">
            <div>
              <h2>Posted Jobs</h2>
              <p>
                View and manage all jobs posted by your companies
              </p>
            </div>
          </div>

          <div className="jobs-table-content">
            <AdminJobsTable />
          </div>

        </section>

      </main>
    </div>
  );
};

export default AdminJobs;