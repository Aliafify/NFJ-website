const express = require("express");
const Router = express.Router();
const Account2 = require("./Account2Schema");
const uploads = require("./uploadSchema.js");
const { updatElement, fetchUser, createElement } = require("./mongoose");
var multer = require("multer");
var fs = require("fs");
const path = require("path");

const dir = path.resolve(__dirname, "./", "uploads");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // console.log(file);
    req.body.fileName= file.originalname;

    cb(null, `${file.originalname}`);
  },
});
const multerFilter = (req, file, cb) => {
  try {
    if (
      file.mimetype.split("/")[1] === "jpg" ||
      "jpeg" ||
      "png" ||
      "webp" ||
      "mp4" ||
      "avi" ||
      "webm"
    ) {
      cb(null, true);
    } else {
      cb((req.error = "Not a supported File!!"), false);
    }
  } catch (e) {
    console.log(e.message);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
//
Router.post("/upload", upload.single("file"), (req,res) => {
  try {
    console.log(req.body)
    //createElement({ name: req.files[0].filename }, uploads);
    if (req.body.type === "image") {
      updatElement(
        { email: req.body.email },
        { personalImage: req.body.origin+'/'+req.body.fileName },
        Account2
      );
    }
    if (req.body.type === "video") {
      updatElement(
        { email: req.body.email },
        { personalVideo: req.body.origin+'/'+req.body.fileName },
        Account2
      );
    }
    const link = { link: req.body.origin+'/'+req.body.fileName};
    res.status(200).send(link);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("err",error,message);
    // console.error(error);
  }
}); 
module.exports = Router;
