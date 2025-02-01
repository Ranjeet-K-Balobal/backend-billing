const productModel = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await productModel.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await productModel.createProduct(productData);
        res.status(201).json(newProduct);  
        console.log("products inserted")// Return the newly created product
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const productData = req.body;
    try {
        const updatedProduct = await productModel.updateProduct(productId, productData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const deletedProduct = await productModel.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProductNames = async (req, res) => {
    try {
        console.log("controlller")
        const productNames = await productModel.getProductNames();
        res.status(200).json(productNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductNames
};
