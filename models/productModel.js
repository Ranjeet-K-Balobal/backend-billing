const pool = require('../db');  // Assuming your db connection pool is in config/db.js

// Get all products
const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT * FROM product');
        return result.rows;
    } catch (err) {
        throw new Error('Error fetching products: ' + err.message);
    }
};

// Get a single product by ID
const getProductById = async (productId) => {
    try {
        const result = await pool.query('SELECT * FROM product WHERE product_id = $1', [productId]);
        return result.rows[0];  // Return the product if found
    } catch (err) {
        throw new Error('Error fetching product: ' + err.message);
    }
};

// Create a new product
const createProduct = async (productData) => {
    const { product_name, count, product_cost, sale_price, supplier_id, company_id } = productData;
    try {
        const result = await pool.query(
            `INSERT INTO product (product_name, count, product_cost, sale_price, supplier_id, company_id)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [product_name, count, product_cost, sale_price, supplier_id, company_id]
        );
        return result.rows[0]; // Return the newly created product
    } catch (err) {
        throw new Error('Error creating product: ' + err.message);
    }
};

// Update an existing product
const updateProduct = async (productId, productData) => {
    const { product_name, count, product_cost, sale_price, supplier_id, company_id } = productData;
    try {
        const result = await pool.query(
            `UPDATE product 
             SET product_name = $1, count = $2, product_cost = $3, sale_price = $4, supplier_id = $5, company_id = $6
             WHERE product_id = $7 RETURNING *`,
            [product_name, count, product_cost, sale_price, supplier_id, company_id, productId]
        );
        return result.rows[0]; // Return the updated product
    } catch (err) {
        throw new Error('Error updating product: ' + err.message);
    }
};

// Delete a product
const deleteProduct = async (productId) => {
    try {
        const result = await pool.query('DELETE FROM product WHERE product_id = $1 RETURNING *', [productId]);
        return result.rows[0]; // Return the deleted product (for confirmation)
    } catch (err) {
        throw new Error('Error deleting product: ' + err.message);
    }
};

const getProductNames = async () => {
    try {
        console.log("reached model")
        const result = await pool.query('SELECT product_name FROM product');
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching product names: ' + error.message);
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
