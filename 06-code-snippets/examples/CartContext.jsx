/**
 * Shopping Cart Context
 *
 * Complete shopping cart implementation with:
 * - Add/Remove items
 * - Update quantities
 * - Calculate totals
 * - Persist to localStorage
 * - Discount codes
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utilities/storage';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => storage.get('cart', []));
  const [discountCode, setDiscountCode] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set('cart', cart);
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setDiscountCode(null);
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Calculate discount
  const getDiscount = () => {
    if (!discountCode) return 0;

    const subtotal = getSubtotal();

    switch (discountCode.type) {
      case 'percentage':
        return subtotal * (discountCode.value / 100);
      case 'fixed':
        return Math.min(discountCode.value, subtotal);
      default:
        return 0;
    }
  };

  // Calculate tax (example: 10%)
  const getTax = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    return (subtotal - discount) * 0.1;
  };

  // Calculate total
  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const tax = getTax();
    return subtotal - discount + tax;
  };

  // Get item count
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Apply discount code
  const applyDiscount = (code) => {
    // In real app, validate with API
    const validCodes = {
      'SAVE10': { type: 'percentage', value: 10 },
      'SAVE20': { type: 'percentage', value: 20 },
      'FLAT50': { type: 'fixed', value: 50 },
    };

    if (validCodes[code]) {
      setDiscountCode({ code, ...validCodes[code] });
      return true;
    }
    return false;
  };

  // Remove discount
  const removeDiscount = () => {
    setDiscountCode(null);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscount,
    getTax,
    getTotal,
    getItemCount,
    discountCode,
    applyDiscount,
    removeDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// 1. Setup - Wrap your app with CartProvider
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <YourApp />
    </CartProvider>
  );
}

// 2. Product Card with Add to Cart
import { useCart } from './contexts/CartContext';
import { useToast } from './components/Toast';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast({
      type: 'success',
      message: `${product.name} added to cart!`
    });
  };

  return (
    <div className="border rounded-lg p-4">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}

// 3. Cart Badge (show item count)
function CartBadge() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <button className="relative">
      <ShoppingCartIcon />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {count}
        </span>
      )}
    </button>
  );
}

// 4. Cart Page
function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getDiscount,
    getTax,
    getTotal,
    discountCode,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleApplyCode = () => {
    if (applyDiscount(code)) {
      setCodeError('');
      showToast({ type: 'success', message: 'Discount applied!' });
    } else {
      setCodeError('Invalid discount code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 border rounded"
              >
                -
              </button>
              <span className="w-12 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 border rounded"
              >
                +
              </button>
            </div>

            <div className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Discount Code</h3>
        {discountCode ? (
          <div className="flex items-center justify-between">
            <span className="text-green-600">
              Code "{discountCode.code}" applied
            </span>
            <button
              onClick={removeDiscount}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={!!codeError}
              helperText={codeError}
            />
            <Button onClick={handleApplyCode}>Apply</Button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>

          {discountCode && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({discountCode.code})</span>
              <span>-${getDiscount().toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${getTax().toFixed(2)}</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
        </div>

        <Button fullWidth onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

// 5. Mini Cart Dropdown
function MiniCart() {
  const { cart, getItemCount, getTotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCartIcon />
        {getItemCount() > 0 && (
          <span className="badge">{getItemCount()}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-bold mb-4">Cart ({getItemCount()} items)</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-2">
                    <img src={item.image} className="w-12 h-12 rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <Button fullWidth onClick={() => navigate('/cart')}>
                  View Cart
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// 6. Checkout Page
function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await api.post('/orders', {
        items: cart,
        total: getTotal(),
      });

      clearCart();
      showToast({ type: 'success', message: 'Order placed successfully!' });
      navigate('/orders');
    } catch (error) {
      showToast({ type: 'error', message: 'Checkout failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {/* Shipping form, payment form, etc. */}
      <Button onClick={handleCheckout} loading={loading}>
        Place Order (${getTotal().toFixed(2)})
      </Button>
    </div>
  );
}
*/
