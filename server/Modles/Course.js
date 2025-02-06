const mongoose = require("mongoose");

const courseModel = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true,

    },
    subTitle:{
        type:String,
       

    },
    description:{
        type:String,
        

    },
    category:{
        type:String,
      

    },
    courseLevel:{
        type:String,
        enum:["Beginner","Medium","Advance"],
        default: "Beginner",
    },
    coursePrice:{
        type:Number,
        
    },
    courseThumbnail:{
        type:String,

    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userModel"
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture",
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    isPublished:{
        type:Boolean,
        default:false,
    }





},{timestamps:true})

module.exports = mongoose.model("Course",courseModel)