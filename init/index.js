if (process.env.NODE_ENV != "development") {

  require('dotenv').config()

};





const mongoose = require('mongoose');
const Listing = require("../model/listing.js");
const initData = require("./data.js");

main().then((res) => {
  console.log("db was connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

}


const initDB = async () => {
  try {
    await Listing.deleteMany({});  // Changed from listning
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "685d95b9380e681cacd17d97" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Initialization error:", err);
  }
};
initDB();