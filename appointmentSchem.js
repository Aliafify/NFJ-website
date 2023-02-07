const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
  day:{type:String,unique:true},
   booking:[{ 
    email:String,
    time:String,
    end:String,
    note:String,
    date:{type:Date,default:new Date()},// {email:'',time:'',note:'',date:''}
    }]// for old appointments
   });
module.exports= mongoose.model("Appointment",appointment)
  