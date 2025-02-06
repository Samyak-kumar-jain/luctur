import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import  { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CreativeCommonsIcon, Loader2, Loader2Icon, SendToBackIcon, SkipBackIcon, StepBack, StepBackIcon } from 'lucide-react'
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import {  useCreateLectureMutation, useGetLectureQuery } from '@/Features/Apis/courseApi'
import Lecture from '@/AppComonents/Admin/Lecture'

const LecturePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {refetch} = useGetLectureQuery(courseId)

  const { data: lectureData = {}, isLoading: LectLoad, isError: lecterror } = useGetLectureQuery(courseId);

    
    const [lectureTitle,setLectureTitle] = useState("");
 

    const [createLecture,{data,isLoading,isSuccess,error}] = useCreateLectureMutation();

    const createLectureHandler = async ()=>{

      await createLecture({lectureTitle,courseId})

    } 

   useEffect(() => {
       if (isSuccess) {
         toast.success(data?.message || "Course updated successfully", {
           className: "custom-toast",
         });
         refetch();
         
        
       }
       if (error) {
         toast.error(error?.message || error?.data?.message || "An error occurred", {
           className: "custom-toast",
         });
       }
     }, [isSuccess, error]);
  
  return (
    <>
    <div className='flex-1 space-y-6 border rounded-lg border-gray-900 shadow-2xl p-5 '>
      <div className=' space-y-2'>
        <h1 className='font-bold text-xl'>Start creating your lecture today—
        </h1>
        <p className='text-sm max-w-xl'>Create, organize, and deliver engaging lectures effortlessly, empowering learning with structured content and interactive experiences anytime.</p>
      </div>
      <div className='space-y-4'>
        <Label>
          Lecture Title
        </Label>
        <Input value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} type="text" placeholder="Your course name" name="courseTitle" className="max-w-xl">
        </Input>
      </div>
      
      <div className='flex gap-5'>
        <Link to={`/admin/add-course/${courseId}`}>
        <Button variant ="outline">
           <StepBackIcon/> Previous</Button>
        </Link>
        <Button className="border-white bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 text-white 
           font-semibold py-1 px-6 rounded-lg shadow-lg 
           transition-all duration-300 ease-in-out 
           hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 
           hover:shadow-xl active:scale-95 disabled:opacity-50 border"
           onClick ={createLectureHandler}>{
            isLoading ?(
              <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'>

              </Loader2>
              
              </>
            ):
            <>
            
             Create lecture
            </>
           

           }</Button>
      </div>
      <div className='mt-10'>
      {
  LectLoad ? (
    <p>
      <Loader2Icon />
      Loading lectures...
    </p>
  ) : lecterror ? (
    <p>Failed to load lectures</p>
  ) : !lectureData || !lectureData.lectures ? (
    <p>Create your lecture</p>
  ) : lectureData.lectures.length === 0 ? (
    <p>Create your lecture</p>
  ) : (
    <div>
      <div className='text-2xl tracking-widest flex justify-center mt-4 mb-4 bg-gray-600/10 p-2 items-center shadow-2xl border rounded-md'>
        <h1>Lectures</h1>
        </div>
   { lectureData.lectures.map((lecture, index) => (
      <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
    ))}
    </div>
  )
}


      </div>




    </div>
  </>
  )
}

export default LecturePage