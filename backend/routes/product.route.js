// filepath: /d:/Coding Projects/Comp3006 Full Stack Development/Comp3006-Mern-Full-Stack/backend/routes/product.route.js
import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;