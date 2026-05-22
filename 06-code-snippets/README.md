# 💻 Code Snippets

> Code snippets sẵn dùng cho các tech stack khác nhau

## 🎯 Mục đích

Cung cấp code snippets có thể copy-paste ngay cho:
- Components UI
- Utilities functions
- Hooks/Composables
- Layouts
- Patterns implementation

---

## 📋 Tech Stack Support

### 1. **React + Next.js** (`react/`)
- React components
- Custom hooks
- Next.js pages
- API routes
- Server components

### 2. **Vue + Nuxt** (`vue/`)
- Vue components
- Composables
- Nuxt pages
- Plugins
- Middleware

### 3. **Vanilla JS** (`vanilla-js/`)
- Plain JavaScript
- Web Components
- DOM manipulation
- Event handlers

### 4. **CSS/SCSS** (`css/`)
- CSS utilities
- SCSS mixins
- Animations
- Responsive helpers

### 5. **Tailwind CSS** (`tailwind/`)
- Tailwind components
- Custom utilities
- Plugins
- Config examples

### 6. **Utilities** (`utilities/`)
- Helper functions
- Validators
- Formatters
- API clients
- Storage helpers

---

## 📁 Folder Structure

```
06-code-snippets/
├── README.md                    # File này
├── react/
│   ├── README.md
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useFetch.js
│   │   └── ...
│   └── utils/
│       └── ...
├── vue/
│   ├── README.md
│   ├── components/
│   ├── composables/
│   └── utils/
├── vanilla-js/
│   ├── README.md
│   ├── components/
│   └── utils/
├── css/
│   ├── README.md
│   ├── utilities.css
│   ├── animations.css
│   └── mixins.scss
├── tailwind/
│   ├── README.md
│   ├── components/
│   └── tailwind.config.js
└── utilities/
    ├── README.md
    ├── validation.js
    ├── formatting.js
    ├── api-client.js
    └── storage.js
```

---

## 🎨 Snippet Categories

### Components
Ready-to-use UI components:
- Buttons (all variants)
- Forms (inputs, selects, checkboxes, etc.)
- Navigation (navbar, sidebar, tabs, etc.)
- Cards
- Modals
- Alerts
- Tables
- And more...

### Hooks/Composables
Reusable logic:
- `useLocalStorage` - Persist state to localStorage
- `useFetch` - Data fetching with loading/error states
- `useDebounce` - Debounce values
- `useMediaQuery` - Responsive breakpoints
- `useClickOutside` - Detect clicks outside element
- `useForm` - Form state management
- And more...

### Utilities
Helper functions:
- Validation (email, phone, URL, etc.)
- Formatting (date, currency, number, etc.)
- String manipulation
- Array helpers
- Object helpers
- API client
- Storage helpers
- And more...

### Layouts
Page layouts:
- Landing page
- Blog layout
- Dashboard layout
- Authentication pages
- Profile pages
- And more...

### Patterns
Implementation of common patterns:
- Authentication flow
- Form validation
- Data fetching
- Error handling
- Pagination
- Infinite scroll
- And more...

---

## 🚀 How to Use

### 1. Choose Your Tech Stack
Navigate to the appropriate folder:
- React → `react/`
- Vue → `vue/`
- Vanilla JS → `vanilla-js/`
- CSS → `css/`
- Tailwind → `tailwind/`

### 2. Find the Component/Utility
Browse the category folders to find what you need.

### 3. Copy the Code
Copy the code snippet to your project.

### 4. Customize
Adjust colors, sizes, and behavior to match your design.

### 5. Import Dependencies
Install any required dependencies mentioned in the snippet.

---

## 📝 Snippet Format

Each snippet file includes:

```markdown
# Component/Utility Name

## Description
Brief description of what it does

## Dependencies
- dependency-1
- dependency-2

## Installation
```bash
npm install dependency-1 dependency-2
```

## Code
```jsx
// Full code here
```

## Props/Parameters
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |

## Usage Example
```jsx
// Usage example
```

## Notes
- Important notes
- Gotchas
- Browser support
```

---

## 💡 Quick Examples

### React Button Component

```jsx
// react/components/Button.jsx
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };
  
  return (
    <button 
      className={`
        font-semibold rounded-lg transition-colors
        ${variants[variant]}
        ${sizes[size]}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Custom Hook - useLocalStorage

```javascript
// react/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}
```

### Utility - Email Validation

```javascript
// utilities/validation.js
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPhone(phone) {
  const regex = /^[\d\s\-\+\(\)]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### CSS Utility Classes

```css
/* css/utilities.css */

/* Flexbox utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

/* Spacing utilities */
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-4 { margin: 1rem; }

.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }

/* Text utilities */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-normal { font-weight: 400; }

/* Display utilities */
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

/* Responsive utilities */
@media (min-width: 768px) {
  .md\:hidden { display: none; }
  .md\:block { display: block; }
  .md\:flex { display: flex; }
}
```

---

## 🎯 Best Practices

### When Using Snippets

✅ **DO:**
- Read the entire snippet before using
- Check dependencies
- Understand the code
- Customize to your needs
- Test thoroughly
- Follow your project's conventions

❌ **DON'T:**
- Blindly copy-paste without understanding
- Ignore dependencies
- Skip testing
- Use outdated snippets
- Mix different coding styles

---

## 🔄 Keeping Snippets Updated

### Version Information
Each snippet includes:
- Last updated date
- Compatible versions
- Breaking changes (if any)

### Updating Snippets
When updating:
1. Test with latest dependencies
2. Update version info
3. Note breaking changes
4. Update examples

---

## 🔗 Related Resources

- [Components](../02-components/) - Component documentation
- [Patterns](../04-patterns/) - Implementation patterns
- [Design System](../01-design-system/) - Design tokens
- [Tech Stacks](../08-tech-stacks/) - Tech stack configs

---

**Note**: Chi tiết code snippets sẽ được tạo trong các folders tương ứng với từng tech stack. Mỗi snippet đều được test và ready to use.
