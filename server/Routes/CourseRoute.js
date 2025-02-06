const express = require("express");
const { isAuthenticated } = require("../MIddlewares/isAuthenticated");
const { 
  createCourse, fetchCourse, editCourse, createLecture, getLectures, 
  removeLecture, getLectureById, updateLecture, removeCourse, 
  publishCourse,
  getCourseById,
  getPublishCourse,
  searchCourse
} = require("../Controllers/CourseController");
const { upload } = require("../utils/multer.js");

const router = express.Router();

router.post("/create-course", isAuthenticated, createCourse);
router.get("/get-all-course", isAuthenticated, fetchCourse);
router.get("/get-published-course",getPublishCourse)
router.put("/update-course/:courseId", upload.single("courseThumbnail"), isAuthenticated, editCourse);
router.post("/create-lecture/:courseId", isAuthenticated, createLecture);
router.get("/get-all-course-lectures/:courseId", isAuthenticated, getLectures);
router.post("/remove-course/:courseId", isAuthenticated, removeCourse);
router.put("/update-lecture/:courseId/:lectureId", isAuthenticated, updateLecture);
router.get("/get-Lecture/:lectureId", isAuthenticated, getLectureById);
router.post("/remove-lecture/:lectureId", isAuthenticated, removeLecture);
router.put("/publish-course/:courseId",isAuthenticated,publishCourse)
router.get("/get-CourseById/:courseId",isAuthenticated,getCourseById)
router.get("/search",isAuthenticated,searchCourse)
module.exports = router; 
