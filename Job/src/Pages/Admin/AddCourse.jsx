import CourseTable from '@/AppComonents/Admin/CourseTable'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation, useGetCourseQuery } from '@/Features/Apis/courseApi'
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';


const AddCourse = () => {
  const navigate = useNavigate();
  const {refetch} = useGetCourseQuery();
 
  const [courseTitle,setCourseTitle] = useState();
  const [category,setCategory] = useState();
  const [createCourse,{data,isLoading, error,isSuccess}] = useCreateCourseMutation();

  const createCourseHandler  =  async()=>{
    await createCourse({
      courseTitle,category
    })

  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course added successfully", {
        className: "custom-toast",
      });
      navigate("/admin/add-course")
      refetch();
    }
    if (error) {
      
  
    
      toast.error(error?.message || error?.data?.message || "An error occurred", {
        className: "custom-toast",
      });
    }
  }, [isSuccess, error]);
  

  const getSelectedCategory = (val)=>{
    setCategory(val);
  }
  const categories = [
    { label: "Web Development", courses: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Next.js"] },
    { label: "Data Science & Analytics", courses: ["Python", "R", "SQL", "Machine Learning", "Pandas"] },
    { label: "Backend Development", courses: ["Node.js", "Django", "Spring Boot", "GoLang"] },
    { label: "Cloud Computing", courses: ["AWS", "Azure", "Google Cloud", "Kubernetes"] },
    { label: "Cybersecurity", courses: ["Ethical Hacking", "Penetration Testing", "Network Security"] },
    { label: "Programming Languages", courses: ["C", "C++", "Java", "Python", "Rust"] },
  ];
  return (
    <>
      <div className='flex-1 space-y-6 border rounded-lg border-gray-900 shadow-2xl p-5 '>
        <div className=' space-y-2'>
          <h1 className='font-bold text-xl'>Unlock New Horizons: Add Your Course and Share Knowledge!
          </h1>
          <p className='text-sm'>Share your expertise, inspire learners, and create impact by adding your course to empower future minds!</p>
        </div>
        <div className='space-y-4'>
          <Label>
            Title
          </Label>
          <Input value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} type="text" placeholder="Your course name" name="courseTitle" className="max-w-xl">
          </Input>
        </div>
        <div className='space-y-4'>
          <Label>
           Select Category
          </Label>
          <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent  side="bottom" align="start">
        {categories.map((category) => (
          <SelectGroup key={category.label} >
            <SelectLabel className='border'>{category.label}</SelectLabel>
            {category.courses.map((course) => (
              <SelectItem key={course} value={course.toLowerCase()}>
                {course}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>

        </div>
        <div className='flex gap-5'>
          <Link to="/admin/add-course">
          <Button variant ="outline">Previous</Button>
          </Link>
          <Button className="border-white bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 text-white 
             font-semibold py-1 px-6 rounded-lg shadow-lg 
             transition-all duration-300 ease-in-out 
             hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 
             hover:shadow-xl active:scale-95 disabled:opacity-50 border"
             onClick ={createCourseHandler}>{
              isLoading ?(
                <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'>

                </Loader2>
                
                </>
              ):"Create"
             }</Button>
        </div>




      </div>
    </>
  )
}

export default AddCourse