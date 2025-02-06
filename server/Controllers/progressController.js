const CourseProgress = require("../Modles/progress.js")
const Course = require("../Modles/Course.js")

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.tokenId;

    console.log("getCourseProgress called");
    console.log(`Fetching progress for user: ${userId}, course: ${courseId}`);

    // Step-1: Fetch the user's course progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");

    console.log("Fetched course progress:", courseProgress);

    // Fetch course details
    const courseDetails = await Course.findById(courseId).populate("lectures");
    console.log("Fetched course details:", courseDetails);

    if (!courseDetails) {
      console.log("Course not found");
      return res.status(404).json({ message: "Course not found" });
    }

    // Step-2: If no progress found, return course details with an empty progress
    if (!courseProgress) {
      console.log("No progress found. Returning empty progress.");
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // Step-3: Return the user's course progress along with course details
    console.log("Returning user course progress");
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.error("Error in getCourseProgress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

   
const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.tokenId;

    console.log("Received request to update progress");
    console.log("User ID:", userId);
    console.log("Course ID:", courseId);
    console.log("Lecture ID:", lectureId);

    // Fetch or create course progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      console.log("No progress found, creating new record...");
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    } else {
      console.log("Existing course progress found:", courseProgress);
    }

    // Find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      console.log(`Lecture ${lectureId} already exists, updating status to viewed`);
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      console.log(`Lecture ${lectureId} not found, adding new lecture progress`);
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // Check if all lectures are completed
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    console.log("Completed Lectures Count:", lectureProgressLength);

    const course = await Course.findById(courseId);
    console.log("Course Details:", course);

    if (course.lectures.length === lectureProgressLength) {
      console.log("All lectures completed. Marking course as completed.");
      courseProgress.completed = true;
    }

    await courseProgress.save();
    console.log("Progress saved successfully");

    return res.status(200).json({
      message: "Lecture progress updated successfully.",
    });
  } catch (error) {
    console.error("Error updating lecture progress:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.tokenId;

    console.log(`Received request to mark course ${courseId} as completed for user ${userId}`);

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      console.error(`Course progress not found for courseId: ${courseId} and userId: ${userId}`);
      return res.status(404).json({ message: "Course progress not found" });
    }

    console.log(`Marking all lecture progress as viewed for courseId: ${courseId}`);
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );

    courseProgress.completed = true;
    await courseProgress.save();

    console.log(`Course ${courseId} marked as completed successfully.`);
    return res.status(200).json({ message: "Course marked as completed." });
  } catch (error) {
    console.error("Error in marking course as completed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.tokenId;

    console.log(`Received request to mark course ${courseId} as incomplete for user ${userId}`);

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      console.error(`Course progress not found for courseId: ${courseId} and userId: ${userId}`);
      return res.status(404).json({ message: "Course progress not found" });
    }

    console.log(`Marking all lecture progress as not viewed for courseId: ${courseId}`);
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );

    courseProgress.completed = false;
    await courseProgress.save();

    console.log(`Course ${courseId} marked as incomplete successfully.`);
    return res.status(200).json({ message: "Course marked as incompleted." });
  } catch (error) {
    console.error("Error in marking course as incomplete:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  module.exports = {getCourseProgress,updateLectureProgress,markAsCompleted,markAsInCompleted}