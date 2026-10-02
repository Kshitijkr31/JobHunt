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
import { Loader2, LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUser,
} from "@/redux/authSlice";
import "./Login.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(
    (store) => store.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select Student or Recruiter");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Invalid email or password"
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
        <div className="auth-card login-card">

          {/* LEFT SIDE */}
          <div className="auth-visual login-visual">
            <div className="auth-visual-content">

              <div className="auth-icon">
                <LogIn size={30} />
              </div>

              <h2>
                Welcome back to
                <span> JobHunt</span>
              </h2>

              <p>
                Sign in to continue exploring opportunities,
                managing applications and building your career.
              </p>

              <div className="auth-points">

                <div>
                  <span>✓</span>
                  Explore latest opportunities
                </div>

                <div>
                  <span>✓</span>
                  Manage saved jobs
                </div>

                <div>
                  <span>✓</span>
                  Track your applications
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="auth-form-container">

            <div className="auth-heading">
              <h1>Welcome Back</h1>

              <p>
                Login to your JobHunt account.
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="auth-form"
            >

              {/* EMAIL */}
              <div className="form-group">
                <Label htmlFor="login-email">
                  Email Address
                </Label>

                <Input
                  id="login-email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <Label htmlFor="login-password">
                  Password
                </Label>

                <Input
                  id="login-password"
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* ROLE */}
              <div className="form-group">

                <Label className="role-title">
                  Login As
                </Label>

                <RadioGroup className="role-selection">

                  <div className="role-option">

                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      id="login-student"
                      checked={
                        input.role === "student"
                      }
                      onChange={changeEventHandler}
                      className="role-radio"
                    />

                    <Label
                      htmlFor="login-student"
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
                        Looking for opportunities
                      </span>
                    </Label>

                  </div>

                  <div className="role-option">

                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      id="login-recruiter"
                      checked={
                        input.role === "recruiter"
                      }
                      onChange={changeEventHandler}
                      className="role-radio"
                    />

                    <Label
                      htmlFor="login-recruiter"
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
                        Looking for candidates
                      </span>
                    </Label>

                  </div>

                </RadioGroup>
              </div>

              {/* LOGIN BUTTON */}
              {loading ? (
                <Button
                  type="button"
                  disabled
                  className="auth-submit"
                >
                  <Loader2 className="loading-icon" />
                  Signing in...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="auth-submit"
                >
                  Login
                </Button>
              )}

            </form>

            {/* SIGNUP */}
            <div className="auth-switch">

              <span>
                Don't have an account?
              </span>

              <Link to="/signup">
                <Button
                  type="button"
                  variant="outline"
                  className="auth-secondary-button"
                >
                  Create Account
                </Button>
              </Link>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;