const express = require('express');
const path = require('path');
const fs = require('fs');
const storage = require('../data/storage');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with optional search and filter
// @access  Public
router.get('/', (req, res) => {
  try {
    const { 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Parse numeric values
    const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Search and filter products
    let products = storage.searchProducts(search, category, minPriceNum, maxPriceNum);

    // Sort products
    products.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'price') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Get categories for filter
    const categories = storage.getCategories();

    res.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(products.length / limitNum),
          totalProducts: products.length,
          hasNextPage: endIndex < products.length,
          hasPrevPage: pageNum > 1
        },
        filters: {
          categories,
          priceRange: {
            min: Math.min(...products.map(p => p.price)),
            max: Math.max(...products.map(p => p.price))
          }
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
});

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories', (req, res) => {
  try {
    const categories = storage.getCategories();
    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const product = storage.getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin only)
router.post('/', authenticateToken, requireAdmin, uploadSingle, handleUploadError, (req, res) => {
  try {
    const productData = {
      ...req.body,
      rating: 0,
      reviews: 0
    };

    // Handle uploaded image
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    // Parse specifications if it's a string
    if (typeof productData.specifications === 'string') {
      try {
        productData.specifications = JSON.parse(productData.specifications);
      } catch (e) {
        // If parsing fails, keep as string or set to empty object
        productData.specifications = {};
      }
    }

    // Parse features if it's a string
    if (typeof productData.features === 'string') {
      try {
        productData.features = JSON.parse(productData.features);
      } catch (e) {
        // If parsing fails, split by comma or set to empty array
        productData.features = productData.features ? productData.features.split(',').map(f => f.trim()) : [];
      }
    }

    const product = storage.createProduct(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Admin only)
router.put('/:id', authenticateToken, requireAdmin, uploadSingle, handleUploadError, (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle uploaded image
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
      
      // Delete old image if it exists
      const existingProduct = storage.getProductById(req.params.id);
      if (existingProduct && existingProduct.image && existingProduct.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Parse specifications if it's a string
    if (typeof updateData.specifications === 'string') {
      try {
        updateData.specifications = JSON.parse(updateData.specifications);
      } catch (e) {
        updateData.specifications = {};
      }
    }

    // Parse features if it's a string
    if (typeof updateData.features === 'string') {
      try {
        updateData.features = JSON.parse(updateData.features);
      } catch (e) {
        updateData.features = updateData.features ? updateData.features.split(',').map(f => f.trim()) : [];
      }
    }

    const product = storage.updateProduct(req.params.id, updateData);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const product = storage.deleteProduct(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
});

// @route   GET /api/products/search/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/search/suggestions', (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: { suggestions: [] }
      });
    }

    const products = storage.getAllProducts();
    const suggestions = products
      .filter(product => 
        product.name.toLowerCase().includes(q.toLowerCase()) ||
        product.category.toLowerCase().includes(q.toLowerCase())
      )
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.name,
        category: product.category
      }));

    res.json({
      success: true,
      data: { suggestions }
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching suggestions'
    });
  }
});

// @route   POST /api/products/upload-image
// @desc    Upload product image
// @access  Private (Admin only)
router.post('/upload-image', authenticateToken, requireAdmin, uploadSingle, handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading image'
    });
  }
});

module.exports = router;
