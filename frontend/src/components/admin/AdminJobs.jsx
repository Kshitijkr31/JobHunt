
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import './AdminJobs.css';
const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(setSearchJobByText(input));
    }, [input]);
    return (
        <div>
            <Navbar />
            <div className='comp-job-create w-full mx-auto my-5 ml-[10rem]'>
                <div className='compp flex items-center  my-5 mt-[6rem] '>
                    <Input
                        className="w-fit "
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                    onClick={() => navigate("/admin/jobs/create")}
                    variant='outline'
                    className='bg-[#4b53c5] btn hover:bg-[#3edcca] ml-[52rem] text-white transition-transform transform hover:scale-110 active:scale-125'
                 >New Jobs</Button>
                </div>
                <AdminJobsTable/>
            </div>
        </div>
    )
}

export default AdminJobs

