import { Button } from "../../components/ui/button";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import React, { useEffect, useState } from "react";
import TextEditor from "../Commom/TextEditor";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, useGetCourseQuery, usePublishCourseMutation, useRemoveCourseMutation } from "@/Features/Apis/courseApi";

const CourseTab = () => {
  const { courseId } = useParams();
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
  const {data: courseByIdData,isLoading:courseByIdLoading,refetch:refetchCourse} = useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();

  const {refetch} = useGetCourseQuery();
  const navigate = useNavigate();


  const [preview, setPreview] = useState();
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const categories = [
    { label: "Web Development", courses: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Next.js"] },
    { label: "Data Science & Analytics", courses: ["Python", "R", "SQL", "Machine Learning", "Pandas"] },
    { label: "Backend Development", courses: ["Node.js", "Django", "Spring Boot", "GoLang"] },
    { label: "Cloud Computing", courses: ["AWS", "Azure", "Google Cloud", "Kubernetes"] },
    { label: "Cybersecurity", courses: ["Ethical Hacking", "Penetration Testing", "Network Security"] },
    { label: "Programming Languages", courses: ["C", "C++", "Java", "Python", "Rust"] },
  ];

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  

  const updateCourseHandler = async () => {
    const formdata = new FormData();

    // Append data from input state to FormData
    formdata.append("courseTitle", input.courseTitle);
    formdata.append("subTitle", input.subTitle);
    formdata.append("description", input.description);
    formdata.append("category", input.category);
    formdata.append("courseLevel", input.courseLevel);
    formdata.append("coursePrice", input.coursePrice);



    
    if (input.courseThumbnail) {
      formdata.append("courseThumbnail", input.courseThumbnail);
    }

   

    await editCourse({ formdata, courseId });
  }

 
  const [removeCourse,{data:removeData,isLoading:removeLoad,
    isSuccess:removeSuccess,
error:removeError}


] = useRemoveCourseMutation();
  const removeCourseHandler = async () =>{
    await removeCourse(courseId)

  }

  const publishHandler = async (action) =>{
      try {
        const response = await publishCourse({courseId,query:action});

        if(response.data){
          refetchCourse();
          toast.success(response.data.message, {
            className: "custom-toast",
          });
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Failed to publish course", {
          className: "custom-toast",
        });

        
      }

  }

  useEffect(()=>{
        if (removeSuccess) {
                toast.success(removeData?.message || "Course updated successfully", {
                  className: "custom-toast",
                });
                refetch();
                navigate(`/admin/add-course/`)
         
              }
              if (removeError) {
                toast.error(removeError?.message || removeError?.removeData?.message || "An error occurred", {
                  className: "custom-toast",
                });
              }
  
      },[removeSuccess,removeError])

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully", {
        className: "custom-toast",
      });
      refetch();
      navigate("/admin/add-course")
    }
    if (error) {
      toast.error(error?.message || error?.data?.message || "An error occurred", {
        className: "custom-toast",
      });
    }
  }, [isSuccess, error]);

  return (
    <Card className="bg-transparent shadow-2xl">
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:gap-5 gap-4">
        <div className="space-y-4">
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Make changes to the course</CardDescription>
        </div>
        <div className="flex gap-3 sm:gap-5">
          <Button variant="outline" onClick={()=>publishHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button onClick={removeCourseHandler} variant="outline" className="bg-red-600 border border-white">
            Remove course
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-4">
          {/* Course Title */}
          <div className="space-y-2">
            <Label className="text-md">Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeHandler}
              placeholder="e.g., Software Engineering"
              className="focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label>Sub Title</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeHandler}
              placeholder="e.g., Become an SDE"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <TextEditor input={input} setInput={setInput} />
          </div>

          {/* Category & Course Level */}
          <div className="flex flex-col sm:flex-row sm:gap-6">
            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(value) => setInput({ ...input, category: value })}>
                <SelectTrigger className="w-full sm:w-[240px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent side="bottom" align="start">
                  {categories.map((category) => (
                    <SelectGroup key={category.label}>
                      <SelectLabel>{category.label}</SelectLabel>
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

            {/* Course Level Dropdown */}
            <div className="space-y-2">
              <Label>Course Level</Label>
              <Select onValueChange={(value) => setInput({ ...input, courseLevel: value })}>
                <SelectTrigger className="w-full sm:w-[240px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Course Price */}
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeHandler}
              className="w-full sm:w-fit"
              placeholder="e.g., 49.99"
            />
          </div>

          {/* Course Thumbnail */}
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-full sm:w-fit"
              onChange={selectThumbnail}
            />
            {preview && (
              <div className="border border-gray-800 rounded-lg w-full sm:w-fit py-1 px-3 mt-4">
                <img src={preview} alt="Course Thumbnail" className="w-64 my-2" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <Button variant="outline" onClick={() => navigate("/admin/add-course")}>
              Cancel
            </Button>
            <Button onClick={updateCourseHandler}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
