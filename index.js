require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
 const cors = require('cors')
const { main } = require("./mongoose.js");
const routes1 = require("./Routes.js");
const routes2 = require("./account2Routes.js");
const routes3 = require("./account3Routes");
const Translation = require('./translationRoutes')
const appointmentsRoutes = require('./appointmentRoutes')
const registerWithAppointment = require('./loginRegister')
const productRoutes = require('./productRoutes')
// const upload = require("./upload")
var passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path")

// -----------End Of Imports
 
// --------------connect to mongoDB--------------
mongoose.set("useCreateIndex", true); //for warning
main().catch((err) => console.log(err));
// ------- End MongoDB 

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // <-- location of the react app were connecting to
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----------------Middleware------------------

app.use(
  session({
    secret: "cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
app.use("/api", routes1);
app.use("/api", routes2);
app.use("/api",routes3);
// app.use("/api",upload)
app.use('/api',appointmentsRoutes)
app.use('/api',registerWithAppointment)
app.use("/api",productRoutes);
app.use("/api",Translation);
app.use(express.static("build"));
app.use(express.static(path.resolve(__dirname, "./build")));
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "./build/index.html" 
    ),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("server runing on port" + PORT);
});
