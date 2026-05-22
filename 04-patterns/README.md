# 🎯 Patterns

> Common patterns và best practices cho web development

## 🎯 Mục đích

Tổng hợp các patterns, best practices, và solutions cho các vấn đề thường gặp trong web development.

---

## 📋 Pattern Categories

### 1. **Authentication** (`authentication.md`)
- Login/Register flows
- JWT authentication
- OAuth/Social login
- Password reset
- Email verification
- Session management
- Protected routes

### 2. **Forms & Validation** (`forms-validation.md`)
- Form structure
- Client-side validation
- Server-side validation
- Error handling
- Multi-step forms
- File uploads
- Form state management

### 3. **Data Fetching** (`data-fetching.md`)
- REST API calls
- GraphQL queries
- Loading states
- Error handling
- Caching strategies
- Pagination
- Infinite scroll

### 4. **State Management** (`state-management.md`)
- Local state
- Global state
- Context API
- Redux/Zustand patterns
- State persistence
- Optimistic updates

### 5. **Routing** (`routing.md`)
- Client-side routing
- Dynamic routes
- Nested routes
- Protected routes
- Route guards
- Query parameters
- Hash routing

### 6. **Error Handling** (`error-handling.md`)
- Error boundaries
- API error handling
- User-friendly error messages
- Error logging
- Retry mechanisms
- Fallback UI

### 7. **Performance** (`performance.md`)
- Code splitting
- Lazy loading
- Image optimization
- Caching
- Debouncing/Throttling
- Virtual scrolling
- Web vitals optimization

### 8. **SEO** (`seo.md`)
- Meta tags
- Open Graph
- Structured data
- Sitemap
- Robots.txt
- Canonical URLs
- Social sharing

### 9. **Accessibility** (`accessibility.md`)
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast
- Alt text

### 10. **Security** (`security.md`)
- XSS prevention
- CSRF protection
- Input sanitization
- Secure authentication
- HTTPS
- Content Security Policy
- Rate limiting

---

## 📁 Folder Structure

```
04-patterns/
├── README.md                    # File này
├── authentication.md
├── forms-validation.md
├── data-fetching.md
├── state-management.md
├── routing.md
├── error-handling.md
├── performance.md
├── seo.md
├── accessibility.md
├── security.md
├── responsive-design.md
├── dark-mode.md
├── internationalization.md
└── testing.md
```

---

## 🎨 Pattern Documentation Format

Mỗi pattern sẽ có:

```markdown
# Pattern Name

## Problem
What problem does this solve?

## Solution
How to implement this pattern

## Code Examples
- React/Next.js
- Vue/Nuxt
- Vanilla JS

## Best Practices
- Do's and Don'ts
- Common pitfalls
- Performance considerations

## When to Use
- Use cases
- Alternatives

## Related Patterns
Links to related patterns
```

---

## 🚀 Common Patterns Quick Reference

### Authentication Flow

```
User → Login Form → API → JWT Token → Store Token → Protected Routes
```

**Best practices:**
- Store tokens securely (httpOnly cookies preferred)
- Implement token refresh
- Handle expired tokens gracefully
- Use HTTPS only

---

### Form Validation Pattern

```
User Input → Client Validation → Submit → Server Validation → Response
```

**Best practices:**
- Validate on blur and submit
- Show inline errors
- Disable submit during processing
- Provide clear error messages

---

### Data Fetching Pattern

```
Component Mount → Show Loading → Fetch Data → Update State → Render
                                    ↓
                              Handle Error → Show Error UI
```

**Best practices:**
- Show loading states
- Handle errors gracefully
- Implement retry logic
- Cache when appropriate

---

### Error Handling Pattern

```
Error Occurs → Catch Error → Log Error → Show User-Friendly Message
                                ↓
                          Provide Recovery Action
```

**Best practices:**
- Never show technical errors to users
- Log errors for debugging
- Provide actionable error messages
- Implement error boundaries

---

## 🎯 Design Patterns

### Container/Presentational Pattern

**Container Component** (Logic)
```jsx
function UserContainer() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser().then(setUser).finally(() => setLoading(false));
  }, []);
  
  return <UserPresentation user={user} loading={loading} />;
}
```

**Presentational Component** (UI)
```jsx
function UserPresentation({ user, loading }) {
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

---

### Compound Components Pattern

```jsx
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

---

### Render Props Pattern

```jsx
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    return <UserList users={data} />;
  }}
</DataFetcher>
```

---

### Custom Hooks Pattern

```jsx
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);
  // ...
}
```

---

## 📱 Responsive Patterns

### Mobile-First CSS

```css
/* Mobile (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

---

### Responsive Navigation

```jsx
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <nav>
      {isMobile ? (
        <MobileMenu isOpen={isOpen} onToggle={setIsOpen} />
      ) : (
        <DesktopMenu />
      )}
    </nav>
  );
}
```

---

## 🔒 Security Patterns

### Input Sanitization

```javascript
// Always sanitize user input
function sanitizeInput(input) {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

### CSRF Protection

```javascript
// Include CSRF token in requests
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCsrfToken()
  },
  body: JSON.stringify(data)
});
```

---

## ⚡ Performance Patterns

### Code Splitting

```jsx
// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

### Memoization

```jsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

## ♿ Accessibility Patterns

### Focus Management

```jsx
function Modal({ isOpen, onClose }) {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);
  
  return (
    <div ref={modalRef} tabIndex={-1} role="dialog">
      {/* Modal content */}
    </div>
  );
}
```

### Keyboard Navigation

```jsx
function Menu() {
  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'ArrowDown':
        focusNextItem();
        break;
      case 'ArrowUp':
        focusPreviousItem();
        break;
      case 'Escape':
        closeMenu();
        break;
    }
  };
  
  return <div onKeyDown={handleKeyDown}>...</div>;
}
```

---

## 🔗 Related Resources

- [Components](../02-components/) - UI components
- [Layouts](../03-layouts/) - Layout templates
- [Code Snippets](../06-code-snippets/) - Implementation code
- [Documentation](../09-documentation/) - Detailed guides

---

**Note**: Chi tiết từng pattern sẽ được tạo trong các files tương ứng với code examples, best practices, và use cases cụ thể.
