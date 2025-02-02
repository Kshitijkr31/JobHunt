import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './CompaniesTable.css';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
                <TableCaption className='tb-cap w-[66rem] mt-4 mb-2'>A list of your recent registered companies</TableCaption>
            <Table className=" comp-main w-[73rem]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                     {
                        filterCompany?.map((company) => ( 
                            <tr>
                                <TableCell>
                                    <Avatar className='h-[3rem] w-[6rem]'>
                                        <AvatarImage src=
                                        {company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{new Date(company?.createdAt).toLocaleDateString("en-GB")}
                                </TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover className='edit-pop ml-8'>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                        <div onClick={()=> navigate(`/admin/companies/${company._id}`)}
                                             className=' flex items-center gap-2 w-fit cursor-pointer transition-transform transform hover:scale-110 active:scale-125'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                         ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable