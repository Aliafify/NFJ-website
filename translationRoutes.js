const express = require("express");

const {
  createElement,
  fetchUser,
  updatElement,
  fetchData,
  deleteElement,
} = require("./mongoose");

const Translation = require("./translationSchema");

const Router = express.Router();

Router.post("/save/translation", async (req, res) => {
  const text = req.body.text;
  const js = JSON.stringify(text);
  const lang = req.body.lang;
  let doc = await Translation.findOne({ lang });
  const unjs = JSON.parse(js);
  if (doc) {
    const oldText = JSON.parse(doc.text);
    const totalText = { ...oldText, ...text };
    updatElement(
      { lang },
      { text: JSON.stringify(totalText) },
      Translation
    ).then((d) => res.status(200).send("translation updated"));
  } else if (!doc) {
    createElement({ lang: lang, text: js }, Translation);
  }
});
Router.get("/get/translation", async (req, res) => {
  await Translation.find({})
    .then((doc) => {
      if (doc.length) {
        res.status(200).send(doc[0].text);
      } else if (!doc.length) {
        res.status(200).send(null);
      }
    })
    .catch((e) => {
      res.send(e.message);
    });
});
// const test = { ss: "hh" };
// Translation.find({}).then(doc=>console.log(typeof(JSON.parse(doc[0].text))))
// console.log()

module.exports = Router;
