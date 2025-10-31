const express = require('express');
const storage = require('../data/storage');
const { authenticateToken } = require('../middleware/auth');
const { validateCartItem } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', authenticateToken, (req, res) => {
  try {
    const cartSummary = storage.getCartSummary(req.user.id);
    
    res.json({
      success: true,
      data: cartSummary
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart'
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', authenticateToken, validateCartItem, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = storage.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Add to cart
    const cart = storage.addToCart(req.user.id, productId, quantity);
    const cartSummary = storage.getCartSummary(req.user.id);

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: cartSummary
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding item to cart'
    });
  }
});

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put('/update', authenticateToken, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be non-negative'
      });
    }

    // Check if product exists
    const product = storage.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock availability if increasing quantity
    const currentCart = storage.getCart(req.user.id);
    const currentItem = currentCart.find(item => item.productId === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;

    if (quantity > currentQuantity && product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Update cart
    const cart = storage.updateCartItem(req.user.id, productId, quantity);
    const cartSummary = storage.getCartSummary(req.user.id);

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: cartSummary
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cart'
    });
  }
});

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:productId', authenticateToken, (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = storage.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Remove from cart
    const cart = storage.removeFromCart(req.user.id, productId);
    const cartSummary = storage.getCartSummary(req.user.id);

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cartSummary
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing item from cart'
    });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete('/clear', authenticateToken, (req, res) => {
  try {
    storage.clearCart(req.user.id);

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        totalItems: 0,
        totalPrice: 0,
        items: []
      }
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing cart'
    });
  }
});

// @route   POST /api/cart/checkout
// @desc    Checkout cart and create order
// @access  Private
router.post('/checkout', authenticateToken, (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Validate required fields
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address and payment method are required'
      });
    }

    // Get cart summary
    const cartSummary = storage.getCartSummary(req.user.id);
    
    if (cartSummary.totalItems === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Check stock availability for all items
    for (const item of cartSummary.items) {
      const product = storage.getProductById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product.name}`
        });
      }
    }

    // Create order
    const orderData = {
      items: cartSummary.items,
      totalAmount: cartSummary.totalPrice,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    };

    const order = storage.createOrder(req.user.id, orderData);

    // Clear cart after successful order
    storage.clearCart(req.user.id);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during checkout'
    });
  }
});

module.exports = router;
