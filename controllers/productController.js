import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';

export const createProduct = asyncHandler(async (req, res) => {
    res.json({
        message:"It's Product Routes."
    })
 })
