const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');

// In-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Validation middleware
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  
  if (!name || !description || !price || !category) {
    throw new ValidationError('Missing required fields');
  }

  if (typeof price !== 'number' || price < 0) {
    throw new ValidationError('Price must be a positive number');
  }

  if (typeof inStock !== 'boolean') {
    throw new ValidationError('inStock must be a boolean');
  }

  next();
};

// GET all products with filtering and pagination
router.get('/', (req, res) => {
  let filteredProducts = [...products];
  const { category, page = 1, limit = 10 } = req.query;
  
  // Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    total: filteredProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginatedProducts
  });
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    throw new NotFoundError('Product not found');
  }
  res.json(product);
});

// POST new product
router.post('/', validateProduct, (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    throw new NotFoundError('Product not found');
  }

  products[index] = {
    ...products[index],
    ...req.body,
    id: req.params.id
  };

  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    throw new NotFoundError('Product not found');
  }

  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// GET product statistics
router.get('/stats/categories', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  res.json(stats);
});

// Search products by name
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    throw new ValidationError('Search query is required');
  }

  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(q.toLowerCase())
  );

  res.json(searchResults);
});

module.exports = router; 