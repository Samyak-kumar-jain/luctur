import React from 'react';
import { SkeletonCard } from '../Commom/CourseSkeleton';
import Course from './course';
import { useGetPublishCourseQuery } from '@/Features/Apis/courseApi';

const Courses = () => {
  const {data,isLoading,isError} = useGetPublishCourseQuery();
  console.log(data);
  if(isError){
    <div className='flex justify-center items-center'>
      <h1 className='text-3xl '>
        Server not responding....
      </h1>
    </div>
  }
  const courses = data?.courses || [];
  return (
    <>
      <div className="bg-gray-950/40 flex justify-center">
        <div className="max-w-7xl w-full p-6">
          <h2 className="font-bold text-3xl text-center mb-18 tracking-wider bg-gradient-to-r from-blue-300 via-blue-200 to-gray-200 text-transparent bg-clip-text">
            Our Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center"
                  >
                    <SkeletonCard key={index} />
                  </div>
                ))
              :courses.map((course,index)=>(<Course key={course._id} course={course}/>)) }
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
