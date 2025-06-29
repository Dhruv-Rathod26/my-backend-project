const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utility/async.js");
const { validatereview, loggeduser, reviewdel } = require("../middleware.js");
const Listing = require("../model/listing.js");
const ExpressError = require("../utility/ExpressError.js")
const review = require("../model/review.js");
const reviewcontroller = require("../controllers/review.js")




//review add
router.post("/", validatereview, loggeduser, wrapasync(reviewcontroller.reviewadd));

// review delete 

router.delete("/:reviewId", reviewdel, loggeduser, wrapasync(reviewcontroller.destroyreview));


module.exports = router;

