const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
   userID:String,
   TOP:Number,
   filsses:[{
      path:String,
      type:String
   }]
});
module.exports= mongoose.model("uploads",uploadSchema)
  