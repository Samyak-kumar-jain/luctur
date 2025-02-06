import BuyButton from '@/AppComonents/Commom/BuyButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetCourseDetailStatusQuery } from '@/Features/Apis/purcaseApi'
import { BadgeInfo, Loader2Icon, LockIcon, PlayCircle } from 'lucide-react'
import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'

const CourseDetail = () => {
    const navigate = useNavigate();
    const {courseId} = useParams(); 
 
       const handleContinueCourse = async () =>{
        if(purchased){
            navigate(`/course-progress/${courseId}`)

        }
       } 

  
    const {data,isLoading,error,isSuccess,isError} = useGetCourseDetailStatusQuery(courseId);
    console.log(data)
       if(isLoading){
            return(
                <div className='flex h-[100vh] w-full bg-black justify-center items-center '>
                    <Loader2Icon size={22} className='text-blue-600 h-12 w-12 animate-spin'></Loader2Icon>
                </div>
            )
        }
    if(isError) return <h1>Failed to load course detail</h1>

    const {course,purchased} = data || {};
  return (
    <div className='  relative mt-24 space-y-5 lg:mx-9 mb-4 '>
        <div className='text-white border mx-4 bg-gray-900/30 rounded-lg'>
            <div className='ma-w-7xl mx-auto py-4 px-4 md:px-8 flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text logo'>{course?.courseTitle}</h1>
                <p className='text-base md:text-lg'>{course?.subTitle}</p>
                <p className='text-sm'>Created By <span className=' italic text-gray-300' >
                {course?.creator.email.slice(0,6)}</span></p>
                <div className='flex items-center gap-2 text-sm text-gray-300'>
                    <BadgeInfo size={16}></BadgeInfo>
                    <p className='text-gray-300'>Last updated : {course?.createdAt.split("T")[0]}</p>

                </div>
                <p className='text-gray-300'>Students enrolled : {
                    course?.enrolledStudents.length
}</p>

            </div>

        </div>
        <div className='max-w-7xl mx-auto my-5 px-4   flex flex-col lg:flex-row justify-between gap-10    '>
            <div className='w-full  space-y-4 border p-6 rounded-lg'>
            <h1 className='font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text logo'>Description</h1>
            <p className='text-sm text-gray-300  tracking-wider  ' dangerouslySetInnerHTML={{__html:course.
description
}}/>
           
            <Card className="bg-gray-900/30 shadow-2xl ">
                <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text logo">
                        Course Content
                    </CardTitle>
                    <CardDescription>
                     Total course :  {course.lectures.length}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {
                        course?.lectures.map((lecture,index)=>{
                            return(<>
                            <div key={index} className='flex items-center gap-3 text-sm'>
                                <span>
                                    {
                                        lecture.isPreviewFree?<PlayCircle/>:<LockIcon/>
                                    }
                                </span>
                                <p className='text-white'>{lecture?.lectureTitle}</p>
                            </div>
                            </>)
                        })
                    }

                </CardContent>
            </Card>

            </div>
            <div className='w-full lg:w-1/2 '>
            <Card className="bg-gray-900/30 ">
                <CardContent className="p-4 flex flex-col ">
                    <div className='w-full h-[200px] mb-4'>
                    <ReactPlayer width="100%"
                    height ={"100%"}
                    url={course.lectures[0].videoUrl}
                    controls={true}
                    className ="bg-black">
                        

                    </ReactPlayer>
                    </div>
                    <h1 className='text-xl bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text logo'>{course.lectures[0].lectureTitle}</h1>
                    <h1 className=''>{purchased ? (""):(
                        course.coursePrice
                    )}</h1>

                </CardContent>
                <CardFooter className="flex justify-center">
                   {
                    purchased ? (
                        <Button onClick={handleContinueCourse} className="w-full bg-gray-900/70 hover:bg-gray-900/90 text-white border bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500  shadow-lg  text-center p-1 rounded-xl  border-white mt-3">
                        Continue Course
                    </Button>
                    ) :(
                        <BuyButton courseId={courseId}></BuyButton>
                   
                    )
                   }
                </CardFooter>
            </Card>
       


        </div>

        </div>
        
        </div>
  )
}

export default CourseDetail