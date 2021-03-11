const dotenv = require("dotenv");
const db = require("../config/database");
const ProductModel = require("../models/productModel");
const products = require("../data/product");
// const { connect } = require("mongoose");

dotenv.config({ path: "backend/config/config.env" });

db();

const seedProducts = async () => {
  try {
    await ProductModel.deleteMany();
    console.log("Products are deleted");
    await ProductModel.insertMany(products);
    console.log("All Products are added");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

seedProducts();
