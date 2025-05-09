import express from "express";

import {
    getProducts,
    createProduct,
    deleteProductById,
    updateProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

// delete product
router.delete("/:id", deleteProductById);

router.put("/:id", updateProductById);

export default router;
