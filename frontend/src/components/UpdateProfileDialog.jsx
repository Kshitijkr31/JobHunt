import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
  Loader2Icon,
  User,
  Mail,
  Phone,
  FileText,
  Code2,
  X,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

import { toast } from "sonner";

import "./UpdateProfileDialog.css";


const UpdateProfileDialog = ({
  open,
  setOpen,
}) => {

  const [loading, setLoading] = useState(false);

  const { user } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();


  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null,
  });


  /* ==========================================
     KEEP FORM IN SYNC WITH USER
  ========================================== */

  useEffect(() => {

    if (user) {

      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills:
          user?.profile?.skills?.join(", ") || "",
        file: null,
      });

    }

  }, [user, open]);


  /* ==========================================
     INPUT HANDLER
  ========================================== */

  const changeEventHandler = (e) => {

    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  /* ==========================================
     FILE HANDLER
  ========================================== */

  const fileChangeHandler = (e) => {

    const file = e.target.files?.[0];

    setInput((prev) => ({
      ...prev,
      file,
    }));

  };


  /* ==========================================
     SUBMIT
  ========================================== */

  const submitHandler = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "fullname",
      input.fullname
    );

    formData.append(
      "email",
      input.email
    );

    formData.append(
      "phoneNumber",
      input.phoneNumber
    );

    formData.append(
      "bio",
      input.bio
    );

    formData.append(
      "skills",
      input.skills
    );

    if (input.file) {
      formData.append(
        "file",
        input.file
      );
    }


    try {

      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },

          withCredentials: true,
        }
      );


      if (res.data.success) {

        dispatch(
          setUser(res.data.user)
        );

        toast.success(
          res.data.message
        );

        setOpen(false);

      } else {

        toast.error(
          res.data.message
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogContent className="profile-dialog">

        <DialogHeader>

          <div className="dialog-title-area">

            <div className="dialog-title-icon">
              <User size={20} />
            </div>

            <div>
              <DialogTitle>
                Update Profile
              </DialogTitle>

              <p>
                Keep your professional profile up to date.
              </p>
            </div>

          </div>

        </DialogHeader>


        <form onSubmit={submitHandler}>

          <div className="profile-form">

            {/* NAME */}

            <div className="profile-form-group">

              <Label htmlFor="fullname">
                <User size={14} />
                Full Name
              </Label>

              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Enter your full name"
              />

            </div>


            {/* EMAIL */}

            <div className="profile-form-group">

              <Label htmlFor="email">
                <Mail size={14} />
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Enter your email"
              />

            </div>


            {/* PHONE */}

            <div className="profile-form-group">

              <Label htmlFor="phoneNumber">
                <Phone size={14} />
                Phone Number
              </Label>

              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
              />

            </div>


            {/* BIO */}

            <div className="profile-form-group">

              <Label htmlFor="bio">
                <User size={14} />
                Professional Bio
              </Label>

              <textarea
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Tell recruiters about yourself..."
                rows={3}
              />

            </div>


            {/* SKILLS */}

            <div className="profile-form-group">

              <Label htmlFor="skills">
                <Code2 size={14} />
                Skills
              </Label>

              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="React, Node.js, MongoDB, Java"
              />

              <span className="field-hint">
                Separate skills using commas.
              </span>

            </div>


            {/* RESUME */}

            <div className="profile-form-group">

              <Label htmlFor="file">
                <FileText size={14} />
                Resume
              </Label>

              <div className="resume-upload">

                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                />

              </div>

              <span className="field-hint">
                PDF files only.
              </span>

            </div>

          </div>


          <DialogFooter className="profile-dialog-footer">

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="cancel-profile-btn"
            >
              <X size={16} />
              Cancel
            </Button>


            {loading ? (

              <Button
                type="button"
                disabled
                className="update-profile-btn"
              >
                <Loader2Icon
                  className="animate-spin"
                  size={17}
                />

                Updating...
              </Button>

            ) : (

              <Button
                type="submit"
                className="update-profile-btn"
              >
                Update Profile
              </Button>

            )}

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );
};


export default UpdateProfileDialog;