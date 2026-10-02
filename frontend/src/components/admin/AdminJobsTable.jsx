import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Edit2,
  Eye,
  MoreHorizontal,
  BriefcaseBusiness,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AdminJobsTable.css";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("called");

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }

      return (
        job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="ajt">
      <div className="jobs-table-wrapper">

        <div className="jobs-table-header">

          <div className="jobs-count">
            {filterJobs?.length || 0} Jobs
          </div>
        </div>

        <div className="jobs-table-subtitle">
          A list of your recent posted jobs
        </div>

        <div className="jobs-table-scroll">
          <Table className="admin-main">
            <TableHeader>
              <TableRow className="jobs-table-heading">
                <TableHead>Company Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="action-heading">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filterJobs?.length > 0 ? (
                filterJobs.map((job) => (
                  <TableRow
                    key={job._id}
                    className="job-table-row"
                  >
                    <TableCell className="company-cell">
                      <div className="company-info">
                        <div className="company-icon">
                          <BriefcaseBusiness size={17} />
                        </div>

                        <span>
                          {job?.company?.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="role-cell">
                      {job?.title}
                    </TableCell>

                    <TableCell className="date-cell">
                      {new Date(
                        job?.createdAt
                      ).toLocaleDateString("en-GB")}
                    </TableCell>

                    <TableCell className="action-cell">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="action-button">
                            <MoreHorizontal size={20} />
                          </button>
                        </PopoverTrigger>

                        <PopoverContent className="edit-pops">
                          <div
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}`)
                            }
                            className="job-action edit-action"
                          >
                            <Edit2 size={16} />
                            <span>Edit</span>
                          </div>

                          <div
                            onClick={() =>
                              navigate(
                                `/admin/jobs/${job._id}/applicants`
                              )
                            }
                            className="job-action applicants-action"
                          >
                            <Eye size={16} />
                            <span>Applicants</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="no-jobs"
                  >
                    No jobs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsTable;