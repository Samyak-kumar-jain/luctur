import { Button } from '../../components/ui/button';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { Edit2, LucideLoaderCircle, PlusCircleIcon } from 'lucide-react';
import { useGetCourseQuery } from '../../Features/Apis/courseApi';
import { Badge } from '../../components/ui/badge';

const CourseTable = () => {
  const navigate = useNavigate();
  const {data,isLoading} = useGetCourseQuery();


 
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black z-30">
        <LucideLoaderCircle className="animate-spin text-blue-700 w-10 h-10" />
      </div>
    );
  }
  console.log(data?.courses);
  const Courses = data?.courses || {};

  const handleRouting = (id) =>{
    
   navigate(`/admin/add-course/${id}`)



  }

  return (
    <div>
      <h1 className="text-3xl mb-7 tracking-widest text-gray-400/90 select-none">Add New Course</h1>
      <Button
        variant="outline"
        className="select-none cursor-pointer"
        onClick={() => navigate('/admin/add-course/create-course')}
      >
        <PlusCircleIcon/>
        Add Course
      </Button>
      <Table className="mt-7 select-none border">
        <TableCaption className="select-none">A list of your recent courses.</TableCaption>
        <TableHeader className="select-none">
          <TableRow className="select-none">
            <TableHead className="w-[100px] select-none">Price</TableHead>
            <TableHead className="select-none">Status</TableHead>
            <TableHead className="select-none">Title</TableHead>
            <TableHead className="text-right select-none">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="select-none ">
          {Courses.map((Course) => (
            <TableRow key={Course._id} className="select-none">
              <TableCell className="font-medium select-none ">₹ {Course?.coursePrice}</TableCell>
              <TableCell className="select-none"><Badge>
              {Course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
              <TableCell className="select-none">{Course?.courseTitle}</TableCell>
              <TableCell className="text-right select-none">
                {/* <Link to={`/admin/add-course/${Course._id}`}> */}
                <Button variant="outline" onClick={()=>handleRouting(Course._id)}>
                  <Edit2/>
                </Button>
                {/* </Link> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      
      </Table>
    </div>
  );
};

export default CourseTable;
