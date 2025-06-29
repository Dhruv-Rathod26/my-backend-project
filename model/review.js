const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,

    },
    createdAt: {
        type: Date,
        default: new Date(),

    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
});



const review = mongoose.model("review", reviewSchema);

module.exports = review;