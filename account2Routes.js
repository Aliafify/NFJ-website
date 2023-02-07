const express = require('express') 
const Account2 =require('./Account2Schema.js')
const Router =express.Router();
const bcrypt= require("bcryptjs");
const { fetchData, updatElement } = require('./mongoose.js');

Router.post("/register/teacher", createUser);
function createUser(req, res) {
  try {
    Account2.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (err) {
        res.send(err);
        console.log(err);
      }
      if (doc) res.send("exist");

      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new Account2({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(200);
        res.send("created");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
}   
Router.get("/getteachers", getTeachers);
async function getTeachers(req, res) {
  try {
    await fetchData((data) => res.status(201).send(data), Account2);
  } catch (err) {
    console.error(err);
  }
}
Router.post('/teacher/schedual',(req,res)=>{
  try{
     const data = req.body
     updatElement({email:data.email},{schedual:data.schedual},Account2)
     res.status(201).send('saved')
  }catch(err){
    console.error(err)
    res.send(err)
  }
})
Router.post('/teacher/update',(req,res)=>{
  try{
    const data = req.body
    updatElement({_id:data._id},data,Account2)
    res.status(201).send('saved')
  }catch(err){
    console.error(err)
    res.send(err)
  }
})
module.exports=Router