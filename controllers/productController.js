import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';

export const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        return res.status(200).json({
            status: true,
            message: "Product Created",
            newProduct,
        })
    } catch (error) {
        console.log("Product Not Created", error);
        return res.status(500).json({
            status: false,
            message: "Error Occurred"
        })
    }
})

export const getAProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        return res.status(200).json({
            status: true,
            message: "Product Fetched",
            findProduct,
        })
    } catch (error) {
        console.log("Fetch failed", error);
        return res.status(500).json({
            status: false,
            message: "Error Occurred in Fetching the Product"
        })
    }
})