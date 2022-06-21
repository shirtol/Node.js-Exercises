import {
    addProduct,
    fetchAllProducts,
    fetchProduct,
    fetchActiveProducts,
    fetchProductsByPrice,
    checkValidOperation,
    fetchProductAndUpdate,
    fetchProductAndDelete,
    handleDeletionAllProducts,
} from "../services/product.services.js";

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const savedProduct = await addProduct(product);
        res.status(201).send(savedProduct);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const getAllProducts = async (req, res) => {
    try {
        // console.log(res);
        const allProducts = await fetchAllProducts();
        res.status(200).send(allProducts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const getProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const product = await fetchProduct(_id);
        res.status(200).send(product);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const getAllActiveProducts = async (req, res) => {
    try {
        const activeProducts = await fetchActiveProducts();
        res.status(200).send(activeProducts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const getFilteredProductsByPrice = async (req, res) => {
    const { min, max } = req.query;
    try {
        const filteredProducts = await fetchProductsByPrice(min, max);
        console.log(filteredProducts);
        res.status(200).send(filteredProducts);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const updateProduct = async (req, res) => {
    const isValidOperation = checkValidOperation(req.body);
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
        const productAfterUpdate = await fetchProductAndUpdate(
            req.params.id,
            req.body
        );

        if (!productAfterUpdate) {
            return res.status(404).send("Product not found!");
        }
        res.status(200).send(productAfterUpdate);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await fetchProductAndDelete(req.params.id);

        if (!product) {
            res.status(404).send("Product not found!");
        }

        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteAllProducts = async (req, res) => {
    try {
        handleDeletionAllProducts();
        res.status(200).send("Deletion Succeed!");
    } catch (err) {
        res.status(500).send(err.message);
    }
};
