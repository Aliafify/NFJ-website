const express = require("express");
const Account3 = require("./account3Schema.js");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const { fetchData, updatElement } = require("./mongoose");
const mongoose = require("mongoose");
const upload = require("./multer");

Router.post("/register/student", createUser);
function createUser(req, res) {
  try {
    Account3.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (err) {
        res.send(err);
        console.log(err);
      }
      if (doc) res.send("exist");

      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new Account3({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(200);
        res.send("created");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
Router.get("/Clients/get", (req, res) => {
  try {
    Account3.find({}).then((data) => res.status(200).send(data));
  } catch (err) {
    res.send(err.message);
    console.log("error whith get clients ", err.message);
  }
});
//
// update account3
Router.post("/update/client", updateClient);
function updateClient(req, res) {
  try {
    // req.body = {id:'',updated object};
    const newData = req.body.data;
    const userId = req.body.userId;
    //  console.log(newData,userId);
    updatElement({ _id: userId }, newData, Account3);
    res.status(200).send("account info updated");
  } catch (e) {
    res.send(e.message, "// Erroer while update client info.");
  }
}
// upload certification

Router.post("/upload/certification", upload, addCertification);
function addCertification(req, res) {
  console.log(req.body);
  const data = req.body;
  const userEmail = data.email;

  updatElement(
    { email: userEmail },
    { certification: { path: data.fileName } },
    Account3
  )
    .then((d) => {
      if (d) res.send({ link: data.fileName });
    })
    .catch((e) => {
      res.send("error while uploading file", e);
      console.log(e);

    });
}

module.exports = Router;
