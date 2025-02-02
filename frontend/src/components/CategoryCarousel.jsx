import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import './CategoryCarousel.css';
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "IT",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
  return (
    <div className='mt-16 carousel '>
      <Carousel className='carousels w-full max-w-[52rem] items-center ml-[300px] '>
        <CarouselContent className='carousel-content flex w-[37rem]'>
          {category.map((cat, index) => (
            <CarouselItem className='carousel-item md:basis-1/2 lg-basis-1/3  h-16 '>
              <Button
                onClick={() => searchJobHandler(cat)}
                variant='outline'
                className='category-button rounded-full bg-[#5a49fb] w-52 text-white h-16 text-xl hover:bg-[#3c36c0] hover:text-[#f1f1f1] active:scale-110 transition-transform duration-200'
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
