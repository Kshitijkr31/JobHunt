import React, {
  useEffect,
  useState,
} from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import {
  useNavigate,
   useParams
} from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

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
  const {singleCompany} = useSelector(store=>store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

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
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      setInput({
          name: singleCompany.name || "",
          description: singleCompany.description || "",
          website: singleCompany.website || "",
          location: singleCompany.location || "",
          file: singleCompany.file || null
      })
  },[singleCompany]);

  return (
    <div>
      <Navbar />
      <div className='w-[45rem] mx-auto my-10 ml-[25rem] mt-[-8rem]'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button
              onClick={() => navigate("/admin/companies")}
              variant='outline'
              className='bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125'
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Update Company</h1>
          </div>
          <div className='grid grid-cols-2 gap-4 '>
            <div>
              <Label className='font-bold'>Company Name</Label>
              <Input
                type='text'
                name='name'
                value={input.name}
                placeholder='Google, Microsoft etc.'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                placeholder='Description'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Website</Label>
              <Input
                type='text'
                name='website'
                value={input.website}
                placeholder='https://abc.com'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='font-bold'>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                placeholder='India, USA etc.'
                onChange={changeEventHandler}
              />
            </div>
          </div>
          <div className='flex  mt-[1rem] items-center'>
            <Label className='font-bold'>Logo</Label>
            <Input
              type='file'
              accept='image/*'
              className='ml-[21rem] w-[22rem]'
              onChange={changeFileHandler}
            />
          </div>
          {loading ? (
            <Button className='w-full my-4'>
              {" "}
              <Loader2 className='mr-2 h-4 w-4 animate-spin bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125' />{" "}
              Please wait{" "}
            </Button>
          ) : (
            <Button
              type='submit'
              className='w-full my-4 bg-[#000000] text-white hover:bg-[#1b02f8] hover:text-white border-black transition-transform transform hover:scale-110 active:scale-125'
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

