import React
, { useEffect, useState } 
from 'react'
import { RadioGroup, RadioGroupItem} from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Noida", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "IT", "Java Developer"]
    },
    {
        filterType: "Salary",
        array: ["0 LPA-2 LPA","2 LPA-5 LPA", "5 LPA or Above"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const salaryChangeHandler = (value) => {
        setSelectedSalary(value);
    };

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-[80%] bg-white p-3 rounded-md ml-[5rem] mt-20'>
             { <h1 className='font-bold text-lg'>Filter Jobs</h1> }
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                            data.filterType === 'Salary' ? (
                                data.array.map((item, idx) => {
                                    const itemId = `salary${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2'  key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} onChange={() => salaryChangeHandler(item)}/>
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    );
                                })
                           ) : (
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                );
                            })
                        )}
                    </div>
                ))}
                    
                  </RadioGroup>
        </div>
    )
}


export default FilterCard