import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import './Profile.css';

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
             <div className='profile-main w-[53.5rem] mx-auto bg-white border ml-[21.5rem] mt-[5rem] border-gray-600 rounded-2xl  p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className=" profile-img h-24 w-24 ">
                            <AvatarImage src={user?.profile?.profilePhoto || 'https://path/to/placeholder-image.jpg'}
                        alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='profile-head font-medium text-xl'>
                                {user?.fullname}</h1>
                            <p className='p-head'>
                                {user?.profile?.bio}  </p>
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>
                            {user?.email}</span>
                    </div>
                    <div className='pno flex items-center gap-3 my-2'>
                        <Contact />
                        <span>
                            {user?.phoneNumber}</span>
                    <Button 
                    onClick={() => setOpen(true)} 
                    className=" profile-btn text-right ml-[37rem] mt-[-18rem] bg-blue-800 text-white hover:origin-center transition-transform transform hover:scale-125 active:scale-150" variant="outline"><Pen /></Button>
                    </div>
                </div>
                <div className='skills-main my-5'>
                    <h1 className='text-xl'>Skills</h1>
                    <div className='profile-skills flex items-center gap-2 mt-1'>
                        {
                            user?.profile?.
                            skills.length !== 0 ? 
                            user?.profile?.
                            skills.map((item, index) => <Badge key={index} > {item }</Badge>) 
                            : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid justify-center w-full max-w-sm items-center gap-1.5'>
                    <Label className="resume-label text-md font-bold ml-[-12rem]">Resume</Label>
                </div>
                {
                        isResume ? 
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user?.profile?.resume} // Should point to the secure URL from Cloudinary
                            className="text-blue-500 hover:text-[#1b02f8] ml-2 w-full transition-transform transform hover:scale-110 active:scale-125 cursor-pointer"
                        >
                            {user?.profile?.resumeOriginalName || "View Resume"}
                        </a>
                        :
                        <span>NA</span>


}
            </div> 
                <div className='applied-job-head max-w-4xl mx-auto bg-white rounded-2xl ml-[21.5rem]'>
                    <h1 className='applied-jobh1 font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Applied Job Table   */}
                    <AppliedJobTable />
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile