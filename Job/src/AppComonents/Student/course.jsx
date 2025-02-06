import React from 'react';
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';

const Course = ({course}) => {
  const navigate = useNavigate();
  return (
    <>
      
      <Card className="mt-8 overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-gray-700 hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer duration-300 " onClick={()=>navigate(`/detail-page/${course._id}`)}>
        <div className="relative p-2 ">
          <img
            src={course?.courseThumbnail} // Direct link to the image
            alt="Next.js Course"
            className="w-full h-40 object-fill rounded-t-lg"
          />
        </div>
        <CardContent className="space-y-2">
            <h1 className='hover:underline font-bold text-lg truncate mt-2  bg-gradient-to-r from-blue-300 via-blue-200 to-gray-100 text-transparent bg-clip-text'>{course?.courseTitle}</h1>
            <div className='flex items-center justify-between'>
            <div className='flex justify-center item-center gap-3 '>
                <Avatar className="h-6 w-6 ">
                    <AvatarImage src={course?.creator.photoUrl}/>
                    <AvatarFallback>
                    CN
                </AvatarFallback>
                </Avatar>
                <h1 className='font-medium text-sm flex items-center justify-center'>{course?.creator.email.slice(0,6)}</h1>
               

            </div>
            <Badge className="flex justify-center items-center  px-2 py-1 rounded-xl border-white text-xs border-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white 
             font-semibold  shadow-lg 
             transition-all duration-300 ease-in-out 
             hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 
             hover:shadow-xl active:scale-95 disabled:opacity-50">{course?.courseLevel}</Badge>
            </div>
            <div className='text-md font-bold'>
                <span>₹{course?.coursePrice}</span>
            </div>
        </CardContent>
      </Card>
      
    </>
  );
};

export default Course;
