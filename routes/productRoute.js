import express from "express";
import { createProduct, getAProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/', createProduct)
productRouter.get('/:id', getAProduct)

export default productRouter;