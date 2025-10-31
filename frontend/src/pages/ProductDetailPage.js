import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      if (response.data.success) {
        setProduct(response.data.data.product);
        setSelectedImage(0);
        fetchRelatedProducts(response.data.data.product.category);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await productsAPI.getAll({ 
        category, 
        limit: 4,
        sortBy: 'rating',
        sortOrder: 'desc'
      });
      if (response.data.success) {
        // Filter out current product
        const related = response.data.data.products.filter(p => p.id !== id);
        setRelatedProducts(related.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product.id, quantity);
    if (result.success) {
      toast.success('Added to cart!');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // In a real app, you'd have multiple images

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
              <img
                src={images[selectedImage] || '/api/placeholder/600/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image || '/api/placeholder/80/80'}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'fill-current' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
              <p className="text-3xl font-bold text-primary-600">${product.price}</p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
              
              {/* Product Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">✓</span>
                    </span>
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200">
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">⚙</span>
                    </span>
                    Technical Specifications
                  </h4>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
                      <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Detailed Specifications</h5>
                    </div>
                    <div className="p-6">
                      <dl className="space-y-4">
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <div key={key} className={`flex justify-between items-center py-3 ${index !== Object.keys(product.specifications).length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <dt className="text-sm font-medium text-gray-600 flex-1">{key}</dt>
                            <dd className="text-sm font-semibold text-gray-900 text-right flex-1">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">ℹ</span>
                  </span>
                  Product Information
                </h4>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                    {product.brand && (
                      <div className="p-4 border-b border-r border-gray-100 sm:border-b-0 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-purple-600 text-sm font-bold">🏷</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Brand</p>
                            <p className="text-sm font-semibold text-gray-900">{product.brand}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {product.color && (
                      <div className="p-4 border-b border-r border-gray-100 sm:border-b-0 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-pink-600 text-sm font-bold">🎨</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Color</p>
                            <p className="text-sm font-semibold text-gray-900">{product.color}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {product.weight && (
                      <div className="p-4 border-b border-r border-gray-100 sm:border-b-0 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600 text-sm font-bold">⚖</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Weight</p>
                            <p className="text-sm font-semibold text-gray-900">{product.weight}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {product.material && (
                      <div className="p-4 border-b border-r border-gray-100 sm:border-b-0 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-yellow-600 text-sm font-bold">🧵</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Material</p>
                            <p className="text-sm font-semibold text-gray-900">{product.material}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {product.batteryLife && (
                      <div className="p-4 border-b border-r border-gray-100 sm:border-b-0 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-green-600 text-sm font-bold">🔋</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Battery Life</p>
                            <p className="text-sm font-semibold text-gray-900">{product.batteryLife}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {product.connectivity && (
                      <div className="p-4 border-b border-r border-gray-100 sm:border-b-0 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-indigo-600 text-sm font-bold">📶</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Connectivity</p>
                            <p className="text-sm font-semibold text-gray-900">{product.connectivity}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">Availability:</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                    <div className="flex items-center border-2 border-primary-200 rounded-lg bg-white">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4 text-primary-600" />
                      </button>
                      <span className="px-6 py-3 border-x-2 border-primary-200 min-w-[80px] text-center font-bold text-primary-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="p-3 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-primary-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </button>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-outline flex items-center justify-center py-3 border-2 border-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors duration-200">
                      <Heart className="w-5 h-5 mr-2" />
                      Add to Wishlist
                    </button>
                    <button 
                      onClick={handleShare} 
                      className="flex-1 btn-outline flex items-center justify-center py-3 border-2 border-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors duration-200"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">Why Choose TechStore?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Free Shipping</h5>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Easy Returns</h5>
                  <p className="text-xs text-gray-600">30-day return policy</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Secure Payment</h5>
                  <p className="text-xs text-gray-600">100% secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="card-hover group">
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.image || '/api/placeholder/300/300'}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-2xl font-bold text-primary-600 mb-2">${relatedProduct.price}</p>
                    <Link
                      to={`/products/${relatedProduct.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
