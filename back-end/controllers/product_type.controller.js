import ProductType from "../models/product_type.model.js";
import Base from "./utils/base.controller.js";

const createProductType = Base.createOne(ProductType);
const getProductType = Base.getOne(ProductType);

export default { createProductType, getProductType };
