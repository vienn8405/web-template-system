# ⚙️ Tech Stacks

> Cấu hình và boilerplate cho các tech stack khác nhau

## 🎯 Mục đích

Cung cấp:
- Boilerplate configs
- Setup guides
- Best practices
- Recommended packages
- Project structure

---

## 📋 Supported Tech Stacks

### 1. **React + Next.js** (`react-nextjs/`)
- Next.js configuration
- TypeScript setup
- Tailwind CSS config
- ESLint & Prettier
- Recommended packages

### 2. **Vue + Nuxt** (`vue-nuxt/`)
- Nuxt configuration
- TypeScript setup
- Tailwind CSS config
- ESLint & Prettier
- Recommended packages

### 3. **Vanilla HTML/CSS/JS** (`vanilla/`)
- Project structure
- Build tools (optional)
- CSS organization
- JavaScript modules

### 4. **React + Vite** (`react-vite/`)
- Vite configuration
- Fast development
- Modern tooling

### 5. **Vue + Vite** (`vue-vite/`)
- Vite configuration
- Vue 3 setup
- Composition API

---

## 📁 Folder Structure

```
08-tech-stacks/
├── README.md                    # File này
├── react-nextjs/
│   ├── README.md
│   ├── setup-guide.md
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── .eslintrc.js
│   └── project-structure.md
├── vue-nuxt/
│   ├── README.md
│   ├── setup-guide.md
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── nuxt.config.ts
│   └── project-structure.md
├── vanilla/
│   ├── README.md
│   ├── setup-guide.md
│   └── project-structure.md
├── react-vite/
│   ├── README.md
│   ├── setup-guide.md
│   └── vite.config.js
└── vue-vite/
    ├── README.md
    ├── setup-guide.md
    └── vite.config.js
```

---

## 🚀 React + Next.js

### Quick Start

```bash
# Create new Next.js project
npx create-next-app@latest my-app --typescript --tailwind --app

# Install additional dependencies
npm install @heroicons/react clsx tailwind-merge
```

### Recommended Package.json

```json
{
  "name": "my-nextjs-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next": "^14.2.0",
    "@heroicons/react": "^2.1.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "^14.2.0"
  }
}
```

### Tailwind Config

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
    },
  },
  plugins: [],
}
```

### Project Structure

```
my-nextjs-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ...
├── lib/
│   ├── utils.ts
│   └── api.ts
├── public/
│   ├── images/
│   └── icons/
├── styles/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🎨 Vue + Nuxt

### Quick Start

```bash
# Create new Nuxt project
npx nuxi@latest init my-app

# Install Tailwind CSS
npm install -D @nuxtjs/tailwindcss

# Install additional dependencies
npm install @heroicons/vue
```

### Recommended Package.json

```json
{
  "name": "my-nuxt-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "nuxt": "^3.11.0",
    "@heroicons/vue": "^2.1.0"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.12.0",
    "typescript": "^5.4.0"
  }
}
```

### Nuxt Config

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'My Nuxt App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
```

### Project Structure

```
my-nuxt-app/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── ui/
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   └── ...
│   └── layout/
│       ├── Header.vue
│       ├── Footer.vue
│       └── ...
├── composables/
│   ├── useAuth.ts
│   └── useFetch.ts
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue
├── public/
├── server/
├── package.json
├── nuxt.config.ts
└── tailwind.config.js
```

---

## 🌐 Vanilla HTML/CSS/JS

### Project Structure

```
my-vanilla-app/
├── index.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── utilities.css
├── js/
│   ├── main.js
│   ├── components/
│   │   ├── navbar.js
│   │   └── modal.js
│   └── utils/
│       └── helpers.js
├── images/
├── fonts/
└── README.md
```

### Basic HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header>
    <!-- Header content -->
  </header>
  
  <main>
    <!-- Main content -->
  </main>
  
  <footer>
    <!-- Footer content -->
  </footer>
  
  <script src="js/main.js" type="module"></script>
</body>
</html>
```

### CSS Organization

```css
/* main.css */
@import url('reset.css');
@import url('variables.css');
@import url('typography.css');
@import url('components.css');
@import url('utilities.css');

/* variables.css */
:root {
  /* Colors */
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-base: 1rem;
}
```

---

## 🛠️ Development Tools

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

### ESLint Config

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier'
  ],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off'
  }
}
```

### Prettier Config

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 📦 Recommended Packages

### UI & Styling
- **Tailwind CSS**: Utility-first CSS
- **clsx**: Conditional classnames
- **tailwind-merge**: Merge Tailwind classes

### Icons
- **@heroicons/react**: Beautiful icons
- **lucide-react**: Icon library

### Forms
- **react-hook-form**: Form management
- **zod**: Schema validation

### Data Fetching
- **axios**: HTTP client
- **swr**: Data fetching hooks
- **@tanstack/react-query**: Powerful data fetching

### State Management
- **zustand**: Simple state management
- **jotai**: Atomic state management

### Utilities
- **date-fns**: Date utilities
- **lodash**: Utility functions

---

## 🔗 Related Resources

- [Code Snippets](../06-code-snippets/) - Ready-to-use code
- [Patterns](../04-patterns/) - Implementation patterns
- [Documentation](../09-documentation/) - Setup guides

---

**Note**: Chi tiết configs và setup guides sẽ được tạo trong các folders tương ứng với từng tech stack.
