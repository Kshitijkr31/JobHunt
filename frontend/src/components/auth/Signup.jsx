import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, UserPlus } from "lucide-react";
import "./Signup.css";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select Student or Recruiter");
      return;
    }

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-container">
        <div className="auth-card signup-card">

          {/* LEFT SIDE */}
          <div className="auth-visual signup-visual">
            <div className="auth-visual-content">

              <div className="auth-icon">
                <UserPlus size={30} />
              </div>

              <h2>
                Start your journey
                <span> with JobHunt</span>
              </h2>

              <p>
                Create your account and discover opportunities
                that match your skills, career goals and ambitions.
              </p>

              <div className="auth-points">
                <div>
                  <span>✓</span>
                  Discover relevant jobs
                </div>

                <div>
                  <span>✓</span>
                  Save and bookmark jobs
                </div>

                <div>
                  <span>✓</span>
                  Apply with ease
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="auth-form-container">

            <div className="auth-heading">
              <h1>Create Account</h1>
              <p>
                Join JobHunt and take the next step in your career.
              </p>
            </div>

            <form onSubmit={submitHandler} className="auth-form">

              {/* FULL NAME */}
              <div className="form-group">
                <Label htmlFor="fullname">
                  Full Name
                </Label>

                <Input
                  id="fullname"
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <Label htmlFor="email">
                  Email Address
                </Label>

                <Input
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* PHONE */}
              <div className="form-group">
                <Label htmlFor="phoneNumber">
                  Phone Number
                </Label>

                <Input
                  id="phoneNumber"
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Create a strong password"
                  required
                />
              </div>

              {/* ROLE */}
              <div className="form-group">
                <Label className="role-title">
                  Account Type
                </Label>

                <RadioGroup className="role-selection">

                  <div className="role-option">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      id="student-role"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="role-radio"
                    />

                    <Label
                      htmlFor="student-role"
                      className={`role-card ${
                        input.role === "student"
                          ? "active-student"
                          : ""
                      }`}
                    >
                      <span className="role-card-title">
                        Student
                      </span>

                      <span className="role-card-description">
                        Find jobs and build your career
                      </span>
                    </Label>
                  </div>

                  <div className="role-option">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      id="recruiter-role"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="role-radio"
                    />

                    <Label
                      htmlFor="recruiter-role"
                      className={`role-card ${
                        input.role === "recruiter"
                          ? "active-recruiter"
                          : ""
                      }`}
                    >
                      <span className="role-card-title">
                        Recruiter
                      </span>

                      <span className="role-card-description">
                        Hire talented candidates
                      </span>
                    </Label>
                  </div>

                </RadioGroup>
              </div>

              {/* PROFILE */}
              <div className="form-group">

                <Label htmlFor="profile">
                  Profile Picture
                  <span className="optional">
                    Optional
                  </span>
                </Label>

                <div className="file-upload">
                  <Input
                    id="profile"
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="file-input"
                  />
                </div>

                {input.file && (
                  <p className="selected-file">
                    ✓ {input.file.name}
                  </p>
                )}

              </div>

              {/* SIGNUP BUTTON */}
              {loading ? (
                <Button
                  type="button"
                  disabled
                  className="auth-submit"
                >
                  <Loader2 className="loading-icon" />
                  Creating account...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="auth-submit"
                >
                  Create Account
                </Button>
              )}

            </form>

            {/* LOGIN */}
            <div className="auth-switch">
              <span>
                Already have an account?
              </span>

              <Link to="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="auth-secondary-button"
                >
                  Login
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;