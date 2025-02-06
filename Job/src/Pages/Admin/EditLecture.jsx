import LectureTab from '@/AppComonents/Admin/LectureTab'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const EditLecture = () => {
  const {courseId} = useParams();
  return (
    <div>
    <div className='flex items-center justify-between mb-5'>
      <div className='flex items-center gap-2'>
        <Link to={`/admin/add-course/${courseId}/lectures`}>
        <Button size="icon" variant="outline" className="rounded-full">
          <ArrowLeft size={16}  />
        </Button>
        </Link>
        <h1 className='font-bold text-xl'>Update your lecture</h1>

      </div>
     
    </div>
    <LectureTab/>
    </div>
  )
}

export default EditLecture