const mongoose = require("mongoose");

const lectureModel = new mongoose.Schema({
    lectureTitle:{
        type:String,
        require : true,
    },
    videoUrl:{
        type:String,
    },
    publicId:{
        type:String,
        default:""
    },
        isPreviewFree:{
            type:Boolean
        }
    

},{
    timestamps:true
})

module.exports  = mongoose.model("Lecture",lectureModel);