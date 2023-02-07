const mongoose = require('mongoose');
const link = "mongodb+srv://Ali_Afify:Alssultan@cluster0.ouc2r.mongodb.net/?retryWrites=true&w=majority"
const localLink = process.env.MONGO

async function main() {
  await mongoose.connect(localLink,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {  
      console.log("MongoDB-connected"); 
    }
  );
}

// create new element
async function createElement(object, schema1) {
  try{
    const user = await schema1.create(object);
    return await user.save();
  }catch(er){console.log(er.message)}
}

//get all elements of specific schema

function fetchData(callback, schema) {
  var userData = schema.find({});
  userData.exec(function (err, data) {
    if (err) throw err;
    return callback(data);
  });
};

//get one element according to property from specific schema
 function fetchUser(callback, property, schema) {
  try{
  var userData = schema.findOne(property);
  userData.exec(function (err, data) {
    if (err) throw err;
    return callback(data);
  }); 
}
catch(err){
  return err.message
}
}
async function newFetchUser( property, schema) {
  try{
  var userData =await schema.findOne(property);
  return userData
}
catch(err){
   console.error(err)
}
}
// --------update number of clients for partener------
// const updateAccording = async (id, add, substract) => {
//   await Partener.findOne(id).then((data) => {
//     if (add) { data.clients = data.clients + 1; }
//     if (substract & data.clients > 0) { data.clients = data.clients - 1; }
//     data.save()
//   });

// }

// Updat element of specific schema
async function updatElement(id, property, schema) {
 try{
const element = await schema.findOne(id);
  if(!element) throw `Error : element with id = ${id} doesn't exist`
  const keys = Object.keys(property);
  for (let i = 0; i < keys.length; i++) {
    element[keys[i]] = property[keys[i]]
  }
  return await element.save();
}catch(e){console.log(e)}
}
// Delete Element 
async function deleteElement(id, schema) {
  try{const element = await schema.findOne(id);
  await schema.deleteOne({ name: element.name });
  return {error:false}
} catch (err) {
  return {error:true,message:err.message}
}
}

// 

module.exports = { main, createElement, fetchData, fetchUser, updatElement,deleteElement,newFetchUser }
