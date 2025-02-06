import { Edit, Edit2, Edit2Icon, Edit3Icon } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Lecture = ({lecture,index, courseId}) => {

  console.log(lecture)
    
    const navigate = useNavigate();
    const goToUpdateLecture = ()=>{
        navigate(`/admin/add-course/${courseId}/lectures/${lecture._id}/edit`)

    }
  return (
    <>
    <div>
      
    <div className='flex items-center justify-between px-4 py-2 my-2 rounded-md border bg-gray-900/30 '>
        
        <h1 className=' text-gray-200 tracking-wide '>

            Lecture - {index + 1}
            <br/>
         {  lecture.lectureTitle.charAt(0).toUpperCase() + lecture.lectureTitle.slice(1)}
        </h1>
        <Edit className='cursor-pointer text-gray-600 hover:text-gray-300  '
        onClick = {goToUpdateLecture}/>


    </div>
    </div>
    
    </>
  )
}

export default Lecture