# 🚀 Getting Started

> Hướng dẫn bắt đầu với Web Template System

---

## 📖 Giới thiệu

Web Template System là một bộ tài nguyên tổng hợp giúp bạn (và AI) xây dựng website một cách nhanh chóng, có hệ thống và chất lượng cao.

### Bạn sẽ có được gì?

✅ **Design System hoàn chỉnh** - Colors, typography, spacing, breakpoints  
✅ **Component Library** - 80+ components sẵn dùng  
✅ **Layout Templates** - Landing page, blog, dashboard, e-commerce...  
✅ **Best Practices** - Patterns và guidelines đã được kiểm chứng  
✅ **Code Snippets** - Code sẵn dùng cho nhiều tech stack  
✅ **AI-Friendly** - Được tối ưu để AI có thể sử dụng hiệu quả  

---

## 🎯 Dành cho ai?

### Developers
- Muốn xây dựng website nhanh chóng
- Cần design system nhất quán
- Muốn code chất lượng cao
- Cần reference và best practices

### AI Assistants
- Cần structure rõ ràng để tạo components
- Cần design tokens để maintain consistency
- Cần patterns để apply best practices
- Cần examples để học và reference

---

## 📋 Prerequisites

### Kiến thức cần có
- HTML, CSS, JavaScript cơ bản
- Hiểu về responsive design
- Biết sử dụng Git (optional)
- Quen với một framework (React/Vue) hoặc vanilla JS

### Tools cần cài đặt
- **Node.js** 18+ (nếu dùng framework)
- **Code Editor** (VS Code recommended)
- **Git** (optional, for version control)
- **Browser** (Chrome/Firefox/Safari)

---

## 🚀 Quick Start

### Bước 1: Khám phá Structure

```bash
web-template-system/
├── 01-design-system/      # Bắt đầu từ đây!
├── 02-components/         # Xem components có sẵn
├── 03-layouts/            # Chọn layout phù hợp
├── 04-patterns/           # Học best practices
├── 05-ai-prompts/         # (Dành cho AI)
├── 06-code-snippets/      # Copy code từ đây
├── 07-assets/             # Resources
├── 08-tech-stacks/        # Setup guides
└── 09-documentation/      # Đọc guides
```

### Bước 2: Đọc Design System

```markdown
📖 Đọc theo thứ tự:
1. 01-design-system/colors.md
2. 01-design-system/typography.md
3. 01-design-system/spacing.md
4. 01-design-system/breakpoints.md
5. 01-design-system/design-tokens.json
```

**Tại sao quan trọng?**
- Hiểu color palette và cách dùng
- Biết font sizes, weights, line heights
- Nắm spacing scale
- Hiểu responsive breakpoints
- Có design tokens để reference

### Bước 3: Browse Components

```markdown
📖 Xem components có sẵn:
1. 02-components/_component-list.md (Danh sách đầy đủ)
2. 02-components/buttons/ (Ví dụ: Buttons)
3. 02-components/forms/ (Ví dụ: Forms)
```

**Lưu ý:**
- Không cần tạo lại components đã có
- Customize components theo design của bạn
- Follow component specs

### Bước 4: Chọn Layout

```markdown
📖 Chọn layout phù hợp:
1. Landing Page → 03-layouts/landing-page/
2. Blog → 03-layouts/blog/
3. Dashboard → 03-layouts/dashboard/
4. E-commerce → 03-layouts/e-commerce/
```

### Bước 5: Setup Project

#### Option A: React + Next.js

```bash
# Create project
npx create-next-app@latest my-app --typescript --tailwind --app

# Navigate to project
cd my-app

# Install additional dependencies
npm install @heroicons/react clsx tailwind-merge

# Copy design tokens to your project
# Copy components you need from 06-code-snippets/react/

# Start development
npm run dev
```

#### Option B: Vue + Nuxt

```bash
# Create project
npx nuxi@latest init my-app

# Navigate to project
cd my-app

# Install Tailwind
npm install -D @nuxtjs/tailwindcss

# Install additional dependencies
npm install @heroicons/vue

# Copy design tokens to your project
# Copy components you need from 06-code-snippets/vue/

# Start development
npm run dev
```

#### Option C: Vanilla HTML/CSS/JS

