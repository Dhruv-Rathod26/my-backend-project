const express = require("express");
const router = express.Router();
const wrapasync = require("../utility/async.js");
const { savedirect } = require("../middleware.js")


const user = require("../model/user.js");
const passport = require("passport");
const usercontroller = require("../controllers/user.js")


router.route("/signup")

  //signup get
  .get(usercontroller.getsignup)

  // signup post
  .post(wrapasync(usercontroller.signup));


router.route("/login")

  // get login
  .get(usercontroller.login)

  // post login
  .post(savedirect, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), usercontroller.postlogin);


// log out
router.get("/logout", usercontroller.logout);

module.exports = router;