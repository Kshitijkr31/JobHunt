import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Mail,
  Phone,
  Pen,
  FileText,
  Download,
  BriefcaseBusiness,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import "./Profile.css";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  const skills = user?.profile?.skills || [];

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">

        {/* ================= PROFILE HERO ================= */}
        <section className="profile-card">

          <div className="profile-card-glow"></div>

          <div className="profile-top">

            <div className="profile-identity">

              <div className="profile-avatar-wrapper">
                <Avatar className="profile-avatar">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                  />
                </Avatar>

                <span className="profile-online-dot"></span>
              </div>

              <div className="profile-basic-info">

                <div className="profile-name-row">
                  <h1>{user?.fullname || "Your Name"}</h1>

                  <span className="profile-verified">
                    <Sparkles size={13} />
                    Job Seeker
                  </span>
                </div>

                <p className="profile-bio">
                  {user?.profile?.bio ||
                    "Add a professional bio to tell recruiters about yourself."}
                </p>

                <div className="profile-location">
                  <MapPin size={15} />
                  <span>India</span>
                </div>

              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="profile-edit-btn"
            >
              <Pen size={16} />
              Edit Profile
            </Button>

          </div>


          {/* ================= CONTACT INFO ================= */}
          <div className="profile-contact-grid">

            <div className="profile-contact-item">
              <div className="contact-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email</span>
                <p>{user?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="profile-contact-item">
              <div className="contact-icon">
                <Phone size={18} />
              </div>

              <div>
                <span>Phone</span>
                <p>{user?.phoneNumber || "Not provided"}</p>
              </div>
            </div>

            <div className="profile-contact-item">
              <div className="contact-icon">
                <BriefcaseBusiness size={18} />
              </div>

              <div>
                <span>Applications</span>
                <p>
                  {allAppliedJobs.length}{" "}
                  {allAppliedJobs.length === 1
                    ? "Application"
                    : "Applications"}
                </p>
              </div>
            </div>

          </div>


          {/* ================= SKILLS ================= */}
          <div className="profile-section">

            <div className="section-heading">
              <div>
                <span className="section-label">EXPERTISE</span>
                <h2>Skills & Technologies</h2>
              </div>
            </div>

            <div className="profile-skills">

              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="profile-skill"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="empty-text">
                  No skills added yet.
                </span>
              )}

            </div>

          </div>


          {/* ================= RESUME ================= */}
          <div className="resume-section">

            <div className="resume-left">

              <div className="resume-icon">
                <FileText size={22} />
              </div>

              <div>
                <span className="section-label">RESUME</span>

                <h3>
                  {user?.profile?.resumeOriginalName ||
                    "No resume uploaded"}
                </h3>

                <p>
                  Keep your resume updated to improve your job applications.
                </p>
              </div>

            </div>

            {user?.profile?.resume && (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-button"
              >
                <Download size={17} />
                View Resume
                <ExternalLink size={14} />
              </a>
            )}

          </div>

        </section>


        {/* ================= APPLIED JOBS ================= */}
        <section className="applications-section">

          <div className="applications-header">

            <div>
              <span className="section-label">
                YOUR ACTIVITY
              </span>

              <h2>Applied Jobs</h2>

              <p>
                Track the jobs you have applied for and their current status.
              </p>
            </div>

            <div className="application-count">
              <BriefcaseBusiness size={18} />
              <span>{allAppliedJobs.length}</span>
            </div>

          </div>

          <div className="applications-card">
            <AppliedJobTable />
          </div>

        </section>

      </main>

      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
      />

    </div>
  );
};

export default Profile;