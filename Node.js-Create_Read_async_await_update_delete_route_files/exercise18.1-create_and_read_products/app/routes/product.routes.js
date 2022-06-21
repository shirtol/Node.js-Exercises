import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProduct,
    getAllActiveProducts,
    getFilteredProductsByPrice,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.post("/", createProduct);

productRouter.get("/", getAllProducts);

productRouter.get("/active", getAllActiveProducts);

productRouter.get("/filter/price", getFilteredProductsByPrice);

productRouter.get("/:id", getProduct);

//!Ex20.1:

productRouter.patch("/update/:id", updateProduct);

productRouter.delete("/delete/:id", deleteProduct);

productRouter.delete("/deleteAll", deleteAllProducts);
