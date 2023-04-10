const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    
    name:{type:String},
    email:{type:String,required:true,unique:true},
    username:{type:String },
    password:{type:String ,required:true },
    date:{type:Date, default:Date.now},
    phone:String,
    role:{type:String,default:"Admin"}   
});
module.exports= mongoose.model("Admin",adminSchema)
  