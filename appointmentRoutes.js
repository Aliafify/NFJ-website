const express = require("express");
const Appointment = require("./appointmentSchem.js");
const Account3 = require("./account3Schema.js");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const {
  fetchData,
  updatElement,
  createElement,
  fetchUser,
  newFetchUser,
} = require("./mongoose.js");
// newFetchUser({ day: "hh" }, Appointment).then((data) => console.log(data));
// Router.post("/new/appointment", (req, res) => {
//   try {
//     const data = req.body;
//     var emaill = data.email;

//     //    newFetchUser({email:emaill},Account3)
//     //    .then(dat=>console.log('dat',dat))
//     createElement(data, Account3).then((da) => {
//       if (da.error) {
//         newFetchUser({ email: emaill }, Account3).then((data) => {
//           if (data.error) return res.send(data.error.message);
//           else {
//             updateElement(
//               { email: data.email },
//               { booking: data },
//               Account3
//             ).then((data) => {
//               if (data.error) return res.send(data.message);
//               else {
//                 createElement(data);
//               }
//             });
//           }
//         });
//       }
//     });
//     //    fetchUser((doc)=>{
//     //        if(!doc){
//     //               console.log(data);
//     //               res.status(200).send('success');
//     //             }

//     //      else if(doc){
//     //                  console.log('doc')
//     //                 }
//     //     if(doc.date===date){console.log('equal')}
//     //     const newData = {...doc,appointments:[...doc.appointments,data.appointments]}
//     //     res.status(200).send('success');

//     // },{email:email},Account3)
//   } catch (err) {
//     res.send(err);
//     console.log(err.message);
//   }
// });
// update Appointment
function appointment (req,res){
  try{
    console.log(req.body)
  const data = req.body;
  const day = data.day
  newFetchUser({day:day},Appointment)
  .then(doc=>{
      if(!doc){
          
          createElement({...data,booking:[data]},Appointment)
          .then(dd=> {if(dd.error){res.send(dd.message)}
          else{res.status(200).send('Appointment created')}
      })
      }
      if(doc){
          updatElement({day:day},{booking:[...doc.booking,data]},Appointment)
          .then(dd=>{
              if(dd.error) return res.status(500).send(dd.message)
              if(!dd.error) return res.status(200).send('Appointment created')
          })
      }
  })
}catch(e){
  res.send(e.message)
  console.log(e.message)
}
}
Router.post("/new/appointment",appointment)
// fetch Appointments
Router.get("/get/appointments", (req, res) => {
  try {
    fetchData((data) => {
      res.status(200).send(data);
    }, Appointment);
  } catch (err) {
    res.send(err);
    console.error(err);
    console.send(err);
  }
});

function fetchU(callback, property, schema) {
  var userData = schema.findOne(property);
  userData.exec(function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

module.exports = Router;
