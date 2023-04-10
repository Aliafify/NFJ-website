const mongoose = require("mongoose");
const account3schema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    username:{type:String },
    password:{type:String ,required:true },
    date:{type:Date, default:Date.now},
    phone:String,
    country:String,
    role:{type:String,default:"client"} ,
    package:String,
    certification:{type:Object,default:null},
    booking:{
        time:String,
        day:{type:String},
        date:{type:Date,default:new Date()},
        note:String
        },
    otp:{value:String,date:Date},
    valid:{type:Boolean,default:false}
});
//upload certification

module.exports= mongoose.model("account3",account3schema)
  