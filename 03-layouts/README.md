# 📐 Layouts

> Layout templates cho các loại trang web phổ biến

## 🎯 Mục đích

Cung cấp các layout templates có sẵn để nhanh chóng xây dựng các loại trang web khác nhau.

---

## 📋 Available Layouts

### 1. **Landing Page** (`landing-page/`)
- Hero section
- Features section
- Testimonials
- Pricing
- CTA sections
- Footer

**Use cases**: Product launches, marketing campaigns, lead generation

### 2. **Blog** (`blog/`)
- Blog listing page
- Blog post detail
- Sidebar layout
- Author page
- Category/Tag pages

**Use cases**: Blogs, news sites, content marketing

### 3. **Portfolio** (`portfolio/`)
- Portfolio grid
- Project detail page
- About page
- Contact page

**Use cases**: Personal portfolios, agency websites, creative showcases

### 4. **Dashboard** (`dashboard/`)
- Admin dashboard
- Sidebar navigation
- Stats cards
- Data tables
- Charts

**Use cases**: Admin panels, SaaS dashboards, analytics

### 5. **E-commerce** (`e-commerce/`)
- Product listing
- Product detail
- Shopping cart
- Checkout flow
- Order confirmation

**Use cases**: Online stores, marketplaces

### 6. **Documentation** (`documentation/`)
- Docs sidebar
- Content area
- Table of contents
- Search

**Use cases**: Technical docs, knowledge bases, help centers

### 7. **Authentication** (`authentication/`)
- Login page
- Register page
- Forgot password
- Reset password
- Email verification

**Use cases**: User authentication flows

### 8. **Profile** (`profile/`)
- User profile
- Settings page
- Edit profile
- Activity feed

**Use cases**: User accounts, social features

---

## 📁 Folder Structure

```
03-layouts/
├── README.md                    # File này
├── landing-page/
│   ├── README.md
│   ├── hero-section.md
│   ├── features-section.md
│   ├── testimonials-section.md
│   ├── pricing-section.md
│   ├── cta-section.md
│   └── wireframe.png
├── blog/
│   ├── README.md
│   ├── blog-listing.md
│   ├── blog-post.md
│   ├── sidebar.md
│   └── wireframe.png
├── portfolio/
├── dashboard/
├── e-commerce/
├── documentation/
├── authentication/
└── profile/
```

---

## 🎨 Layout Principles

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Fluid layouts that adapt to screen size

### Grid System
- 12-column grid for flexibility
- Consistent gutters (16px mobile, 24px desktop)
- Max-width containers (1280px default)

### Spacing
- Consistent vertical rhythm
- Section padding: 48px (mobile) to 96px (desktop)
- Component spacing: 16px to 32px

### Typography Hierarchy
- Clear heading hierarchy (H1-H6)
- Readable line lengths (50-75 characters)
- Adequate line height (1.5-1.6 for body text)

---

## 📝 Layout Documentation Format

Mỗi layout sẽ có:

```markdown
# Layout Name

## Overview
Brief description and use cases

## Structure
- Section 1
- Section 2
- ...

## Wireframe
Visual representation

## Components Used
List of components from 02-components/

## Responsive Behavior
How layout adapts to different screens

## Code Examples
- React/Next.js
- Vue/Nuxt
- HTML/CSS

## Best Practices
- SEO considerations
- Performance tips
- Accessibility notes
```

---

## 🎯 Common Layout Patterns

### Header Patterns

**Fixed Header**
```
┌─────────────────────────┐
│ Logo    Nav    CTA      │ ← Always visible
├─────────────────────────┤
│                         │
│      Content            │
│                         │
```

**Sticky Header**
```
┌─────────────────────────┐
│ Logo    Nav    CTA      │ ← Sticky on scroll
├─────────────────────────┤
│                         │
│      Content            │
```

**Hero Header**
```
┌─────────────────────────┐
│                         │
│   Large Hero Section    │
│   with Background       │
│                         │
├─────────────────────────┤
│      Content            │
```

### Content Patterns

**Single Column**
```
┌─────────────────────────┐
│                         │
│      Full Width         │
│      Content            │
│                         │
└─────────────────────────┘
```

**Two Column (Sidebar)**
```
┌──────────┬──────────────┐
│          │              │
│ Sidebar  │   Content    │
│          │              │
└──────────┴──────────────┘
```

**Three Column**
```
┌────┬──────────────┬────┐
│Side│   Content    │Side│
└────┴──────────────┴────┘
```

**Grid Layout**
```
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │
├─────┼─────┼─────┼─────┤
│  5  │  6  │  7  │  8  │
└─────┴─────┴─────┴─────┘
```

### Footer Patterns

**Simple Footer**
```
┌─────────────────────────┐
│  Links  |  Social       │
│  © 2026 Company         │
└─────────────────────────┘
```

**Multi-Column Footer**
```
┌─────────────────────────┐
│ Col1  Col2  Col3  Col4  │
│                         │
│  © 2026 Company         │
└─────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Chọn layout phù hợp
Xem danh sách layouts ở trên

### 2. Đọc documentation
Mỗi layout có README.md chi tiết

### 3. Xem wireframe
Visual reference cho layout structure

### 4. Sử dụng components
Kết hợp components từ `02-components/`

### 5. Customize
Điều chỉnh theo design của project

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- Single column layouts
- Stacked sections
- Hamburger menu
- Full-width components

### Tablet (640px - 1023px)
- 2-column layouts
- Sidebar can be toggled
- Larger touch targets

### Desktop (1024px+)
- Multi-column layouts
- Sidebar always visible
- Hover states
- More content density

---

## ♿ Accessibility

### Semantic HTML
```html
<header>
  <nav>...</nav>
</header>

<main>
  <article>...</article>
  <aside>...</aside>
</main>

<footer>...</footer>
```

### Skip Links
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### Landmark Regions
- Use proper HTML5 semantic elements
- ARIA landmarks when needed
- Clear heading hierarchy

---

## 🎨 Layout Examples

### Landing Page Structure
```
Header (Fixed/Sticky)
├── Hero Section (Full viewport)
├── Features Section
├── How It Works
├── Testimonials
├── Pricing
├── FAQ
├── CTA Section
└── Footer
```

### Blog Structure
```
Header
├── Blog Listing
│   ├── Featured Post
│   ├── Post Grid (3 columns)
│   └── Pagination
├── Sidebar
│   ├── Search
│   ├── Categories
│   ├── Recent Posts
│   └── Tags
└── Footer
```

### Dashboard Structure
```
Sidebar (Fixed)
├── Top Bar
│   ├── Search
│   ├── Notifications
│   └── User Menu
├── Main Content
│   ├── Page Header
│   ├── Stats Cards (Grid)
│   ├── Charts
│   └── Data Table
└── Footer (Optional)
```

---

## 🔗 Related Resources

- [Components](../02-components/) - UI components
- [Patterns](../04-patterns/) - Common patterns
- [Design System](../01-design-system/) - Design tokens
- [Code Snippets](../06-code-snippets/) - Implementation code

---

**Note**: Chi tiết từng layout sẽ được tạo trong các folders tương ứng với wireframes, component lists, và code examples.
