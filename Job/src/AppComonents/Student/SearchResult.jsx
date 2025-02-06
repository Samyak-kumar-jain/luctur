import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ course }) => {
  

  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border py-4 gap-4 m-3 bg-gray-900/30 rounded-lg'>
      <Link to={`/detail-page/${course._id}`} className="flex flex-col md:flex-row gap-4 w-full md:w-auto md:pl-4 px-4 ">
        {/* Updated Image */}
        <img
          src={course.courseThumbnail} // Test with a working image URL
          alt="Course thumbnail"
          className='h-44 md:h-32 w-full md:w-56 object-fill rounded border' 
        />
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-lg md:text-xl'>{course.courseTitle}</h1>
          <p className='text-sm text-gray-600'>{course.subTitle}</p>
          <p className='text-sm text-gray-300'>{course.creator.email.slice(0,6)
}</p>
          <Badge className="w-fit mt-2 md:mt-0">
            {
              course.courseLevel
            }
          </Badge>
        </div>
      </Link>
      <div className=' md:mt-8 md:text-right w-full md:w-auto md:mr-4 ml-6'>
        <h1>₹ {course?.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
