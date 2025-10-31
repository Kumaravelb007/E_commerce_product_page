import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  CreditCard,
  ArrowRight,
  Home,
  ShoppingBag
} from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // In a real app, you'd get the order from the location state or API
    // For now, we'll create a mock order
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      // Mock order for demonstration
      setOrder({
        id: 'ORD-' + Date.now(),
        totalAmount: 299.99,
        items: [
          {
            product: {
              name: 'Kumaravel Signature Smart Home Hub',
              price: 299.99,
              image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop'
            },
            quantity: 1
          }
        ],
        shippingAddress: '123 Main Street, City, State 12345',
        paymentMethod: 'credit_card',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });
    }
  }, [location.state]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase, Kumaravel!
          </p>
          <p className="text-gray-500">
            Your order #{order.id} has been successfully placed and is being processed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Package className="w-6 h-6 mr-3 text-primary-600" />
                  Order Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary-600">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Truck className="w-6 h-6 mr-3 text-blue-600" />
                  Shipping Information
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {order.shippingAddress}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                    <p className="text-gray-700">
                      3-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  Payment Information
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-700 capitalize">
                      {order.paymentMethod.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Status</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Payment Successful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Status</h3>
              
              {/* Status Timeline */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Order Confirmed</p>
                    <p className="text-sm text-gray-600">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Processing</p>
                    <p className="text-sm text-gray-500">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Shipped</p>
                    <p className="text-sm text-gray-500">1-2 business days</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Delivered</p>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Track Order
                </Link>
                
                <Link
                  to="/products"
                  className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Link>
                
                <Link
                  to="/"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </div>

              {/* Support Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Our customer support team is here to help with any questions about your order.
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
