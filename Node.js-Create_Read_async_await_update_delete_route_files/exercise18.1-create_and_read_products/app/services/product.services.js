import { Product } from "../models/product/product.model.js";

export const addProduct = async (product) => {
    const newProduct = new Product(product);
    return await newProduct.save();
};

export const fetchAllProducts = async () => {
    const allProducts = await Product.find();
    return allProducts;
};

export const fetchProduct = async (productId) => {
    const product = await Product.findById(productId);
    return product;
};

export const fetchActiveProducts = async () => {
    const allActiveProducts = await Product.find({ isActive: true }).exec();
    return allActiveProducts;
};

export const fetchProductsByPrice = async (min, max) => {
    const filteredProductsByPrice = await Product.find({
        "details.price": { $gte: min, $lte: max },
    });
    return filteredProductsByPrice;
};

export const checkValidOperation = (updateObj) => {
    const updated = Object.keys(updateObj);
    const allowedUpdates = ["isActive", "details.discount"];
    return updated.every((update) => allowedUpdates.includes(update));
};

export const fetchProductAndUpdate = async (productId, newFieldsObj) => {
    const product = await Product.findByIdAndUpdate(productId, newFieldsObj, {
        new: true,
        runValidators: true,
    });
    return product;
};

export const fetchProductAndDelete = async (productId) => {
    const product = await Product.findByIdAndDelete({ _id: productId });
    console.log(product);
    return product;
};

export const handleDeletionAllProducts = async () => {
    await Product.deleteMany({});
};