```bash
# Create project folder
mkdir my-app
cd my-app

# Create structure
mkdir css js images

# Create files
touch index.html css/main.css js/main.js

# Copy design tokens (CSS variables)
# Copy components from 06-code-snippets/vanilla-js/

# Open in browser
open index.html
```

---

## 💡 Your First Project

### Example: Create a Simple Landing Page

#### Step 1: Setup HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <nav class="navbar">
      <div class="logo">MyBrand</div>
      <ul class="nav-menu">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <h1>Build Amazing Websites Fast</h1>
    <p>Use our template system to create beautiful, responsive websites in minutes.</p>
    <button class="btn-primary">Get Started</button>
  </section>

  <!-- Features Section -->
  <section class="features" id="features">
    <h2>Features</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>Design System</h3>
        <p>Complete design system with colors, typography, and spacing.</p>
      </div>
      <div class="feature-card">
        <h3>Components</h3>
        <p>80+ ready-to-use components for all your needs.</p>
      </div>
      <div class="feature-card">
        <h3>Responsive</h3>
        <p>Mobile-first design that works on all devices.</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; 2026 MyBrand. All rights reserved.</p>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

#### Step 2: Add Styles (Using Design System)

```css
/* css/main.css */

/* Import design tokens */
:root {
  /* Colors from design system */
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --neutral-50: #f9fafb;
  --neutral-900: #111827;
  
  /* Spacing from design system */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-16: 4rem;
  
  /* Typography from design system */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-base: 1rem;
  --text-xl: 1.5rem;
  --text-4xl: 3rem;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--neutral-900);
}

/* Header */
.header {
  background: white;
  padding: var(--space-4) var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
}

.logo {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--primary-600);
}

.nav-menu {
  display: flex;
  gap: var(--space-6);
  list-style: none;
}

.nav-menu a {
  text-decoration: none;
  color: var(--neutral-900);
  font-weight: 500;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: var(--space-16) var(--space-6);
  background: var(--neutral-50);
}

.hero h1 {
  font-size: var(--text-4xl);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.hero p {
  font-size: var(--text-xl);
  color: #6b7280;
  margin-bottom: var(--space-8);
}

/* Button (from design system) */
.btn-primary {
  background: var(--primary-600);
  color: white;
  padding: var(--space-4) var(--space-6);
  border: none;
  border-radius: 0.5rem;
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--primary-500);
}

/* Features Section */
.features {
  padding: var(--space-16) var(--space-6);
  max-width: 1280px;
  margin: 0 auto;
}

.features h2 {
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: var(--space-8);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.feature-card {
  padding: var(--space-6);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  font-size: var(--text-xl);
  margin-bottom: var(--space-4);
}

/* Footer */
.footer {
  background: var(--neutral-900);
  color: white;
  text-align: center;
  padding: var(--space-8) var(--space-6);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-menu {
    display: none; /* Add mobile menu later */
  }
  
  .hero h1 {
    font-size: 2rem;
  }
}
```

#### Step 3: Test

```bash
# Open in browser
open index.html

# Or use a local server
npx serve .
```

---

## 🎯 Next Steps

### 1. Explore More Components
```
→ 02-components/_component-list.md
→ Pick components you need
→ Copy from 06-code-snippets/
```

### 2. Learn Patterns
```
→ 04-patterns/README.md
→ Read relevant patterns
→ Apply to your project
```

### 3. Customize Design
```
→ Modify design tokens
→ Change colors, fonts
→ Adjust spacing
```

### 4. Build More Pages
```
→ Use different layouts
→ Combine components
→ Follow best practices
```

---

## 💡 Tips for Success

✅ **DO:**
- Start with design system
- Reuse existing components
- Follow patterns
- Test on multiple devices
- Keep code clean

❌ **DON'T:**
- Skip design system
- Reinvent components
- Ignore best practices
- Forget mobile users
- Write messy code

---

## 🆘 Need Help?

### Documentation
- [Folder Structure](folder-structure.md)
- [Component Guide](component-guide.md)
- [Best Practices](best-practices.md)
- [Troubleshooting](troubleshooting.md)

### Examples
- Check `09-documentation/examples/`
- See complete projects
- Learn from real code

---

## 🎉 You're Ready!

Bây giờ bạn đã sẵn sàng để:
- Xây dựng website đầu tiên
- Sử dụng design system
- Apply best practices
- Tạo ra sản phẩm chất lượng cao

**Happy coding! 🚀**
