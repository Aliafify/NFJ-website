const Admin = require("./adminSchema.js");
const Account2 = require("./Account2Schema.js");
const Account3 = require("./account3Schema.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      Admin.findOne({ email: username }).then((user) => {
        //console.log("user")
        if (!user) {
          Account2.findOne({ email: username }).then((user) => {
            if (user) {
              bcrypt.compare(password, user.password, (err, result) => {
                //if (err) throw err;
                if (result === true) {
                  return done(null, user);
                }
              });
            } else {
              Account3.findOne({ email: username }).then((user) => {
                //console.log("user")
                bcrypt.compare(password, user.password, (err, result) => {
                  if (err) throw err;
                  //console.log(result)
                  if (result === true) {
                    return done(null, user);
                  } else {
                    return done(null, false);
                  }
                });
              });
            }
          });
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      });
    })
  );
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    Account2.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        user: user,
      };
      if (user) {
        cb(err, userInformation);
      }
    });
    Admin.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        user: user,
      };
      if (user) {
        cb(err, userInformation);
      }
    });
    Account3.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        user: user,
      };
      if (user) {
        cb(err, userInformation);
      }
    });
  });
};
