/**
 * Storage Utilities
 *
 * Safe localStorage/sessionStorage wrapper with JSON support
 */

export const storage = {
  /**
   * Get item from localStorage
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Check if key exists
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },
};

/**
 * Session Storage (same API as storage)
 */
export const sessionStorage = {
  get(key, defaultValue = null) {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from sessionStorage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in sessionStorage:`, error);
      return false;
    }
  },

  remove(key) {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from sessionStorage:`, error);
      return false;
    }
  },

  clear() {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  },

  has(key) {
    return window.sessionStorage.getItem(key) !== null;
  },
};

/**
 * Auth Utilities
 *
 * Authentication helper functions
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const auth = {
  /**
   * Get auth token
   */
  getToken() {
    return storage.get(TOKEN_KEY);
  },

  /**
   * Set auth token
   */
  setToken(token) {
    return storage.set(TOKEN_KEY, token);
  },

  /**
   * Remove auth token
   */
  removeToken() {
    return storage.remove(TOKEN_KEY);
  },

  /**
   * Get refresh token
   */
  getRefreshToken() {
    return storage.get(REFRESH_TOKEN_KEY);
  },

  /**
   * Set refresh token
   */
  setRefreshToken(token) {
    return storage.set(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Get current user
   */
  getUser() {
    return storage.get(USER_KEY);
  },

  /**
   * Set current user
   */
  setUser(user) {
    return storage.set(USER_KEY, user);
  },

  /**
   * Remove current user
   */
  removeUser() {
    return storage.remove(USER_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  },

  /**
   * Login - store token and user
   */
  login(token, user, refreshToken = null) {
    this.setToken(token);
    this.setUser(user);
    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
  },

  /**
   * Logout - clear all auth data
   */
  logout() {
    this.removeToken();
    this.removeUser();
    storage.remove(REFRESH_TOKEN_KEY);
  },

  /**
   * Check if user has specific role
   */
  hasRole(role) {
    const user = this.getUser();
    return user?.role === role || user?.roles?.includes(role);
  },

  /**
   * Check if user has permission
   */
  hasPermission(permission) {
    const user = this.getUser();
    return user?.permissions?.includes(permission);
  },
};

// Usage Examples:

/*
// 1. Storage - Basic Usage
import { storage } from './storage';

// Save data
storage.set('user_preferences', {
  theme: 'dark',
  language: 'en'
});

// Get data
const preferences = storage.get('user_preferences');
console.log(preferences.theme); // 'dark'

// Get with default value
const settings = storage.get('settings', { notifications: true });

// Remove data
storage.remove('user_preferences');

// Check if exists
if (storage.has('cart')) {
  const cart = storage.get('cart');
}

// Clear all
storage.clear();

// 2. Session Storage
import { sessionStorage } from './storage';

// Same API as storage, but data cleared when browser closes
sessionStorage.set('temp_data', { value: 123 });
const tempData = sessionStorage.get('temp_data');

// 3. Auth - Login Flow
import { auth } from './storage';
import { api } from './api';

async function handleLogin(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });

    // Store token and user
    auth.login(response.token, response.user, response.refreshToken);

    // Redirect to dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// 4. Auth - Logout
function handleLogout() {
  auth.logout();
  window.location.href = '/login';
}

// 5. Auth - Check Authentication
function ProtectedRoute({ children }) {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}

// 6. Auth - Get Current User
function UserProfile() {
  const user = auth.getUser();

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

// 7. Auth - Role-based Access
function AdminPanel() {
  if (!auth.hasRole('admin')) {
    return <div>Access denied</div>;
  }

  return <div>Admin content</div>;
}

// 8. Auth - Permission Check
function DeleteButton({ itemId }) {
  if (!auth.hasPermission('delete')) {
    return null;
  }

  return <button onClick={() => deleteItem(itemId)}>Delete</button>;
}

// 9. Complete Login Component
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });

      // Store auth data
      auth.login(response.token, response.user);

      // Show success message
      showToast({ type: 'success', message: 'Login successful!' });

      // Redirect
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
      showToast({ type: 'error', message: 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <Alert variant="error">{error}</Alert>}
      <Button type="submit" loading={loading}>
        Login
      </Button>
    </form>
  );
}

// 10. Auto-logout on Token Expiry
function useAuthCheck() {
  useEffect(() => {
    const checkAuth = async () => {
      if (!auth.isAuthenticated()) {
        return;
      }

      try {
        // Verify token is still valid
        await api.get('/auth/verify');
      } catch (error) {
        // Token expired or invalid
        auth.logout();
        window.location.href = '/login';
      }
    };

    // Check on mount
    checkAuth();

    // Check every 5 minutes
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
}

// 11. Shopping Cart with Storage
function useCart() {
  const [cart, setCart] = useState(() => storage.get('cart', []));

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    storage.set('cart', newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    storage.set('cart', newCart);
  };

  const clearCart = () => {
    setCart([]);
    storage.remove('cart');
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return { cart, addToCart, removeFromCart, clearCart, getTotal };
}

// 12. Remember Me Functionality
function LoginWithRememberMe() {
  const [email, setEmail] = useState(() => storage.get('remembered_email', ''));
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // ... login logic

    if (rememberMe) {
      storage.set('remembered_email', email);
    } else {
      storage.remove('remembered_email');
    }
  };

  return (
    <form>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Checkbox
        checked={rememberMe}
        onChange={setRememberMe}
        label="Remember me"
      />
      <Button onClick={handleLogin}>Login</Button>
    </form>
  );
}
*/
