/**
 * API Utilities
 *
 * Reusable functions for making API calls
 * Includes error handling, loading states, and authentication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

/**
 * API Client with error handling
 */
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  // Build headers with auth token
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Handle API response
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || 'API request failed');
    }
    return response.json();
  }

  // GET request
  async get(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(options.headers),
      ...options,
    });
    return this.handleResponse(response);
  }

  // POST request
  async post(endpoint, data, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse(response);
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse(response);
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(options.headers),
      ...options,
    });
    return this.handleResponse(response);
  }

  // Upload file
  async upload(endpoint, file, options = {}) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = { ...options.headers };
    delete headers['Content-Type']; // Let browser set it

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
      ...options,
    });
    return this.handleResponse(response);
  }
}

// Export singleton instance
export const api = new ApiClient();

/**
 * Custom Hook for API calls with loading and error states
 */
export function useApi() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { loading, error, execute };
}

// Usage Examples:

/*
// 1. Simple GET request
import { api } from './api';

const users = await api.get('/users');

// 2. POST with data
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// 3. With query parameters
const filteredUsers = await api.get('/users?role=admin&status=active');

// 4. With custom headers
const data = await api.get('/protected', {
  headers: { 'X-Custom-Header': 'value' }
});

// 5. Upload file
const file = document.querySelector('input[type="file"]').files[0];
const result = await api.upload('/upload', file);

// 6. Using the hook in a component
function UserList() {
  const [users, setUsers] = useState([]);
  const { loading, error, execute } = useApi();

  useEffect(() => {
    execute(async () => {
      const data = await api.get('/users');
      setUsers(data);
    });
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <Alert variant="error">{error}</Alert>;

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// 7. Complete CRUD Example
function ProductManager() {
  const [products, setProducts] = useState([]);
  const { loading, error, execute } = useApi();

  // Create
  const createProduct = async (productData) => {
    await execute(async () => {
      const newProduct = await api.post('/products', productData);
      setProducts([...products, newProduct]);
      showToast({ type: 'success', message: 'Product created!' });
    });
  };

  // Read
  const fetchProducts = async () => {
    await execute(async () => {
      const data = await api.get('/products');
      setProducts(data);
    });
  };

  // Update
  const updateProduct = async (id, updates) => {
    await execute(async () => {
      const updated = await api.put(`/products/${id}`, updates);
      setProducts(products.map(p => p.id === id ? updated : p));
      showToast({ type: 'success', message: 'Product updated!' });
    });
  };

  // Delete
  const deleteProduct = async (id) => {
    await execute(async () => {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      showToast({ type: 'success', message: 'Product deleted!' });
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading && <Skeleton />}
      {error && <Alert variant="error">{error}</Alert>}

      <button onClick={() => createProduct({ name: 'New Product' })}>
        Add Product
      </button>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => updateProduct(product.id, { name: 'Updated' })}>
            Edit
          </button>
          <button onClick={() => deleteProduct(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// 8. With Error Handling
async function handleSubmit(data) {
  try {
    const result = await api.post('/submit', data);
    showToast({ type: 'success', message: 'Success!' });
    return result;
  } catch (error) {
    showToast({ type: 'error', message: error.message });
    console.error('Submit failed:', error);
  }
}

// 9. Pagination Example
function PaginatedList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, execute } = useApi();

  const fetchPage = async (pageNum) => {
    await execute(async () => {
      const response = await api.get(`/items?page=${pageNum}&limit=10`);
      setItems(response.data);
      setTotalPages(response.totalPages);
      setPage(pageNum);
    });
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  return (
    <div>
      {loading ? <Skeleton /> : (
        <>
          {items.map(item => <ItemCard key={item.id} item={item} />)}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={fetchPage}
          />
        </>
      )}
    </div>
  );
}

// 10. Search with Debounce
function SearchableList() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { loading, execute } = useApi();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        execute(async () => {
          const data = await api.get(`/search?q=${query}`);
          setResults(data);
        });
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <Skeleton />}
      {results.map(item => <SearchResult key={item.id} item={item} />)}
    </div>
  );
}
*/
