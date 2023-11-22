
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
        // Find all products
        const getAllProduct = await Product.find();
        // Return a success message with all products
        return res.status(200).json({ status: true, message: "Products fetch succesfully", getAllProduct })
    } catch (error) {
        console.log("Error fetching the all products", error);
        // Return an error message
        return res.status(500).json({ status: false, message: "Error fetching the all products" })
    }
})
//

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete();
        return res.status(200).json({
            status: true,
            Message: "Product Deleted"
        })
    } catch (error) {
        console.log('Error deleting', error);
        return res.status(500).json({
            status: false,
            message: "Failed in Deleting"
        })
    }
})