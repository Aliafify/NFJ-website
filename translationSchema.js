const mongoose = require("mongoose");

const translation = new mongoose.Schema({
    lang:{type:String,unique:true},
    text:{type:Object}
});
module.exports = mongoose.model("Translation", translation);
