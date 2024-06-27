const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct =  asyncHandler(async (req,res) => {
    // res.json({
    //     message:"Hey it's product post route",
    // });
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name);
      }
      const updateaProduct = await Product.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      res.json(updateaProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

  const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
      const deleteaProduct = await Product.findOneAndDelete(id);
      res.json(deleteaProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

const getaProduct =  asyncHandler(async (req,res) => {
    const {id} = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProduct =  asyncHandler(async (req,res) => {
    try {
        const getallProducts = await Product.find();
        res.json(getallProducts);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createProduct, updateProduct, deleteProduct, getaProduct, getAllProduct};