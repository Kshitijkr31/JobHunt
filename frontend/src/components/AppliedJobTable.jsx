import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { CalendarDays, Building2, ArrowUpRight } from "lucide-react";

import { useSelector } from "react-redux";
import "./AppliedJobTable.css";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  if (allAppliedJobs.length === 0) {
    return (
      <div className='no-applications'>
        <div className='no-applications-icon'>
          <Building2 size={24} />
        </div>

        <h3>No applications yet</h3>

        <p>Jobs you apply for will appear here.</p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "status-accepted";

      case "rejected":
        return "status-rejected";

      default:
        return "status-pending";
    }
  };

  return (
    <div className='applications-table-wrapper'>
      <Table className='applications-table'>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className='table-heading'>
                <CalendarDays size={15} />
                Applied
              </div>
            </TableHead>

            <TableHead>Job Role</TableHead>

            <TableHead>Company</TableHead>

            <TableHead className='status-column'>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.map((appliedJob) => {
            const job = appliedJob?.job || {};
            const company = job?.company || {};

            return (
              <TableRow key={appliedJob._id}>
                {/* DATE */}
                <TableCell>
                  <div className='date-cell'>
                    <span>
                      {new Date(appliedJob.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </TableCell>

                {/* JOB */}
                <TableCell>
                  <div className='job-title-cell'>
                    <strong>{job.title}</strong>

                    <span>View application</span>
                  </div>
                </TableCell>

                {/* COMPANY */}
                <TableCell>
                  <div className='company-cell'>
                    <div className='company-logo'>
                      {company?.logo ? (
                        <img src={company.logo} alt={company.name} />
                      ) : (
                        <Building2 size={17} />
                      )}
                    </div>

                    <span>{company.name}</span>
                  </div>
                </TableCell>

                {/* STATUS */}
                <TableCell className='status-column'>
                  <span
                    className={`application-status ${getStatusClass(
                      appliedJob.status
                    )}`}
                  >
                    <span className='status-dot'></span>

                    {appliedJob.status
                      ? appliedJob.status.charAt(0).toUpperCase() +
                        appliedJob.status.slice(1)
                      : "Pending"}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
