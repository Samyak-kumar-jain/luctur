const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Failed to connect to the database. Error:", error.message);
    }
};

module.exports = connectToDb;
