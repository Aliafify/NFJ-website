const express = require("express");
const {
  createElement,
  fetchUser,
  updatElement,
  fetchData,
  deleteElement,
} = require("./mongoose");
const Products = require("./productsSchema");
const Router = express.Router();
const { upload } = require("./multer");

Router.get("/getproducts", (req, res) => {
  try {
    fetchData((data) => {
      res.status(201).send(data);
    }, Products);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});
Router.post("/newproduct", createProduct);
 function  createProduct (req, res) { 
  try {
    const product = req.body;
    fetchUser(
      async (data) => {
        if (!data) {
          await createElement(product, Products);
          await fetchUser((data)=>res.status(201).send(data),{name:product.name},Products)
          // res.status(201).send();
        }
        if (data) {
          res.status(200).send("product exist");
        }
      }, 
      { name: product.name },
      Products
    );

    // createElement(product,Products)
    //res.status(201).send('saved')
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
} 
Router.post("/updateproduct", update);
function update(req, res) { 
  try {
    const id = req.body.id;
    const product = req.body.product;
    updatElement({ _id: id }, product, Products);
    res.status(201).send("saved");
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}
Router.post("/deleteproduct", deleteproduct);
function deleteproduct(req, res) {
  try {
    const id = req.body.id;
    console.log(id)
    deleteElement({ _id: id }, Products);
    res.status(201).send("deleted");
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}
// Router.post("/addcover", upload, (req, res) => {
//   try {
//     const product = req.body.product;
//     const path = req.files[0].filename;
//     updatElement({ name: product }, { image: path }, Products);
//     // fetchUser((data)=>{if(data.type==='single'){

//     // }},{name:product},Products)
//     res.status(201).send(path);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = Router;
