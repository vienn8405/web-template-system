# ✍️ Typography - Hệ thống chữ

## 🎯 Mục đích

Định nghĩa hệ thống typography nhất quán cho tất cả các project, đảm bảo readability và hierarchy rõ ràng.

---

## 🔤 Font Families

### Primary Font (Sans-serif)

Font chính cho UI, headings, và body text.

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
             'Droid Sans', 'Helvetica Neue', sans-serif;
```

**Alternatives:**
- **Inter** - Modern, clean, excellent readability
- **Poppins** - Geometric, friendly
- **Nunito** - Rounded, approachable
- **Work Sans** - Professional, versatile

### Secondary Font (Serif)

Font cho headings đặc biệt hoặc content dài.

```css
--font-serif: 'Merriweather', 'Georgia', 'Cambria', 
              'Times New Roman', 'Times', serif;
```

**Alternatives:**
- **Merriweather** - Elegant, readable
- **Playfair Display** - Luxurious, editorial
- **Lora** - Balanced, modern serif

### Monospace Font

Font cho code, technical content.

```css
--font-mono: 'Fira Code', 'JetBrains Mono', 'Consolas', 
             'Monaco', 'Courier New', monospace;
```

**Alternatives:**
- **Fira Code** - With ligatures
- **JetBrains Mono** - Optimized for developers
- **Source Code Pro** - Clean, professional

---

## 📏 Font Sizes

### Scale System (Modular Scale 1.250 - Major Third)

```css
/* Extra Small */
--text-xs: 0.75rem;    /* 12px */

/* Small */
--text-sm: 0.875rem;   /* 14px */

/* Base */
--text-base: 1rem;     /* 16px */

/* Medium */
--text-md: 1.125rem;   /* 18px */

/* Large */
--text-lg: 1.25rem;    /* 20px */

/* Extra Large */
--text-xl: 1.5rem;     /* 24px */

/* 2XL */
--text-2xl: 1.875rem;  /* 30px */

/* 3XL */
--text-3xl: 2.25rem;   /* 36px */

/* 4XL */
--text-4xl: 3rem;      /* 48px */

/* 5XL */
--text-5xl: 3.75rem;   /* 60px */

/* 6XL */
--text-6xl: 4.5rem;    /* 72px */

/* 7XL */
--text-7xl: 6rem;      /* 96px */
```

---

## 🎨 Font Weights

```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

**Recommended weights:**
- **Body text**: 400 (normal)
- **Emphasis**: 500 (medium) hoặc 600 (semibold)
- **Headings**: 600 (semibold) hoặc 700 (bold)
- **Strong emphasis**: 700 (bold) hoặc 800 (extrabold)

---

## 📐 Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

**Guidelines:**
- **Headings**: 1.2 - 1.3 (tight to snug)
- **Body text**: 1.5 - 1.6 (normal to relaxed)
- **Small text**: 1.4 - 1.5
- **Large text**: 1.3 - 1.4

---

## 📊 Letter Spacing (Tracking)

```css
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

**Guidelines:**
- **Large headings**: -0.02em to -0.05em (tighter)
- **Body text**: 0 (normal)
- **Small text**: 0.01em to 0.02em (slightly wider)
- **Uppercase text**: 0.05em to 0.1em (wider)

---

## 📝 Typography Styles

### Headings

```css
/* H1 - Hero Heading */
.h1 {
  font-size: var(--text-5xl);      /* 60px */
  font-weight: var(--font-bold);   /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  letter-spacing: var(--tracking-tight); /* -0.025em */
}

/* H2 - Section Heading */
.h2 {
  font-size: var(--text-4xl);      /* 48px */
  font-weight: var(--font-bold);   /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  letter-spacing: var(--tracking-tight); /* -0.025em */
}

/* H3 - Subsection Heading */
.h3 {
  font-size: var(--text-3xl);      /* 36px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-snug); /* 1.375 */
}

/* H4 - Card/Component Heading */
.h4 {
  font-size: var(--text-2xl);      /* 30px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-snug); /* 1.375 */
}

/* H5 - Small Heading */
.h5 {
  font-size: var(--text-xl);       /* 24px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-normal); /* 1.5 */
}

/* H6 - Tiny Heading */
.h6 {
  font-size: var(--text-lg);       /* 20px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-normal); /* 1.5 */
}
```

### Body Text

```css
/* Body Large */
.body-lg {
  font-size: var(--text-lg);       /* 20px */
  font-weight: var(--font-normal); /* 400 */
  line-height: var(--leading-relaxed); /* 1.625 */
}

/* Body Base (Default) */
.body-base {
  font-size: var(--text-base);     /* 16px */
  font-weight: var(--font-normal); /* 400 */
  line-height: var(--leading-normal); /* 1.5 */
}

