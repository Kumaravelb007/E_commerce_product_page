import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, totalItems, totalPrice, updateCartItem, removeFromCart, clearCart, checkout, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: '',
    paymentMethod: 'credit_card'
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch cart from server if user is authenticated
      // This will be handled by the CartContext
    }
  }, [isAuthenticated]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      return;
    }

    if (totalItems === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setShowCheckoutForm(true);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkoutData.shippingAddress.trim()) {
      toast.error('Please enter shipping address');
      return;
    }

    setIsCheckingOut(true);
    const result = await checkout(checkoutData);
    
    if (result.success) {
      setShowCheckoutForm(false);
      setCheckoutData({ shippingAddress: '', paymentMethod: 'credit_card' });
      // Navigate to order confirmation page
      navigate('/order-confirmation', { 
        state: { order: result.order } 
      });
    }
    
    setIsCheckingOut(false);
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.productId} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product?.image || '/api/placeholder/100/100'}
                          alt={item.product?.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.product?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.product?.category}
                        </p>
                        <p className="text-lg font-semibold text-primary-600">
                          ${item.product?.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={isLoading}
                          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={isLoading}
                          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.product?.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          disabled={isLoading}
                          className="text-sm text-red-600 hover:text-red-700 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-primary-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-green-600" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-600" />
                  Secure payment processing
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading || totalItems === 0}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="w-full btn-outline mt-3 flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Checkout Modal */}
        {showCheckoutForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Order</h2>
                <p className="text-gray-600">Secure checkout for your {totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
              </div>
              
              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600 text-xs font-bold">📍</span>
                      </span>
                      Shipping Address
                    </span>
                  </label>
                  <textarea
                    value={checkoutData.shippingAddress}
                    onChange={(e) => setCheckoutData({ ...checkoutData, shippingAddress: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors duration-200"
                    rows="4"
                    placeholder="Enter your complete shipping address including street, city, state, and postal code"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs font-bold">💳</span>
                      </span>
                      Payment Method
                    </span>
                  </label>
                  <select
                    value={checkoutData.paymentMethod}
                    onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors duration-200"
                  >
                    <option value="credit_card">💳 Credit Card</option>
                    <option value="debit_card">💳 Debit Card</option>
                    <option value="paypal">🅿️ PayPal</option>
                  </select>
                </div>

                {/* Order Summary in Modal */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-primary-600">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isCheckingOut ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Place Order - $${totalPrice.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
