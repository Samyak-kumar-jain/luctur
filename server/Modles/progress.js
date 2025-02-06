const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema({
    lectureId: { type: String },
    viewed: { type: Boolean }
});

const courseProgressSchema = new mongoose.Schema({
    userId: { type: String },
    courseId: { type: String },
    completed: { type: Boolean, default: false },
    lectureProgress: [lectureProgressSchema]
});

// Correct export statement
module.exports = mongoose.model("CourseProgress", courseProgressSchema);
