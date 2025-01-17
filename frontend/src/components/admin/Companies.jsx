import React
, { useEffect, useState }
 from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='w-full mx-auto my-5 ml-[10rem]'>
                <div className='flex items-center  my-5 mt-[-11rem] '>
                    <Input
                        className="w-fit "
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                    onClick={() => navigate("/admin/companies/create")}
                    variant='outline'
                    className='bg-[#4b53c5] hover:bg-[#3edcca] ml-[52rem] text-white transition-transform transform hover:scale-110 active:scale-125'
                 >New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies