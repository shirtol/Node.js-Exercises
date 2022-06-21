import { Router } from "express";
import { productRouter } from "./product.routes.js";

export const indexRoute = Router();

indexRoute.use("/products", productRouter);
