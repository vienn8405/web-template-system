# 📏 Spacing - Hệ thống khoảng cách

## 🎯 Mục đích

Định nghĩa hệ thống spacing nhất quán cho margin, padding, gap, và các khoảng cách khác.

---

## 📐 Spacing Scale

### Base Unit: 4px (0.25rem)

Sử dụng scale 4px để đảm bảo tất cả spacing đều chia hết cho 4, tạo sự nhất quán.

```css
/* Spacing Scale */
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-9: 2.25rem;     /* 36px */
--space-10: 2.5rem;     /* 40px */
--space-11: 2.75rem;    /* 44px */
--space-12: 3rem;       /* 48px */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-28: 7rem;       /* 112px */
--space-32: 8rem;       /* 128px */
--space-36: 9rem;       /* 144px */
--space-40: 10rem;      /* 160px */
--space-44: 11rem;      /* 176px */
--space-48: 12rem;      /* 192px */
--space-52: 13rem;      /* 208px */
--space-56: 14rem;      /* 224px */
--space-60: 15rem;      /* 240px */
--space-64: 16rem;      /* 256px */
--space-72: 18rem;      /* 288px */
--space-80: 20rem;      /* 320px */
--space-96: 24rem;      /* 384px */
```

---

## 🎨 Common Use Cases

### Component Spacing

```css
/* Extra Tight - Minimal spacing */
--spacing-xs: var(--space-1);   /* 4px - Icon + text */

/* Tight - Close elements */
--spacing-sm: var(--space-2);   /* 8px - Form labels */

/* Normal - Default spacing */
--spacing-md: var(--space-4);   /* 16px - Button padding */

/* Comfortable - Generous spacing */
--spacing-lg: var(--space-6);   /* 24px - Card padding */

/* Spacious - Large spacing */
--spacing-xl: var(--space-8);   /* 32px - Section padding */

/* Extra Spacious */
--spacing-2xl: var(--space-12); /* 48px - Section margins */

/* Huge spacing */
--spacing-3xl: var(--space-16); /* 64px - Hero sections */
```

---

## 📦 Component-Specific Spacing

### Buttons

```css
/* Button Padding */
.btn-sm {
  padding: var(--space-2) var(--space-3);  /* 8px 12px */
}

.btn-md {
  padding: var(--space-3) var(--space-4);  /* 12px 16px */
}

.btn-lg {
  padding: var(--space-4) var(--space-6);  /* 16px 24px */
}

/* Button Gap (icon + text) */
.btn-gap {
  gap: var(--space-2);  /* 8px */
}
```

### Cards

```css
/* Card Padding */
.card-sm {
  padding: var(--space-4);   /* 16px */
}

.card-md {
  padding: var(--space-6);   /* 24px */
}

.card-lg {
  padding: var(--space-8);   /* 32px */
}

/* Card Gap (between elements) */
.card-gap {
  gap: var(--space-4);       /* 16px */
}
```

### Forms

```css
/* Form Field Spacing */
.form-field {
  margin-bottom: var(--space-4);  /* 16px */
}

/* Label to Input */
.form-label {
  margin-bottom: var(--space-2);  /* 8px */
}

/* Input Padding */
.form-input {
  padding: var(--space-3) var(--space-4);  /* 12px 16px */
}

/* Form Group Gap */
.form-group {
  gap: var(--space-6);  /* 24px */
}
```

### Navigation

```css
/* Nav Item Padding */
.nav-item {
  padding: var(--space-3) var(--space-4);  /* 12px 16px */
}

/* Nav Gap */
.nav-gap {
  gap: var(--space-2);  /* 8px */
}

/* Navbar Padding */
.navbar {
  padding: var(--space-4) var(--space-6);  /* 16px 24px */
}
```

### Sections

```css
/* Section Padding (Vertical) */
.section-sm {
  padding-top: var(--space-12);     /* 48px */
  padding-bottom: var(--space-12);  /* 48px */
}

.section-md {
  padding-top: var(--space-16);     /* 64px */
  padding-bottom: var(--space-16);  /* 64px */
}

.section-lg {
  padding-top: var(--space-24);     /* 96px */
  padding-bottom: var(--space-24);  /* 96px */
}

.section-xl {
  padding-top: var(--space-32);     /* 128px */
  padding-bottom: var(--space-32);  /* 128px */
}
```

---

## 📱 Responsive Spacing

### Mobile First Approach

