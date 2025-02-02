import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
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
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='app-main'>
        <Button
        onClick={() => navigate("/admin/jobs")}
        variant='outline'
        className='bg-[#000000] btn-appliant-back text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125 ml-[9rem] mt-[-3rem]'
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <TableCaption className='apply-tb-cap w-64 text-center ml-[24rem]'>
        A list of your recent applied user
      </TableCaption>
      <Table className=' apply-main mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <tr key={item._id}>
              <TableCell>
                <span>Full Name:</span> {item?.applicant?.fullname}
              </TableCell>
              <TableCell>
                <span>Email:</span> {item?.applicant?.email}
              </TableCell>

              <TableCell>
                <span>Contact:</span> {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell>
                <span>Resume:</span>{" "}
                {item.applicant?.profile?.resume ? (
                  <a
                    className='text-blue-600 cursor-pointer'
                    href={item?.applicant?.profile?.resume}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  "NA"
                )}
              </TableCell>
              <TableCell>
                <span>Date:</span>{" "}
                {new Date(item?.applicant?.createdAt).toLocaleDateString(
                  "en-GB"
                )}
              </TableCell>


              <TableCell className='btn-pop'>
                <span className='popp'>Action:</span>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className=' w-32'>
                    {shortlistingStatus.map((status, index) => (
                      <div
                        onClick={() => statusHandler(status, item?._id)}
                        key={index}
                        className='edit-pops-status flex w-fit items-center my-2 cursor-pointer'
                      >
                        <span>{status}</span> 
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
