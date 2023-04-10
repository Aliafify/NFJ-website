const express = require("express");
const Router = express.Router();
const Admin = require("./adminSchema.js");
const Account2 = require("./Account2Schema.js");
const Account3 = require("./account3Schema.js");
const Appointment = require("./appointmentSchem.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {
  fetchData,
  fetchUser,
  newFetchUser,
  createElement,
  updatElement,
} = require("./mongoose.js");

//email sender module
const email = require('./email');

//
// Function to generate OTP
function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
//---------------- end points----------------

Router.post("/appointment", registerClient);
function registerClient(req, res) {
  const data = req.body;
  Account3.findOne({ email: data.email }, async (err, doc) => {
    try {
      if (err) {
        res.send(err.message);
      } 
      if (err) throw err;
      if (doc) {
        // res.send("this email already has an account please login to create appointment or use another email");
        throw "This email already has an account please login to create an appointment or use another email";
      }
      if (!doc) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new Account3({ ...data, password:hashedPassword });
        await newUser.save().then((data)=>{
            if(data){
                const otp = generateOTP();
                const message = `<p> please use this number to activate your account <br/>${otp}</p>`
                email(data.email,'<h1>NFJ-Activation-OTP</h1>',message)
                updatElement({_id:data.id},{otp:{value:otp,date:Date.now()}},Account3)
                res.status(200).json({state:"user created",user:{user:data,auth:false,state:'activate'}});
                // res.send(data)
            }
        })

      }
    } catch (e) {
      console.log(e);
      res.json({state:"This email already has an account please login to create an appointment or use another email"});
    }
  });
}

//
//----------appointment----------
function appointment(req, res) {
  const data = req.body;
  const day = data.day;
  newFetchUser({ day: day }, Appointment).then((doc) => {
    if (!doc) {
      createElement({ ...data, booking: [data] }, Appointment).then((dd) => {
        if (dd.error) {
          res.send(dd.message);
        } else {
          res.status(200).send("Appointment created");
        }
      }); 
    }
    if (doc) {
      updatElement(
        { day: day },
        { booking: [...doc.booking, data] },
        Appointment
      ).then((dd) => {
        if (dd.error) return res.status(500).send(dd.message);
        if (!dd.error) return res.status(200).send("Appointment created");
      });
    }
  });  
}
// updatElement({_id:"63e16361b733ae2ab4983cff"},{valid:true},Account3).then(data=>console.log('ddd',data))
Router.post("/activate", activate);
function activate(req, res) {
  try {
    // console.log(req.body)
    const otp = req.body.otp;  
    const id = req.body.id;
    //   updatElement({_id:id},{otp:{value}})
    fetchUser((d)=>{ 
      if (d) {
        const savedOtp = d.otp.value;
        if (parseInt(otp) === parseInt(savedOtp)) {
          updatElement({_id:id},{valid:true}, Account3).then(
            (data) => {
              res.status(200).send({state:"user activated",user:{user:data,auth:true,state:null}})
            }
          );
        }
      }
    },{_id:id},Account3)
  
  } catch (e) {
    console.log("otp error:", e.message);
    res.send(e.message);
  }
}

// resend otp 
 Router.post('/resend/otp',(req,res)=>{
     console.log(req.body)
     const id=req.body.id;

     Account3.findOne({_id:id})
     .then(data=>{
      const otp = generateOTP();
      const message = `<p> please use this number to activate your account <br/>${otp}</p>`
      email(data.email,'<h1>NFJ-Activation-OTP</h1>',message).then(drata=>console.log(drata))
      updatElement({_id:id},{otp:{value:otp,date:Date.now()}},Account3)
      res.status(200).send("new code sent to your email ");
     })
     .catch((err)=>{
      res.send('error happend while sending to your email')
      console.log(err.message)
     })
 })
module.exports = Router;