/* Body Small */
.body-sm {
  font-size: var(--text-sm);       /* 14px */
  font-weight: var(--font-normal); /* 400 */
  line-height: var(--leading-normal); /* 1.5 */
}

/* Body Extra Small */
.body-xs {
  font-size: var(--text-xs);       /* 12px */
  font-weight: var(--font-normal); /* 400 */
  line-height: var(--leading-normal); /* 1.5 */
}
```

### Special Styles

```css
/* Lead Text (Intro paragraph) */
.lead {
  font-size: var(--text-xl);       /* 24px */
  font-weight: var(--font-light);  /* 300 */
  line-height: var(--leading-relaxed); /* 1.625 */
  color: var(--neutral-600);
}

/* Caption */
.caption {
  font-size: var(--text-sm);       /* 14px */
  font-weight: var(--font-normal); /* 400 */
  line-height: var(--leading-normal); /* 1.5 */
  color: var(--neutral-500);
}

/* Overline (Label) */
.overline {
  font-size: var(--text-xs);       /* 12px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-normal); /* 1.5 */
  letter-spacing: var(--tracking-wider); /* 0.05em */
  text-transform: uppercase;
  color: var(--neutral-500);
}

/* Code Inline */
.code-inline {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 0.125rem 0.25rem;
  background: var(--neutral-100);
  border-radius: 0.25rem;
  color: var(--primary-600);
}

/* Blockquote */
.blockquote {
  font-size: var(--text-lg);       /* 20px */
  font-weight: var(--font-normal); /* 400 */
  font-style: italic;
  line-height: var(--leading-relaxed); /* 1.625 */
  border-left: 4px solid var(--primary-500);
  padding-left: 1.5rem;
  color: var(--neutral-700);
}
```

---

## 📱 Responsive Typography

### Mobile First Approach

```css
/* Mobile (default) */
.responsive-h1 {
  font-size: var(--text-3xl);  /* 36px */
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .responsive-h1 {
    font-size: var(--text-4xl);  /* 48px */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .responsive-h1 {
    font-size: var(--text-5xl);  /* 60px */
  }
}
```

### Fluid Typography (Clamp)

```css
/* Scales smoothly between viewport sizes */
.fluid-h1 {
  font-size: clamp(2.25rem, 5vw, 4.5rem);
  /* Min: 36px, Preferred: 5vw, Max: 72px */
}

.fluid-body {
  font-size: clamp(1rem, 2vw, 1.125rem);
  /* Min: 16px, Preferred: 2vw, Max: 18px */
}
```

---

## ♿ Accessibility Guidelines

### Minimum Font Sizes
- **Body text**: Không nhỏ hơn 16px (1rem)
- **Small text**: Không nhỏ hơn 14px (0.875rem)
- **Legal/Fine print**: Tối thiểu 12px (0.75rem)

### Line Length
- **Optimal**: 50-75 characters per line
- **Maximum**: 90 characters per line
- Use `max-width: 65ch` for long-form content

### Contrast
- Đảm bảo text có contrast ratio tối thiểu 4.5:1 với background
- Large text (18px+ hoặc 14px+ bold): Tối thiểu 3:1

---

## 🎨 Typography Pairings

### Pairing 1: Inter + Merriweather
```css
--font-sans: 'Inter', sans-serif;      /* UI, headings */
--font-serif: 'Merriweather', serif;   /* Long-form content */
```

### Pairing 2: Poppins + Lora
```css
--font-sans: 'Poppins', sans-serif;    /* Modern, friendly */
--font-serif: 'Lora', serif;           /* Elegant content */
```

### Pairing 3: Work Sans + Playfair Display
```css
--font-sans: 'Work Sans', sans-serif;  /* Clean UI */
--font-serif: 'Playfair Display', serif; /* Luxurious headings */
```

---

## 📦 Implementation Examples

### HTML
```html
<h1 class="h1">Main Heading</h1>
<p class="lead">Introduction paragraph with larger text.</p>
<p class="body-base">Regular body text goes here.</p>
<p class="caption">Small caption or helper text.</p>
```

### CSS
```css
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--neutral-900);
}
```

### Tailwind CSS
```html
<h1 class="text-5xl font-bold leading-tight tracking-tight">
  Main Heading
</h1>
<p class="text-xl font-light leading-relaxed text-neutral-600">
  Introduction paragraph
</p>
```

---

## 🔗 Resources

- [Google Fonts](https://fonts.google.com/)
- [Font Pair](https://fontpair.co/) - Font pairing suggestions
- [Type Scale](https://type-scale.com/) - Typography scale calculator
- [Modular Scale](https://www.modularscale.com/)
- [Practical Typography](https://practicaltypography.com/)
