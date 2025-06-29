// module.exports.loggeduser = (req,res,next)=>{
//      if(!req.isAuthenticated()){
//             req.flash("error","you must login first");
//             return res.redirect("/login");
//         }
//         next();
// };

const Listing = require("./model/listing.js");
const ExpressError = require("./utility/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const review = require("./model/review.js");

module.exports.loggeduser = (req, res, next) => {
  if (!req.isAuthenticated()) {   // Save original URL before redirect
    req.session.redirecturl = req.originalUrl;
    req.flash("error", "You must login first");
    return res.redirect("/login");
  }
  next();
};

module.exports.savedirect = (req, res, next) => {
  if (req.session.redirecturl) {
    res.locals.redirecturl = req.session.redirecturl;
  } next();
};

module.exports.isowner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.usserinfo._id)) {
    req.flash("error", "you are not the owner");
    return res.redirect(`/listing/${id}`);
  }
  next();
};



module.exports.validateListning = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  console.log(result);
  if (result.error) {
    throw new ExpressError(401, "field must be feel");
  }
  next();
};

module.exports.validatereview = (req, res, next) => {
  let result = reviewSchema.validate(req.body);
  console.log(result);
  if (result.error) {
    throw new ExpressError(401, "field must be feel");
  }
  next();
};

module.exports.reviewdel = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let reviews = await review.findById(reviewId);
  if (!reviews.author._id.equals(res.locals.usserinfo._id)) {
    req.flash("error", "you are not the author ");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
