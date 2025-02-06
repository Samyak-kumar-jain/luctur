const express = require('express');
const {isAuthenticated} = require("../MIddlewares/isAuthenticated.js");
const { createCheckoutSession, stripeWebhook, getCourseDetail, getAllPurchaseCourse, getAdminCreatedAndPurchasedCourses } = require("../Controllers/purchaseController.js");

const router = express.Router();

router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);

router.post("/webhook", express.raw({ type: 'application/json' }), stripeWebhook);
router.get("/course/:courseId/course-status",isAuthenticated,getCourseDetail)
router.get("/get-all-purchase-course",isAuthenticated, getAllPurchaseCourse)
router.get("/get-purchase-course-admin",isAuthenticated, getAdminCreatedAndPurchasedCourses)

module.exports = router;
