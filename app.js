if (process.env.NODE_ENV != "development") {

    require('dotenv').config()

};
const dburl = process.env.ATLAS_DB;

const express = require("express");
const app = express();
const Listing = require("./model/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const user = require("./model/user.js");
const Localstatergy = require("passport-local");
const review = require("./model/review.js");

const listingroute = require("./routes/listing.js");
const reviewsroute = require("./routes/review.js");
const userroute = require("./routes/users.js");
const passport = require("passport");

const ExpressError = require("./utility/ExpressError.js");
const port = 3000;

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mo0ngo session", err);
});


const setsessionopt = {

    store,
    secret: process.env.SECRET, resave: false, saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,

    },
};

app.use(session(setsessionopt));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Localstatergy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.meassage = req.flash("sucess");
    res.locals.error = req.flash("error");
    res.locals.usserinfo = req.user;
    next();
});

const mongoose = require('mongoose');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "/public")));




main().then((res) => {
    console.log("db was connected")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(dburl);
}


app.get("/", (req, res) => {
    console.log("working");
     res.redirect("/listing")
});


app.use("/listing", listingroute);
app.use("/listing/:id/review", reviewsroute);
app.use("/", userroute);



// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listing/error", { err })
});



app.listen(port, () => {
    console.log("listning on port 3000")
});


