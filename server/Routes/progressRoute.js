const express = require("express")

const {isAuthenticated} = require("../MIddlewares/isAuthenticated.js")
const {getCourseProgress, updateLectureProgress, markAsCompleted, markAsInCompleted} = require("../Controllers/progressController.js")


const router = express.Router();

router.get("/:courseId",isAuthenticated,getCourseProgress)
router.post("/:courseId/lecture/:lectureId/view",isAuthenticated,updateLectureProgress);
router.post("/:courseId/complete",isAuthenticated,markAsCompleted)
router.post("/:courseId/InComplete",isAuthenticated,markAsInCompleted)

module.exports = router;


