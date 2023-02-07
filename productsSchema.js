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
  limit: Number, // in stock
  
});
module.exports = mongoose.model("Products", products);
