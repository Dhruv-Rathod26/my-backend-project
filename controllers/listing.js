const Listing = require("../model/listing.js");



module.exports.index = async (req, res) => {
    const alllist = await Listing.find();

    res.render("listing/index", { alllist });
};


module.exports.edit = async (req, res) => {

    let { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", " data does not exisit");
        res.redirect("/listing");
    } else {

        res.render("listing/edit.ejs", { list });
    }
};


module.exports.delete = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findByIdAndDelete(id);
    req.flash("sucess", " data was deleted");
    res.redirect("/listing")
};

module.exports.update = async (req, res) => {

    let { id } = req.params;
    let val = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, val);

    if (typeof req.file !== "undefined") {

        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }


    req.flash("sucess", "  Data was Updated");
    res.redirect(`/listing/${id}`)
}


module.exports.add = async (req, res) => {
    res.render("listing/new");
}

module.exports.showrout = async (req, res) => {
    let { id } = req.params;
    const list = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!list) {
        req.flash("error", " data does not exisit");
        res.redirect("/listing");
    } else {
        res.render("listing/show", { list });
    }

}

module.exports.create = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = { url, filename };
    req.flash("sucess", " new data was created");
    await listing.save();
    res.redirect("/listing")
}