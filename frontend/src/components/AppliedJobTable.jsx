import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import './AppliedJobTable.css';

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector((store) => store.job);

    // Return null if no jobs have been applied
    if (allAppliedJobs.length === 0) {
        return null;
    }

    return (
        <div className='table-main'>
            <TableCaption className=" applied-main w-[66rem] ml-[-7rem] mt-[-2.5rem]">A list of your applied jobs</TableCaption>
            <Table className='head-main' >
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right ">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs
                        .filter(
                            (job) => job?.job?.title && job?.job?.company?.name && job?.createdAt
                        ) // Filter out jobs with missing information
                        .map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>
                                    {new Date(appliedJob.createdAt).toLocaleDateString('en-GB')}
                                </TableCell>
                                <TableCell>{appliedJob.job.title}</TableCell>
                                <TableCell>{appliedJob.job.company.name}</TableCell>
                                <TableCell className="text-right applied-right">
                                    <Badge
                                        className={`${
                                            appliedJob?.status === 'rejected'
                                                ? 'bg-red-400'
                                                : appliedJob.status === 'pending'
                                                ? 'bg-gray-400'
                                                : 'bg-green-400'
                                        }`} 
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
