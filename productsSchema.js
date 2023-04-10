const mongoose = require("mongoose");

const products = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  category: String,
  subCategory: [],//{}
  image: String,
  discription: String,
  count: Number,
  type: String,
  // limit: Number,
  // weeklyDays: [], // week days take 0 ,1,2,3,4,5,6 numbers
});
module.exports = mongoose.model("Products", products);
