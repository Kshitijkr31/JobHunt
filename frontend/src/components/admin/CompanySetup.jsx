import React, { useEffect, useState } from "react";

import Navbar from "../shared/Navbar";

import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Building2, Globe, MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import axios from "axios";

import { COMPANY_API_END_POINT } from "@/utils/constant";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import { useSelector } from "react-redux";

import useGetCompanyById from "@/hooks/useGetCompanyById";

import "./CompanySetup.css";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /*
   * =========================================
   * INPUT CHANGE
   * =========================================
   */

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  /*
   * =========================================
   * FILE CHANGE
   * =========================================
   */

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });
  };

  /*
   * =========================================
   * UPDATE COMPANY
   * =========================================
   */

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
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

        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating the company."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================
   * LOAD COMPANY DATA
   * =========================================
   */

  useEffect(() => {
    if (!singleCompany) return;

    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className='company-setup-page'>
      <Navbar />

      <main className='company-setup-container'>
        {/* =====================================
            BACK BUTTON
        ====================================== */}

        <button
          type='button'
          className='company-back-button'
          onClick={() => navigate("/admin/companies")}
        >
          <ArrowLeft size={18} />
          Back to Companies
        </button>

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className='company-setup-header'>
          <div className='company-setup-icon'>
            <Building2 size={26} />
          </div>

          <div>
            <h1>Update Company</h1>

            <p>Update your company information and profile details.</p>
          </div>
        </div>

        {/* =====================================
            FORM CARD
        ====================================== */}

        <div className='company-setup-card'>
          <form onSubmit={submitHandler}>
            {/* =================================
                COMPANY INFORMATION
            ================================== */}

            <div className='setup-section'>
              <div className='setup-section-heading'>
                <h2>Company Information</h2>

                <p>Keep your company details accurate and up to date.</p>
              </div>

              <div className='setup-form-grid'>
                {/* COMPANY NAME */}

                <div className='setup-field'>
                  <Label>Company Name</Label>

                  <div className='setup-input-wrapper'>
                    <Building2 size={17} className='setup-input-icon' />

                    <Input
                      type='text'
                      name='name'
                      value={input.name}
                      placeholder='Google, Microsoft, Paytm...'
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>

                {/* LOCATION */}

                <div className='setup-field'>
                  <Label>Location</Label>

                  <div className='setup-input-wrapper'>
                    <MapPin size={17} className='setup-input-icon' />

                    <Input
                      type='text'
                      name='location'
                      value={input.location}
                      placeholder='Hyderabad, India'
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>

                {/* WEBSITE */}

                <div className='setup-field'>
                  <Label>Website</Label>

                  <div className='setup-input-wrapper'>
                    <Globe size={17} className='setup-input-icon' />

                    <Input
                      type='text'
                      name='website'
                      value={input.website}
                      placeholder='https://company.com'
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className='setup-field setup-description-field'>
                  <Label>Description</Label>

                  <textarea
                    name='description'
                    value={input.description}
                    placeholder='Tell candidates about your company...'
                    onChange={changeEventHandler}
                    className='company-description-input'
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* =================================
                COMPANY LOGO
            ================================== */}

            <div className='setup-section logo-section'>
              <div className='setup-section-heading'>
                <h2>Company Logo</h2>

                <p>Upload a new logo to represent your company.</p>
              </div>

              <div className='logo-upload-area'>
                {/* CURRENT LOGO */}

                {singleCompany?.logo && (
                  <div className='current-company-logo'>
                    <img src={singleCompany.logo} alt='Current company logo' />
                  </div>
                )}

                <div className='logo-upload-content'>
                  <Label className='logo-label'>Upload Logo</Label>

                  <Input
                    type='file'
                    accept='image/*'
                    onChange={changeFileHandler}
                    className='company-file-input'
                  />

                  <p>PNG, JPG or JPEG • Recommended size 300 × 300px</p>
                </div>
              </div>
            </div>

            {/* =================================
                ACTIONS
            ================================== */}

            <div className='company-setup-actions'>
              <Button
                type='button'
                variant='outline'
                className='cancel-company-button'
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  type='button'
                  disabled
                  className='update-company-button'
                >
                  <Loader2 className='update-loader' size={18} />
                  Updating...
                </Button>
              ) : (
                <Button type='submit' className='update-company-button'>
                  Update Company
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CompanySetup;
