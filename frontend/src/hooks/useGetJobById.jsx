import { setSingleJob } from '@/redux/jobSlice'
import {  JOB_API_END_POINT
 } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobById = (jobsId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobsId}`,{withCredentials:true});
                console.log(res.data.jobs);
                if(res.data.success){
                    dispatch(setSingleJob(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    },[jobsId, dispatch])
}

export default useGetJobById