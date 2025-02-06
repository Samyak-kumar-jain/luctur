require('dotenv').config();
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectToDb = require("./Config/db.js");
const userRouter = require("./Routes/AuthRoute.js")
const courseRouter = require("./Routes/CourseRoute.js")
const mediaRouter = require("./Routes/mediaRoute.js")
const paymentGatewayRouter = require("./Routes/purchaseCourseRoute.js")
const progressRoute  = require("./Routes/progressRoute.js")
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    credentials: true,   
}))

const port = process.env.PORT || 5000;

// Connect to the database
console.log("🔄 Attempting to connect to the database...");
connectToDb();


app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/media",mediaRouter);
app.use("/api/purchase",paymentGatewayRouter);
app.use("/api/progress", progressRoute)
app.listen(port, () => {
    console.log(`🚀 Server is up and running on port ${port}`);
});



 