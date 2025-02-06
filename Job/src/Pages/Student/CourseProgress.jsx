import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectProgressMutation } from '@/Features/Apis/progressApi';
import { CheckCircle, CirclePlay, Loader2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseProgress = () => {
    const { courseId } = useParams();
    const [currLect, setCurrLect] = useState(null);
    const { data, isLoading, isError,refetch } = useGetCourseProgressQuery(courseId);
    console.log(data)

    const [ updateLectProgress] = useUpdateLectProgressMutation();
    const [ completeCourse,{data:compData,isSuccess:compSuccess}] = useCompleteCourseMutation();
    const [inCompleteCourse,{data:IncompData,isSuccess:IncompSuccess}] =  useInCompleteCourseMutation();

    if(isLoading){
        return(
            <div className='flex h-[100vh] w-full bg-black justify-center items-center '>
                <Loader2Icon size={22} className='text-blue-600 h-12 w-12 animate-spin'></Loader2Icon>
            </div>
        )
    }
    if (isError) return <p>Failed to load...</p>;

    const { courseDetails, progress,completed } = data.data;
    const { courseTitle, lectures } = courseDetails;

    // Get the first lecture if no lecture is selected
    const firstLecture = currLect || lectures?.[0];

    // Function to check if a lecture is completed
    const isLectureCompleted = (lectureId) => {
        return progress.some((progrs) => progrs.lectureId === lectureId && progrs.viewed);
    };

    // Function to update current lecture video
    const handleLectureClick = (lecture) => {
        setCurrLect(lecture);
    };

    const lectureProgressUpdate = async (lectureId) =>{
        await updateLectProgress({courseId,lectureId})
        refetch();
    }

    const handleCompCourse = async ()=>{
        await completeCourse(courseId)
        refetch();

    }
    const handleInCompCourse = async ()=>{
        await inCompleteCourse(courseId);
        refetch();
    }

    return (
        <div className="relative mt-24 space-y-5 lg:mx-16 mb-4 mx-5 rounded-xl border p-3">
            {/* Header */}
            <div className="flex justify-between mx-4">
                <h1 className="md:text-2xl text-lg tracking-wide text-center">{courseTitle}</h1>
                <Button onClick={completed? handleInCompCourse : handleCompCourse } variant="outline">{completed ? "completed" : "Mark as complete"}</Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Video Player */}
                <div className="flex-1 md:w-3/5 rounded-lg shadow-md p-3">
                    <div className="p-1 rounded-lg">
                        <video
                            src={firstLecture?.videoUrl}
                            controls
                            onEnded={() => lectureProgressUpdate(currLect?._id || firstLecture?._id)}
                            className="w-full h-[70vh] md:rounded-lg bg-gray-900/30 border"
                        ></video>

                        <div className="mt-4">
                            <h1 className="font-medium text-lg border p-5 rounded-xl bg-slate-900/30">
                                {`Lecture ${
                                    lectures.findIndex((lec) => lec._id.toString() === (currLect?._id?.toString() || firstLecture?._id?.toString())) + 1
                                }: ${firstLecture?.lectureTitle}`}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Course Lecture List */}
                <div className="custom-scrollbar flex flex-col w-full md:w-2/5 min-h-[20vh] max-h-[60vh] bg-gray-900/20 p-3 border rounded-2xl md:mt-4">
                    <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>

                    {/* Scrollable Container */}
                    <div className="overflow-y-auto max-h-[50vh] md:max-h-[60vh] pr-2">
                        {lectures.map((lecture, index) => (
                            <Card
                                key={lecture._id}
                                className={`mb-3 cursor-pointer transition transform bg-gray-600/10 ${
                                    lecture._id === (currLect?._id || firstLecture._id) ? "bg-gray-800" : ""
                                }`}
                                onClick={() => handleLectureClick(lecture)}
                            >
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className="flex items-center">
                                        {isLectureCompleted(lecture._id) ? (
                                            <CheckCircle size={24} className="text-blue-300 mr-4" />
                                        ) : (
                                            <CirclePlay size={24} className="text-blue-300 mr-4" />
                                        )}
                                        <CardTitle className="text-lg font-medium">
                                            {lecture.lectureTitle}
                                        </CardTitle>
                                    </div>
                                    {isLectureCompleted(lecture._id) && <Badge className="bg-blue-200 text-blue-600">Completed</Badge>}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;
