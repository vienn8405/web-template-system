# 💻 React Components

> 21 production-ready React components with Tailwind CSS

## 📋 Available Components

### ✅ Forms (11 components)

1. **Button.jsx** - Versatile button component
2. **Input.jsx** - Flexible input component
3. **Card.jsx** - Card component with subcomponents
4. **Modal.jsx** - Modal dialog component
5. **Alert.jsx** - Alert/notification component
6. **Navbar.jsx** - Responsive navigation bar
7. **Select.jsx** - Dropdown select with search
8. **Checkbox.jsx** - Checkbox with groups
9. **Radio.jsx** - Radio buttons with cards
10. **Toggle.jsx** - Switch component
11. **FileUpload.jsx** - Drag & drop file upload

### ✅ Navigation (3 components)

12. **Breadcrumbs.jsx** - Navigation breadcrumbs
13. **Tabs.jsx** - Tabbed interface
14. **Pagination.jsx** - Page navigation with load more

### ✅ Feedback (4 components)

15. **Toast.jsx** - Notification toasts
16. **Tooltip.jsx** - Hover tooltips
17. **Badge.jsx** - Status badges and notifications
18. **Skeleton.jsx** - Loading placeholders

### ✅ Data Display (3 components)

19. **Avatar.jsx** - User avatars with status
20. **Accordion.jsx** - Collapsible panels
21. **Table.jsx** - Data tables with sorting/selection

---

## 🚀 Installation

### Prerequisites

```bash
# Install React and Tailwind CSS
npm install react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind Configuration

Add to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
    },
  },
  plugins: [],
}
```

### Add Animations (for Modal)

Add to your `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }

  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
}
```

---

## 📖 Usage Examples

### Button

```jsx
import { Button } from './components/Button';

function App() {
  return (
    <div className="p-8 space-y-4">
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Primary Button
      </Button>
      
      <Button variant="secondary" size="lg">
        Large Secondary
      </Button>
      
      <Button variant="outline" loading>
        Loading...
      </Button>
    </div>
  );
}
```

### Input

```jsx
import { Input } from './components/Input';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="p-8 max-w-md">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        }
      />
    </div>
  );
}
```

### Card

```jsx
import { Card } from './components/Card';

function App() {
  return (
    <div className="p-8 max-w-sm">
      <Card hoverable>
        <Card.Image
          src="https://picsum.photos/400/200"
          alt="Card image"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle>Card subtitle</Card.Subtitle>
          <p className="text-gray-600 mt-2">
            This is the card content.
          </p>
        </Card.Body>
        <Card.Footer>
          <button className="text-primary-600 hover:text-primary-700">
            Learn More
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

### Modal

```jsx
import { Modal } from './components/Modal';
import { Button } from './components/Button';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header onClose={() => setIsOpen(false)}>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the modal content.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
```

### Alert

```jsx
import { Alert } from './components/Alert';
import { useState } from 'react';

function App() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="p-8 space-y-4">
      <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
        Operation completed successfully!
      </Alert>

      <Alert variant="error" title="Error">
        There was a problem processing your request.
      </Alert>

      <Alert variant="warning" autoClose={5000}>
        This alert will close in 5 seconds.
      </Alert>
    </div>
  );
}
```

### Navbar

```jsx
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <Navbar logo="MyBrand">
        <Navbar.Link href="/" active>Home</Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/services">Services</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
        <Navbar.Button variant="primary">
          Get Started
        </Navbar.Button>
      </Navbar>

      <main className="p-8">
        {/* Your content */}
      </main>
    </>
  );
}
```

---

## 🎨 Customization

All components use Tailwind CSS classes and can be customized via:

1. **className prop** - Add custom classes
2. **Tailwind config** - Modify colors, spacing, etc.
3. **Component modification** - Edit component files directly

---

## 📚 Component Files

- `Button.jsx` - Button component
- `Input.jsx` - Input component
- `Card.jsx` - Card component
- `Modal.jsx` - Modal component
- `Alert.jsx` - Alert component
- `Navbar.jsx` - Navbar component

---

## 🔗 Related

- [Design System](../../../01-design-system/)
- [Component Specs](../../../02-components/)
- [Patterns](../../../04-patterns/)
