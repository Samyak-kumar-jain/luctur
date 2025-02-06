import { SkeletonCard } from '@/AppComonents/Commom/CourseSkeleton';
import Course from '@/AppComonents/Student/course';
import { useGetUserQuery } from '@/Features/Apis/authApi';
import { Loader2Icon } from 'lucide-react';
import React from 'react';

const MyLearning = () => {
 

  const {data,isLoading} = useGetUserQuery();
  if(isLoading){
    return(
        <div className='flex h-[100vh] w-full bg-black justify-center items-center '>
            <Loader2Icon size={22} className='text-blue-600 h-12 w-12 animate-spin'></Loader2Icon>
        </div>
    )
}

  // console.log(data);

  const myLearn = data?.user.enrolledCourses || [];
  console.log(myLearn)


  return (
    <div className='relative max-w-7xl bg-gray-700/5 md:mx-32 mx-5 my-28  border py-6 px-6 rounded-2xl'>
      <h1 className='font-bold text-2xl tracking-wider p-3 bg-gray-600/5 rounded-3xl  bg-gradient-to-r from-blue-200 via-blue-200 to-gray-100 text-transparent bg-clip-text'>
        My learning
      </h1>

      <div className=''>
        {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          <SkeletonCard />
          </div>
        ) : myLearn.length === 0 ? (
          <p>Your are not enrolled in any course</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {myLearn.map((enCourse) => (
              <Course key={enCourse._id} course={enCourse} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
