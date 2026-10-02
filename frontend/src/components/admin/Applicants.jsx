import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import "./Applicants.css";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="applicants-page">
      <Navbar />

      <main className="applicant-main">
        <ApplicantsTable />
      </main>
    </div>
  );
};

export default Applicants;