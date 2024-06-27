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

// const updateProduct = asyncHandler(async (req, res) => {
//     const id = req.params;
//     validateMongoDbId(id);
//     try {
//       if (req.body.name) {
//         req.body.slug = slugify(req.body.name);
//       }
//       const updatedProduct = await Product.findOneAndUpdate({ id }, req.body, {
//         new: true,
//       });
//       res.json(updatedProduct);
//     } catch (error) {
//       throw new Error(error);
//     }
//   });

//update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Destructure id from params
    validateMongoDbId(id); // Validate if id is a valid MongoDB ObjectId
  
    try {
      const { name } = req.body;
  
      // If name is provided, update the slug
      if (name) {
        req.body.slug = slugify(name);
      }
  
      // Use findByIdAndUpdate instead of findOneAndUpdate
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      // Check if product was found and updated
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

  const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Destructure id from params
    validateMongoDbId(id); // Validate if id is a valid MongoDB ObjectId
    try {
      // Use findByIdAndDelete to delete by _id
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      // Check if product was found and deleted
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(deletedProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  

//    const deleteProduct = asyncHandler(async (req, res) => {
//     const id = req.params;
//     validateMongoDbId(id);
//     try {
//       const deletedProduct = await Product.findOneAndDelete(id);
//       res.json(deletedProduct);
//     } catch (error) {
//       throw new Error(error);
//     }
//   });

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