import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { LucideDelete } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Switch } from "../../components/ui/switch"
import axios from 'axios'
import { Progress } from '../../components/ui/progress'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { useEditLectureMutation, useGetLectureQuery, useRemoveLectureMutation } from '../../Features/Apis/courseApi'

const LectureTab = () => {
    const navigate = useNavigate();
    const {lectureId,courseId} = useParams();
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [uploadMediaProgress, setUploadMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [removeLecture,{data:removeData,isLoading:removeLoad,
        isSuccess:removeSuccess,
    error:removeError}
] = useRemoveLectureMutation();
    const {refetch} = useGetLectureQuery(courseId);
  
    const MEDIA_API = "http://localhost:5000/api/media";

    const [editLecture,{data,isLoading,error,isSuccess}] = useEditLectureMutation();

    const removeLectureHandler = async () =>{
        await removeLecture(lectureId);

    }

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setUploadMediaProgress(true);

            try {
                const result = await axios.post(`${MEDIA_API}/uploadVideo`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded / total) * 100));
                    }
                });

                if (result.data.success) {
                    setUploadVideoInfo({
                        videoUrl: result.data.data.url,
                        publicId: result.data.data.public_id
                    });
                    setButtonDisable(false);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setUploadMediaProgress(false);
            }
        }
    };
    const btnClickHandler = async () =>{
        await editLecture({
            lectureTitle,
           videoInfo: uploadVideoInfo,
            isFree,
           courseId,
           lectureId,

            
        })

    }
    useEffect(()=>{
        if (removeSuccess) {
              toast.success(removeData?.message || "Course updated successfully", {
                className: "custom-toast",
              });
              refetch();
              navigate(`/admin/add-course/${courseId}/lectures`)
       
            }
            if (removeError) {
              toast.error(removeError?.message || removeError?.removeData?.message || "An error occurred", {
                className: "custom-toast",
              });
            }

    },[removeSuccess,removeError])

    useEffect(()=>{
        if (isSuccess) {
              toast.success(data?.message || "Course updated successfully", {
                className: "custom-toast",
              });
              refetch();
              navigate(`/admin/add-course/${courseId}/lectures`)
       
            }
            if (error) {
              toast.error(error?.message || error?.data?.message || "An error occurred", {
                className: "custom-toast",
              });
            }

    },[isSuccess,error])

    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div className="md:flex justify-between block space-y-2 md:space-y-0">
                    <div className="space-y-2">
                        <CardTitle>Edit Lecture</CardTitle>
                        <CardDescription>Click on save when done.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick = {removeLectureHandler} className="bg-red-500 text-white hover:bg-red-700">
                            Remove Lecture
                            <LucideDelete />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="ex: Introduction to HTML"
                    />
                </div>
                <div className="my-3 space-y-1">
                    <Label>
                        Video
                        <span  className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={fileChangeHandler}
                        className="w-fit"
                    />
                </div>
                <div className="flex items-center space-x-2 my-5">
                    <Switch id="isFree" checked={isFree} onCheckedChange={setIsFree} />
                    <Label htmlFor="isFree">Is this video Free?</Label>
                </div>
                {uploadMediaProgress && (
                    <div className="my-4">
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}%</p>
                    </div>
                )}
                <div>
                    <Button onClick={btnClickHandler} variant="outline" disabled={buttonDisable}>
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default LectureTab;
