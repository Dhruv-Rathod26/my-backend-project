const Listing = require("../model/listing.js");
const review = require("../model/review.js");

module.exports.reviewadd = async (req, res) => {
    let { id } = req.params;

    let list = await Listing.findById(id);

    let newrew = new review(req.body.review);
    newrew.author = req.user._id;

    list.reviews.push(newrew)
    req.flash("sucess", "  Review was added");
    await newrew.save();
    await list.save();
    res.redirect(`/listing/${id}`)
};

module.exports.destroyreview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("sucess", "  Review was deleted");
    res.redirect(`/listing/${id}`)
};