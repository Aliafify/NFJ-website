const mongoose = require("mongoose");

const Accounttwo = new mongoose.Schema({  
    name:{type:String},
    email:{type:String,required:true},
    username:{type:String},
    password:{type:String ,required:true },
    date:{type:Date, default:Date.now},
    phone:String,
    country:{type:String},
    role:{type:String,default:"worker"},
    schedual:{}  ,
    personalImage:String,
    personalVideo:String,
    active:{type:Boolean,default:false}
}
    );
module.exports= mongoose.model("Account2",Accounttwo)
      