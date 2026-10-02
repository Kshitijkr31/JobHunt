import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  ArrowLeft,
  MoreHorizontal,
  UserRound,
  Mail,
  Phone,
  FileText,
  CalendarDays,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import "./ApplicantsTable.css";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const navigate = useNavigate();

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const applicationList = applicants?.applications || [];

  return (
    <div className="app-main">

      {/* Back Button */}
      <Button
        onClick={() => navigate("/admin/jobs")}
        variant="outline"
        className="app-back-btnn"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </Button>

      {/* Main Card */}
      <div className="app-table-wrapper">

        {/* Header */}
        <div className="app-table-header">
          <div>
            <h2>Applicants</h2>
            <p>View and manage users who applied for this job</p>
          </div>

          <div className="app-count">
            {applicationList.length} Applicants
          </div>
        </div>

        {/* Subtitle */}
        <div className="app-table-subtitle">
          A list of recent applicants
        </div>

        {/* Table */}
        <div className="app-table-scroll">
          <Table className="apply-main">

            <TableHeader>
              <TableRow className="app-table-heading">
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="app-action-heading">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {applicationList.length > 0 ? (
                applicationList.map((item) => (

                  <TableRow
                    key={item._id}
                    className="app-table-row"
                  >

                    {/* Applicant */}
                    <TableCell>
                      <div className="applicant-info">
                        <div className="applicant-icon">
                          <UserRound size={17} />
                        </div>

                        <span>
                          {item?.applicant?.fullname || "N/A"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      <div className="app-data">
                        <Mail size={16} />
                        <span>
                          {item?.applicant?.email || "N/A"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                      <div className="app-data">
                        <Phone size={16} />
                        <span>
                          {item?.applicant?.phoneNumber || "N/A"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Resume */}
                    <TableCell>
                      {item?.applicant?.profile?.resume ? (
                        <a
                          className="resume-link"
                          href={item.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText size={16} />
                          <span>
                            {item?.applicant?.profile
                              ?.resumeOriginalName || "View Resume"}
                          </span>
                        </a>
                      ) : (
                        <span className="resume-na">
                          No Resume
                        </span>
                      )}
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <div className="app-data">
                        <CalendarDays size={16} />
                        <span>
                          {new Date(
                            item?.applicant?.createdAt
                          ).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="app-action-cell">

                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="app-action-button">
                            <MoreHorizontal size={20} />
                          </button>
                        </PopoverTrigger>

                        <PopoverContent className="status-popover">

                          {shortlistingStatus.map((status) => (
                            <div
                              onClick={() =>
                                statusHandler(
                                  status,
                                  item?._id
                                )
                              }
                              key={status}
                              className={`status-option ${
                                status === "Accepted"
                                  ? "accepted-status"
                                  : "rejected-status"
                              }`}
                            >
                              {status}
                            </div>
                          ))}

                        </PopoverContent>
                      </Popover>

                    </TableCell>

                  </TableRow>
                ))

              ) : (

                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="no-applicants"
                  >
                    No applicants found
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

export default ApplicantsTable;