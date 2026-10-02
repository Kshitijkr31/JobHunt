import React from "react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LatestJobCards.css";

const LatestJobCards = ({ job }) => {

  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/description/${job._id}`)}
      className="modern-job-card"
    >

      {/* Top */}

      <div className="job-card-top">

        <div className="company-logo">

          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
            />
          </Avatar>

        </div>

        <button className="job-arrow">
          <ArrowUpRight size={18} />
        </button>

      </div>

      {/* Company */}

      <div className="company-name">
        {job?.company?.name}
      </div>

      <div className="job-location">

        <MapPin size={14} />

        {job?.company?.location || "India"}

      </div>

      {/* Job title */}

      <h3 className="job-title">
        {job?.title}
      </h3>

      {/* Description */}

      <p className="job-description">
        {job?.description}
      </p>

      {/* Tags */}

      <div className="job-tags">

        <Badge className="job-tag blue-tag">
          <Briefcase size={12} />
          {job?.jobType}
        </Badge>

        <Badge className="job-tag">
          {job?.position} openings
        </Badge>

        <Badge className="job-tag salary-tag">
          {job?.salary}
        </Badge>

      </div>

    </article>
  );
};

export default LatestJobCards;