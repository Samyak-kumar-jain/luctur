const mongoose = require("mongoose");

const coursePurchasedSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: { 
        type: Number,  // ✅ Fixed: Changed `types:Number` to `type: Number`
        required: true // ✅ Fixed: Changed `reqired:true` to `required:true`
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    paymentId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("CoursePurchase", coursePurchasedSchema);
