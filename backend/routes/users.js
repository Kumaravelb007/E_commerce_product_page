const express = require('express');
const bcrypt = require('bcryptjs');
const storage = require('../data/storage');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateUserRegistration } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const { password: _, ...userWithoutPassword } = req.user;
    
    res.json({
      success: true,
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUser = storage.findUserByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Update user
    const updatedUser = storage.updateUser(userId, { name, email });
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', authenticateToken, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = bcrypt.compareSync(currentPassword, req.user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);

    // Update password
    const updatedUser = storage.updateUser(req.user.id, { password: hashedNewPassword });
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
});

// @route   GET /api/users/orders
// @desc    Get user's orders
// @access  Private
router.get('/orders', authenticateToken, (req, res) => {
  try {
    const orders = storage.getOrdersByUser(req.user.id);
    
    res.json({
      success: true,
      data: { orders }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   GET /api/users/orders/:orderId
// @desc    Get specific order details
// @access  Private
router.get('/orders/:orderId', authenticateToken, (req, res) => {
  try {
    const orders = storage.getOrdersByUser(req.user.id);
    const order = orders.find(o => o.id === req.params.orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
});

// Admin routes

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const users = storage.users.map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// @route   GET /api/users/:userId
// @desc    Get user by ID (Admin only)
// @access  Private (Admin)
router.get('/:userId', authenticateToken, requireAdmin, (req, res) => {
  try {
    const user = storage.findUserById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
});

// @route   PUT /api/users/:userId/role
// @desc    Update user role (Admin only)
// @access  Private (Admin)
router.put('/:userId/role', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"'
      });
    }

    const user = storage.updateUser(req.params.userId, { role });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user role'
    });
  }
});

// @route   GET /api/users/orders/all
// @desc    Get all orders (Admin only)
// @access  Private (Admin)
router.get('/orders/all', authenticateToken, requireAdmin, (req, res) => {
  try {
    const orders = storage.getAllOrders();
    
    res.json({
      success: true,
      data: { orders }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   PUT /api/users/orders/:orderId/status
// @desc    Update order status (Admin only)
// @access  Private (Admin)
router.put('/orders/:orderId/status', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = storage.updateOrderStatus(req.params.orderId, status);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
});

module.exports = router;
