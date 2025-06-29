const Listing = require("../model/listing.js");
const review = require("../model/review.js");
const user = require("../model/user.js");


module.exports.getsignup = (req, res) => {
  res.render("./signup/user.ejs");
}


module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let user1 = new user({ email, username });
    let data = await user.register(user1, password);
    req.login(data, (err) => {
      if (err) {
        next(err);
      } else {
        req.flash("sucess", "welcome to wonderlust");
        res.redirect("/listing");
      };
    });

  } catch (e) {
    req.flash("error", "username is already exisit");
    res.redirect("/signup");
  }

};

module.exports.login = (req, res) => {
  res.render("./signup/login.ejs");
};

module.exports.postlogin = async (req, res) => {
  let redirecturl = res.locals.redirecturl || "/listing";
  req.flash("sucess", "welcome to wonderlust");

  res.redirect(redirecturl);
}

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("sucess", "you are logout");
    res.redirect("/listing");
  });
}