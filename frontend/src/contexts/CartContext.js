import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalPrice: action.payload.totalPrice || 0,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.items.length > 0 || state.totalItems === 0) {
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }));
    }
  }, [state.items, state.totalItems, state.totalPrice]);

  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.get();
      
      if (response.data.success) {
        const cartData = response.data.data;
        dispatch({ type: 'SET_CART', payload: cartData });
        return cartData;
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If user is not authenticated, use localStorage cart
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartData });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.addItem(productId, quantity);
      
      if (response.data.success) {
        const cartData = response.data.data;
        dispatch({ type: 'SET_CART', payload: cartData });
        toast.success('Item added to cart!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.updateItem(productId, quantity);
      
      if (response.data.success) {
        const cartData = response.data.data;
        dispatch({ type: 'SET_CART', payload: cartData });
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart item';
      toast.error(message);
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.removeItem(productId);
      
      if (response.data.success) {
        const cartData = response.data.data;
        dispatch({ type: 'SET_CART', payload: cartData });
        toast.success('Item removed from cart');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      toast.error(message);
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.clear();
      
      if (response.data.success) {
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cart');
        toast.success('Cart cleared');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      toast.error(message);
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const checkout = async (orderData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.checkout(orderData);
      
      if (response.data.success) {
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cart');
        toast.success('Order placed successfully!');
        return { success: true, order: response.data.data.order };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Checkout failed';
      toast.error(message);
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    ...state,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
