# 📱 Breakpoints - Responsive Design

## 🎯 Mục đích

Định nghĩa các breakpoints chuẩn cho responsive design, đảm bảo website hoạt động tốt trên mọi thiết bị.

---

## 📐 Breakpoint Scale

### Standard Breakpoints

```css
/* Extra Small (Mobile) */
--breakpoint-xs: 0px;

/* Small (Large Mobile) */
--breakpoint-sm: 640px;

/* Medium (Tablet) */
--breakpoint-md: 768px;

/* Large (Desktop) */
--breakpoint-lg: 1024px;

/* Extra Large (Large Desktop) */
--breakpoint-xl: 1280px;

/* 2XL (Extra Large Desktop) */
--breakpoint-2xl: 1536px;
```

---

## 📱 Device Categories

### Mobile Devices

```css
/* Mobile Portrait (320px - 639px) */
@media (min-width: 0px) and (max-width: 639px) {
  /* Mobile styles */
}

/* Mobile Landscape (640px - 767px) */
@media (min-width: 640px) and (max-width: 767px) {
  /* Large mobile styles */
}
```

**Common devices:**
- iPhone SE: 375px
- iPhone 12/13/14: 390px
- iPhone 14 Pro Max: 430px
- Samsung Galaxy S21: 360px

### Tablet Devices

```css
/* Tablet Portrait (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet styles */
}

/* Tablet Landscape (1024px - 1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
  /* Tablet landscape / Small desktop */
}
```

**Common devices:**
- iPad Mini: 768px
- iPad Air: 820px
- iPad Pro 11": 834px
- iPad Pro 12.9": 1024px

### Desktop Devices

```css
/* Desktop (1280px - 1535px) */
@media (min-width: 1280px) and (max-width: 1535px) {
  /* Desktop styles */
}

/* Large Desktop (1536px+) */
@media (min-width: 1536px) {
  /* Large desktop styles */
}
```

**Common resolutions:**
- Laptop: 1366px, 1440px, 1920px
- Desktop: 1920px, 2560px
- 4K: 3840px

---

## 🎨 Mobile-First Approach

### Recommended Strategy

Luôn bắt đầu với mobile, sau đó mở rộng lên các màn hình lớn hơn.

```css
/* Base styles (Mobile) */
.container {
  padding: 1rem;
  font-size: 1rem;
}

/* Small devices (640px+) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }
}

/* Medium devices (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Large devices (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: 2.5rem;
  }
}

/* Extra large devices (1280px+) */
@media (min-width: 1280px) {
  .container {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
```

---

## 📊 Container Max Widths

### Responsive Containers

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Small (640px+) */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

/* Medium (768px+) */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

/* Large (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

/* Extra Large (1280px+) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* 2XL (1536px+) */
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

---

## 🎯 Common Responsive Patterns

### Grid Columns

```css
/* Mobile: 1 column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Large Desktop: 4 columns */
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Navigation

```css
/* Mobile: Hamburger menu */
.nav {
  display: flex;
  flex-direction: column;
}

.nav-toggle {
  display: block;
}

.nav-menu {
  display: none;
}

.nav-menu.active {
  display: flex;
  flex-direction: column;
}

/* Desktop: Horizontal menu */
@media (min-width: 1024px) {
  .nav {
    flex-direction: row;
    align-items: center;
  }
  
  .nav-toggle {
    display: none;
  }
  
  .nav-menu {
    display: flex;
    flex-direction: row;
  }
}
```

### Typography

```css
/* Mobile */
.heading {
  font-size: 2rem;
  line-height: 1.2;
}

/* Tablet */
@media (min-width: 768px) {
  .heading {
    font-size: 2.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .heading {
    font-size: 3rem;
    line-height: 1.1;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .heading {
    font-size: 3.75rem;
  }
}
```

### Spacing

```css
/* Mobile */
.section {
  padding: 2rem 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .section {
    padding: 3rem 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .section {
    padding: 4rem 2rem;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .section {
    padding: 6rem 3rem;
  }
}
```

---

## 🎨 Tailwind CSS Breakpoints

### Tailwind Syntax

```html
<!-- Mobile first -->
<div class="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

<!-- Grid columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <!-- Grid items -->
</div>

<!-- Padding -->
<div class="p-4 md:p-6 lg:p-8 xl:p-12">
  Responsive padding
</div>

<!-- Hide/Show -->
<div class="hidden md:block">
  Hidden on mobile, visible on tablet+
</div>

<div class="block md:hidden">
  Visible on mobile, hidden on tablet+
</div>
```

---

## 📱 Orientation Queries

### Portrait vs Landscape

```css
/* Portrait orientation */
@media (orientation: portrait) {
  .hero {
    height: 100vh;
  }
}

/* Landscape orientation */
@media (orientation: landscape) {
  .hero {
    height: 80vh;
  }
}
```

---

## 🎯 Custom Breakpoints

### When to Add Custom Breakpoints

Thêm custom breakpoints khi:
- Design có yêu cầu đặc biệt
- Content bị break ở một width cụ thể
- Cần optimize cho một device cụ thể

```css
/* Custom breakpoint for specific content */
@media (min-width: 900px) {
  .special-layout {
    /* Custom styles */
  }
}
```

---

## 🔍 Testing Breakpoints

### Common Test Resolutions

**Mobile:**
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 390px (iPhone 14)
- 414px (iPhone Plus)
- 360px (Android)

**Tablet:**
- 768px (iPad Portrait)
- 1024px (iPad Landscape)
- 820px (iPad Air)

**Desktop:**
- 1280px (Laptop)
- 1366px (Common laptop)
- 1440px (MacBook Pro)
- 1920px (Full HD)
- 2560px (2K)

---

## 📦 Implementation Examples

### React/Next.js

```jsx
// Using CSS Modules
import styles from './Component.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Responsive Heading</h1>
    </div>
  );
}
```

```css
/* Component.module.css */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

.heading {
  font-size: 2rem;
}

@media (min-width: 1024px) {
  .heading {
    font-size: 3rem;
  }
}
```

### Tailwind CSS

```jsx
function Component() {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">
        Responsive Heading
      </h1>
    </div>
  );
}
```

### Vanilla CSS

```html
<div class="responsive-container">
  <h1 class="responsive-heading">Responsive Heading</h1>
</div>
```

```css
.responsive-container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .responsive-container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .responsive-container {
    padding: 3rem;
  }
}
```

---

## ♿ Accessibility Considerations

### Touch Targets

```css
/* Minimum 44px touch target on mobile */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1rem;
}

/* Can be smaller on desktop with mouse */
@media (min-width: 1024px) {
  .button {
    min-height: 36px;
    min-width: 36px;
    padding: 0.5rem 0.75rem;
  }
}
```

### Font Sizes

```css
/* Minimum 16px on mobile to prevent zoom */
body {
  font-size: 16px;
}

/* Can adjust on larger screens */
@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }
}
```

---

## 🔗 Resources

- [MDN: Using Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Am I Responsive?](https://ui.dev/amiresponsive)
- [Tailwind Breakpoints](https://tailwindcss.com/docs/responsive-design)
