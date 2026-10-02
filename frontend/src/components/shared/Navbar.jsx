import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";

import {
  BriefcaseBusiness,
  Building2,
  LogOutIcon,
  User2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import "./Navbar.css";

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

      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className='modern-navbar'>
      <div className='navbar-inner'>
        {/* ================================
            LOGO
        ================================= */}
        <Link to='/' className='brand'>
          <div className='brand-icon'>
            <BriefcaseBusiness size={19} />
          </div>

          <span>
            Job<span>Hunt</span>
          </span>
        </Link>

        {/* ================================
            NAVIGATION
        ================================= */}
        <nav className='nav-links'>
          {user?.role === "recruiter" ? (
            <>
              <Link to='/admin/companies'>Companies</Link>

              <Link to='/admin/jobs'>Jobs</Link>
            </>
          ) : (
            <>
              <Link to='/'>Home</Link>

              <Link to='/jobs'>Jobs</Link>

              <Link to='/browse'>Browse</Link>
            </>
          )}
        </nav>

        {/* ================================
            RIGHT SIDE
        ================================= */}
        {!user ? (
          <div className='auth-buttons'>
            <Link to='/login'>
              <Button variant='ghost' className='login-button'>
                Login
              </Button>
            </Link>

            <Link to='/signup'>
              <Button className='signup-button'>Get Started</Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button className='profile-button'>
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt='Profile'
                  />
                </Avatar>
              </button>
            </PopoverTrigger>

            <PopoverContent className='profile-popover'>
              {/* Profile Header */}
              <div className='profile-info'>
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt='Profile'
                  />
                </Avatar>

                <div>
                  <h4>{user?.fullname}</h4>
                  <p>
                    {user?.role === "recruiter"
                      ? "Recruiter"
                      : user?.profile?.bio || "Job seeker"}
                  </p>
                </div>
              </div>

              {/* Recruiter Options */}
              {user?.role === "recruiter" && (
                <>
                  <Link to='/admin/companies' className='profile-option'>
                    <Building2 size={18} />
                    Companies
                  </Link>

                  <Link to='/admin/jobs' className='profile-option'>
                    <BriefcaseBusiness size={18} />
                    Manage Jobs
                  </Link>
                </>
              )}

              {/* Student Options */}
              {user?.role === "student" && (
                <>
                  <Link to='/profile' className='profile-option'>
                    <User2 size={18} />
                    View Profile
                  </Link>

                  <Link to='/bookmarks' className='profile-option'>
                    <Bookmark size={18} />
                    Bookmarked Jobs
                  </Link>

                  <Link to='/saved-jobs' className='profile-option'>
                    <BookmarkCheck size={18} />
                    Saved Jobs
                  </Link>
                </>
              )}

              {/* Logout */}
              <button
                onClick={logoutHandler}
                className='profile-option logout-option'
              >
                <LogOutIcon size={18} />
                Logout
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Navbar;