```css
/* Mobile (default) */
.responsive-section {
  padding: var(--space-8);  /* 32px */
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .responsive-section {
    padding: var(--space-12);  /* 48px */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .responsive-section {
    padding: var(--space-16);  /* 64px */
  }
}

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  .responsive-section {
    padding: var(--space-24);  /* 96px */
  }
}
```

---

## 🎯 Spacing Guidelines

### Vertical Rhythm

Maintain consistent vertical spacing throughout the page:

```css
/* Heading to Content */
h1, h2, h3, h4, h5, h6 {
  margin-bottom: var(--space-4);  /* 16px */
}

/* Paragraph Spacing */
p {
  margin-bottom: var(--space-4);  /* 16px */
}

/* List Spacing */
ul, ol {
  margin-bottom: var(--space-4);  /* 16px */
}

li {
  margin-bottom: var(--space-2);  /* 8px */
}

/* Section Spacing */
section {
  margin-bottom: var(--space-16);  /* 64px */
}
```

### Horizontal Spacing

```css
/* Inline Elements Gap */
.inline-gap-sm {
  gap: var(--space-2);  /* 8px */
}

.inline-gap-md {
  gap: var(--space-4);  /* 16px */
}

.inline-gap-lg {
  gap: var(--space-6);  /* 24px */
}
```

---

## 🎨 Container & Layout Spacing

### Container Padding

```css
/* Container Horizontal Padding */
.container {
  padding-left: var(--space-4);   /* 16px mobile */
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);   /* 24px tablet */
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--space-8);   /* 32px desktop */
    padding-right: var(--space-8);
  }
}
```

### Grid Gap

```css
/* Grid Gap */
.grid-gap-sm {
  gap: var(--space-4);   /* 16px */
}

.grid-gap-md {
  gap: var(--space-6);   /* 24px */
}

.grid-gap-lg {
  gap: var(--space-8);   /* 32px */
}

/* Responsive Grid Gap */
.grid-responsive {
  gap: var(--space-4);   /* 16px mobile */
}

@media (min-width: 768px) {
  .grid-responsive {
    gap: var(--space-6);   /* 24px tablet */
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    gap: var(--space-8);   /* 32px desktop */
  }
}
```

---

## 🎯 Spacing Decision Tree

### Khi nào dùng spacing nào?

**4px (space-1)**: 
- Icon + text trong button
- Badge padding
- Chip padding

**8px (space-2)**:
- Form label margin
- List item gap
- Small button padding

**12px (space-3)**:
- Input padding (vertical)
- Small card padding
- Nav item padding

**16px (space-4)**:
- Default spacing
- Button padding
- Form field margin
- Paragraph margin

**24px (space-6)**:
- Card padding
- Section element gap
- Large button padding

**32px (space-8)**:
- Section padding (mobile)
- Large card padding
- Container padding

**48px (space-12)**:
- Section padding (tablet)
- Section margin
- Hero padding

**64px (space-16)**:
- Section padding (desktop)
- Large section margin
- Hero padding (desktop)

**96px+ (space-24+)**:
- Hero sections
- Landing page sections
- Large spacing between major sections

---

## 📦 Implementation Examples

### HTML + CSS

```html
<div class="card">
  <h2 class="card-title">Card Title</h2>
  <p class="card-text">Card content goes here.</p>
  <button class="btn">Action</button>
</div>
```

```css
.card {
  padding: var(--space-6);
  gap: var(--space-4);
}

.card-title {
  margin-bottom: var(--space-2);
}

.card-text {
  margin-bottom: var(--space-4);
}

.btn {
  padding: var(--space-3) var(--space-4);
}
```

### Tailwind CSS

```html
<div class="p-6 space-y-4">
  <h2 class="mb-2">Card Title</h2>
  <p class="mb-4">Card content goes here.</p>
  <button class="px-4 py-3">Action</button>
</div>
```

---

## ♿ Accessibility Considerations

### Touch Targets

Minimum touch target size: **44px × 44px** (iOS) or **48px × 48px** (Android)

```css
/* Minimum Touch Target */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-3);  /* 12px */
}
```

### Spacing for Readability

- Adequate spacing between interactive elements
- Clear visual separation between sections
- Comfortable padding for clickable areas

---

## 🔗 Resources

- [8-Point Grid System](https://spec.fm/specifics/8-pt-grid)
- [Spacing in Design Systems](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
- [Material Design Spacing](https://material.io/design/layout/spacing-methods.html)
