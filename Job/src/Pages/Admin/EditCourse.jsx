import CourseTab from '@/AppComonents/Admin/CourseTab'
import { Button } from '@/components/ui/button'
import { UploadCloudIcon } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const EditCourse = () => {
    const { courseId } = useParams();
  
  return (
    <div className='flex-1 space-y-4'>
        <div className='flex items-center justify-between'>
            <h1 className='font-bold text-xl'>
                Add Details about Course
            </h1>
            <Link to={`/admin/add-course/${ courseId}/lectures`}>
            <Button variant="outline" className="">
            <UploadCloudIcon className='w-24 h-24' />

                Upload leture 
                
            </Button>
            </Link>
        </div>
        <CourseTab/>
    </div>
  )
}

export default EditCourse