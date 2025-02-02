import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOutIcon, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import './Navbar.css';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='bg-white '>
      <div className='fixed navbar top-0 mx-auto h-16  w-full bg-white shadow-md py-5 flex items-center  px-10  z-50'  >
        <div>
        
          <h1  className=' heading-main text-2xl font-bold ml-20'>
            Job<span className='text-[#1b02f8]'>Hunt</span>
          </h1>
          
        </div>
        <div className='  flex items-center gap-12 sm:gap-12 '>
          <ul className='flex main-gap  items-center sm:gap-5   gap-4 font-bold '>
            {user && user.role === "recruiter" ? (
              <>
                <li className=' li-login transition-transform transform hover:scale-110 active:scale-125 ml-[60rem]'>
                  <Link to='/admin/companies' className='text-black font-bold hover:text-[#1b02f8] '>Companies</Link>
                </li>
                <li className=' transition-transform transform hover:scale-110 active:scale-125 '>
                  <Link to='/admin/jobs'className='text-black font-bold hover:text-[#1b02f8] ' >Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className=' transition-transform transform hover:scale-110 active:scale-125 ml-[53rem]' >
                  <Link
                    to='/'
                    className='text-black font-bold hover:text-[#1b02f8] '
                  >
                    Home
                  </Link>
                </li>
                <li className='transition-transform transform hover:scale-110 active:scale-125'>
                  <Link
                    to='/jobs'
                    className='text-black font-bold hover:text-[#1b02f8]'
                  >
                    Jobs
                  </Link>
                </li>
                <li className=' transition-transform transform hover:scale-110 active:scale-125'>
                  <Link
                    to='/browse'
                    className='text-black font-bold hover:text-[#1b02f8]'
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className=' flex items-center gap-2'>
              <Link to='/login'>
                <Button
                  variant='outline'
                  className='bg-[#f5f8f7] hover:bg-[#c2dfde] login-btn text-black border-black transition-transform transform hover:scale-110 active:scale-125'
                >
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button
                  variant='outline'
                  className='bg-[#4b53c5] hover:bg-[#3edcca] signup-btn text-white transition-transform transform hover:scale-110 active:scale-125'
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover >
              <PopoverTrigger asChild>
                <Avatar className='photo-main cursor-pointer transition-transform transform hover:scale-110 active:scale-125'>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt='@shadcn'
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='small-pop w-80 font-normal h-30 my-2 '>
                <div className=''>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt='@shadcn'
                    />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {user?.profile?.bio}
                    </p>
                  </div>
                  <div className='flex flex-col my-2 text-gray-600'>
                    {user && user.role === "student" && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Link to='/profile'>View Profile</Link>
                      </div>
                    )}
                    <div className='flex w-fit items-center gap-2 my-2 cursor-pointer '>
                      <LogOutIcon />
                      <Button onClick={logoutHandler} variant='link'className='transition-transform transform hover:scale-110 active:scale-125'>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
