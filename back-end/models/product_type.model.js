import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please fill product type"],
    },
    selling: {
        type: Boolean,
        default: true,
    },
});

const ProductType = mongoose.model("product_types", productTypeSchema);
export default ProductType;
