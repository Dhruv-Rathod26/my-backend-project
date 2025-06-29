const express = require("express");
const router = express.Router();
const wrapasync = require("../utility/async.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../model/listing.js");
const ExpressError = require("../utility/ExpressError.js");
const { loggeduser, isowner, validateListning } = require("../middleware.js")
const listingcontroler = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudeconfig.js")
const upload = multer({ storage });


router.route("/")
  // index rout  
  .get(wrapasync(listingcontroler.index))
  //create
  .post(validateListning, upload.single('listing[image]'), loggeduser, wrapasync(listingcontroler.create));


// add
router.get("/new", loggeduser, wrapasync(listingcontroler.add));


router.route("/:id")

  //delete rout
  .delete(loggeduser, isowner, wrapasync(listingcontroler.delete))

  // update rout
  .put(upload.single('listing[image]'), loggeduser, isowner, wrapasync(listingcontroler.update))

  // show rout
  .get(wrapasync(listingcontroler.showrout));


// edit 
router.get("/:id/edit", loggeduser, isowner, wrapasync(listingcontroler.edit));



module.exports = router;