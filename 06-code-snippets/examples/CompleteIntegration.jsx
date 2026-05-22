/**
 * Complete Integration Example
 *
 * A full-featured Product Management App demonstrating:
 * - API integration
 * - Form validation
 * - Authentication
 * - CRUD operations
 * - State management
 * - Error handling
 * - Loading states
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { api, useApi } from '../utilities/api';
import { auth, storage } from '../utilities/storage';
import { validateEmail, validatePassword, validateRequired, useFormValidation } from '../utilities/formValidation';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Toast, ToastContainer, useToast } from '../components/Toast';
import { Skeleton } from '../components/Skeleton';
import { Alert } from '../components/Alert';

// ============================================
// 1. AUTH CONTEXT (State Management)
// ============================================

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => auth.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => auth.isAuthenticated());

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    auth.login(response.token, response.user);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    auth.login(response.token, response.user);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ============================================
// 2. LOGIN COMPONENT
// ============================================

export function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    values,
    errors: validationErrors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
  } = useFormValidation(
    { email: '', password: '' },
    {
      email: [(value) => validateEmail(value)],
      password: [(value) => validateRequired(value, 'Password')],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      showToast({ type: 'error', message: 'Please fix validation errors' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await login(values.email, values.password);
      showToast({ type: 'success', message: 'Login successful!' });
      // Redirect handled by App component
    } catch (error) {
      setErrors({ general: error.message });
      showToast({ type: 'error', message: 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

        {errors.general && (
          <Alert variant="error" className="mb-4">
            {errors.general}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email && !!validationErrors.email}
            helperText={touched.email && validationErrors.email}
          />

          <Input
            label="Password"
            type="password"
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={touched.password && !!validationErrors.password}
            helperText={touched.password && validationErrors.password}
          />

          <Button type="submit" fullWidth loading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

// ============================================
// 3. PRODUCT MANAGEMENT (CRUD)
// ============================================

export function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { loading, error, execute } = useApi();
  const { showToast } = useToast();

  // Fetch products
  const fetchProducts = async () => {
    await execute(async () => {
      const data = await api.get('/products');
      setProducts(data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create product
  const createProduct = async (productData) => {
    await execute(async () => {
      const newProduct = await api.post('/products', productData);
      setProducts([...products, newProduct]);
      showToast({ type: 'success', message: 'Product created!' });
      setIsModalOpen(false);
    });
  };

  // Update product
  const updateProduct = async (id, updates) => {
    await execute(async () => {
      const updated = await api.put(`/products/${id}`, updates);
      setProducts(products.map(p => (p.id === id ? updated : p)));
      showToast({ type: 'success', message: 'Product updated!' });
      setIsModalOpen(false);
      setEditingProduct(null);
    });
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    await execute(async () => {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      showToast({ type: 'success', message: 'Product deleted!' });
    });
  };

  // Open modal for create/edit
  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Table columns
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'stock', label: 'Stock' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, product) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(product)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(product.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => openModal()}>Add Product</Button>
      </div>

      {error && <Alert variant="error" className="mb-4">{error}</Alert>}

      {loading ? (
        <Skeleton.Table rows={5} columns={5} />
      ) : (
        <Table
          columns={columns}
          data={products}
          sortable
        />
      )}

      {/* Create/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={editingProduct ? updateProduct : createProduct}
      />
    </div>
  );
}

// ============================================
// 4. PRODUCT FORM MODAL
// ============================================

function ProductModal({ isOpen, onClose, product, onSave }) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation(
    {
      name: product?.name || '',
      price: product?.price || '',
      stock: product?.stock || '',
      description: product?.description || '',
    },
    {
      name: [(value) => validateRequired(value, 'Name')],
      price: [
        (value) => validateRequired(value, 'Price'),
        (value) => {
          const num = Number(value);
          if (isNaN(num) || num <= 0) return 'Price must be a positive number';
          return null;
        },
      ],
      stock: [
        (value) => validateRequired(value, 'Stock'),
        (value) => {
          const num = Number(value);
          if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
            return 'Stock must be a non-negative integer';
          }
          return null;
        },
      ],
    }
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);
    try {
      if (product) {
        await onSave(product.id, values);
      } else {
        await onSave(values);
      }
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>
        <Modal.Title>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />

          <Input
            label="Price"
            type="number"
            step="0.01"
            value={values.price}
            onChange={(e) => handleChange('price', e.target.value)}
            onBlur={() => handleBlur('price')}
            error={touched.price && !!errors.price}
            helperText={touched.price && errors.price}
          />

          <Input
            label="Stock"
            type="number"
            value={values.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            onBlur={() => handleBlur('stock')}
            error={touched.stock && !!errors.stock}
            helperText={touched.stock && errors.stock}
          />

          <Input
            label="Description"
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loading}>
          {product ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// ============================================
// 5. PROTECTED ROUTE
// ============================================

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return children;
}

// ============================================
// 6. MAIN APP
// ============================================

export function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" />

      <ProtectedRoute>
        <ProductManagement />
      </ProtectedRoute>
    </AuthProvider>
  );
}

// ============================================
// USAGE INSTRUCTIONS
// ============================================

/*
This example demonstrates a complete integration of:

1. **Authentication Flow**
   - Login with validation
   - Token storage
   - Protected routes
   - Auto-redirect

2. **CRUD Operations**
   - Create product
   - Read/List products
   - Update product
   - Delete product

3. **Form Validation**
   - Real-time validation
   - Error messages
   - Required fields
   - Custom validators

4. **State Management**
   - Context API for auth
   - Local state for products
   - Loading states
   - Error handling

5. **API Integration**
   - Fetch data
   - POST/PUT/DELETE
   - Error handling
   - Loading indicators

6. **UI Components**
   - Table with sorting
   - Modal for forms
   - Toast notifications
   - Skeleton loaders
   - Alerts

To use this in your project:

1. Install dependencies:
   npm install react react-dom

2. Copy all utility files:
   - api.js
   - storage.js
   - formValidation.js

3. Copy all components:
   - Button, Input, Table, Modal, Toast, Skeleton, Alert

4. Update API_BASE_URL in api.js to your backend URL

5. Implement your backend endpoints:
   - POST /auth/login
   - POST /auth/register
   - GET /products
   - POST /products
   - PUT /products/:id
   - DELETE /products/:id

6. Import and use:
   import { App } from './examples/CompleteIntegration';
   ReactDOM.render(<App />, document.getElementById('root'));
*/
