
import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';
import slugify from "slugify";

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
    try {
        // If the product title exists, create a slug
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        // Create a new product using the provided data
        const newProduct = await Product.create(req.body);
        // Return a success message with the new product
        return res.status(200).json({
            status: true,
            message: "Product Created",
            newProduct,
        })
    } catch (error) {
        console.log("Product Not Created");
        //", error Return an error message
        return res.status(500).json({
            status: false,
            message: "Error Occurred"
        })
    }
})

// Update an existing product
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // If the product title exists, create a slug
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        // Find the product by id and update it with the provided data
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        // Return a success message with the updated product
        return res.status(200).json({
            status: true,
            message: "Successfully Updated",
            updateProduct
        })
    } catch (error) {
        console.log("Update unsuccessfully", error);
        // Return an error message
        return res.status(500).json({
            status: false,
            message: "Error Occurred in updating"
        })
    }
})

// Get a single product by id
export const getAProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // Find the product by id
        const findProduct = await Product.findById(id);
        // Return a success message with the found product
        return res.status(200).json({
            status: true,
            message: "Product Fetched",
            findProduct,
        })
    } catch (error) {
        console.log("Fetch failed", error);
        // Return an error message
        return res.status(500).json({
            status: false,
            message: "Error Occurred in Fetching the Product"
        })
    }
})

// Get all products
export const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });


export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete();
        return res.status(200).json({
            status: true,
            Message: "Product Deleted",
             
        })
    } catch (error) {
        console.log('Error deleting', error);
        return res.status(500).json({
            status: false,
            message: "Failed in Deleting"
        })
    }
})