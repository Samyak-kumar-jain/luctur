const stripe = require('stripe');
const Course = require("../Modles/Course.js");
const CoursePurchase = require("../Modles/coursePurchased.js");
const User = require("../Modles/userModel.js");
const Lecture = require("../Modles/lecture.js");
const coursePurchased = require('../Modles/coursePurchased.js');

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.tokenId; // Assuming user ID is stored in the token
    const { courseId } = req.body;

    // Fetch the course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    // Create the purchase record in the database
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create a Stripe Checkout session
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // Redirect to course progress after success
      cancel_url: `http://localhost:5173/course-detail/${courseId}`, // Redirect to course detail if canceled
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    // Check if the session URL was created successfully
    if (!session.url) {
      return res.status(400).json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record with payment ID
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    // Respond with the Stripe checkout URL
    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.STRIPE_ENDPOINT_KEY;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};

const getCourseDetail = async (req, res) => {
  try {
    console.log("Received request to fetch course details"); // Log request received

    const { courseId } = req.params;
    const userId = req.tokenId;

    console.log(`Fetching course details for courseId: ${courseId} and userId: ${userId}`);

    // Fetch course details with creator and lectures populated
    const course = await Course.findById(courseId)
      .populate({
        path: "creator"
      })
      .populate({
        path: "lectures"
      });

    console.log("Course fetched:", course);

    // Fetch purchase details
    const purchase = await coursePurchased.findOne({ userId, courseId });
    console.log("Purchase details:", purchase);

    // If course is not found, return 404
    if (!course) {
      console.log("Course not found");
      return res.status(404).json({
        message: "course not found",
        success: false,
      });
    }

    // Return course details along with purchase status
    console.log("Sending course details response");
    return res.status(200).json({
      course,
      purchased: !!purchase, // Convert to boolean
    });

  } catch (error) {
    console.error("Error fetching course details:", error);
    return res.status(500).json({
      message: "Failed to fetch",
      success: false
    });
  }
};


const getAllPurchaseCourse =  async (req,res) =>{
  try {
    const purchaseCourse = await CoursePurchase.find({
      status:"completed"
    }).populate("courseId")

    if(!purchaseCourse){
      return res.status(404).json({
        message:"Nothing purchased yet",
        success:false,
        purchaseCourse:[]
      })
    }
    return res.status(200).json({
      message:"found courses",
      purchaseCourse,
      success:true
    })
  } catch (error) {
    console.log(error)
    
  }

}

const getAdminCreatedAndPurchasedCourses = async (req, res) => {
  try {
    const adminId = req.tokenId;
    console.log("Admin ID from token: ", adminId);

    // First, get courses created by the admin
    const adminCourses = await Course.find({ creator: adminId });
    console.log(`Found ${adminCourses.length} courses created by admin.`);

    if (adminCourses.length === 0) {
      console.log("No courses found for this admin.");
    }

    // Get the courseIds of admin-created courses
    const adminCourseIds = adminCourses.map(course => course._id);
    console.log("Admin course IDs: ", adminCourseIds);

    // Then, find the purchases where the courseId is from admin-created courses
    const purchasedCourses = await CoursePurchase.find({
      courseId: { $in: adminCourseIds },
      status: 'completed' // Only consider completed purchases
    }).populate("courseId") // Populate to get course details
    .populate("userId"); // Optionally populate to get user details

    console.log(`Found ${purchasedCourses.length} purchased courses.`);

    if (purchasedCourses.length === 0) {
      console.log("No purchases found for admin-created courses.");
    }

    return res.status(200).json({
      message: "found",
      success: true,
      purchasedCourses,
    });
  } catch (error) {
    console.error("Error fetching admin-created and purchased courses:", error);
    return res.status(500).json({
      message: "Error fetching purchased courses",
      success: false,
      error: error.message,
    });
  }
};


module.exports = {getAdminCreatedAndPurchasedCourses, createCheckoutSession, stripeWebhook,getCourseDetail, getAllPurchaseCourse  };
