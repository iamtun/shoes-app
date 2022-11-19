import express from "express";
import ProductType from "../controllers/product_type.controller.js";

const router = express.Router();

router.route("/").post(ProductType.createProductType);
router.route("/:id").get(ProductType.getProductType);

export default router;