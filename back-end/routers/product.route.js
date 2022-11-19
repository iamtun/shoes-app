import ProductController from "../controllers/product.controller.js";
import express from "express";
import uploadCloud from "../configs/cloudinary.config.js";

const router = express.Router();
router
    .route("/")
    .post(
        uploadCloud.uploadCloud.array("files", 5),
        ProductController.createProduct
    )
    .get(ProductController.getAllProduct);
router
    .route("/:id")
    .get(ProductController.getProductById)
    .put(
        uploadCloud.uploadCloud.array("files", 5),
        ProductController.updateProduct
    );

export default router;
