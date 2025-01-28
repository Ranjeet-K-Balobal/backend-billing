const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for product CRUD operations
router.get('/products', productController.getAllProducts);  // Get all products
router.get('/products/:id', productController.getProductById);  // Get product by ID
router.post('/products', productController.createProduct);  // Create a new product
router.put('/products/:id', productController.updateProduct);  // Update product by ID
router.delete('/products/:id', productController.deleteProduct);  // Delete product by ID

module.exports = router;
