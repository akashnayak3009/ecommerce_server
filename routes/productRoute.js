import express from "express";
import { createProduct, deleteProduct, getAProduct, getAllProduct, updateProduct } from "../controllers/productController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post('/', authMiddleware, createProduct)

productRouter.put('/:id', authMiddleware, isAdmin, updateProduct)

productRouter.get('/:id', authMiddleware, getAProduct)
productRouter.get('/', authMiddleware, getAllProduct)

productRouter.delete('/:id', authMiddleware, isAdmin, deleteProduct)

export default productRouter;