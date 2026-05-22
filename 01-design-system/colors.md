# 🎨 Colors - Hệ thống màu sắc

## 🎯 Mục đích

Định nghĩa bảng màu chuẩn cho tất cả các project, đảm bảo tính nhất quán và accessibility.

---

## 🌈 Color Palette

### Primary Colors (Màu chính)

Màu chính được sử dụng cho các elements quan trọng như buttons, links, highlights.

```css
/* Blue - Default Primary */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6;  /* Main primary color */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;
--primary-950: #172554;
```

**Khi nào dùng:**
- Buttons chính (CTA)
- Links
- Active states
- Focus indicators
- Brand elements

---

### Secondary Colors (Màu phụ)

Màu phụ để tạo sự đa dạng và phân cấp thông tin.

```css
/* Purple - Default Secondary */
--secondary-50: #faf5ff;
--secondary-100: #f3e8ff;
--secondary-200: #e9d5ff;
--secondary-300: #d8b4fe;
--secondary-400: #c084fc;
--secondary-500: #a855f7;  /* Main secondary color */
--secondary-600: #9333ea;
--secondary-700: #7e22ce;
--secondary-800: #6b21a8;
--secondary-900: #581c87;
--secondary-950: #3b0764;
```

**Khi nào dùng:**
- Secondary buttons
- Badges
- Tags
- Decorative elements

---

### Neutral Colors (Màu trung tính)

Màu xám cho text, backgrounds, borders.

```css
/* Gray Scale */
--neutral-50: #f9fafb;
--neutral-100: #f3f4f6;
--neutral-200: #e5e7eb;
--neutral-300: #d1d5db;
--neutral-400: #9ca3af;
--neutral-500: #6b7280;
--neutral-600: #4b5563;
--neutral-700: #374151;
--neutral-800: #1f2937;
--neutral-900: #111827;
--neutral-950: #030712;
```

**Khi nào dùng:**
- Text colors
- Backgrounds
- Borders
- Dividers
- Disabled states

---

### Semantic Colors (Màu ngữ nghĩa)

Màu cho các trạng thái và thông báo.

#### Success (Thành công)
```css
--success-50: #f0fdf4;
--success-100: #dcfce7;
--success-200: #bbf7d0;
--success-300: #86efac;
--success-400: #4ade80;
--success-500: #22c55e;  /* Main success color */
--success-600: #16a34a;
--success-700: #15803d;
--success-800: #166534;
--success-900: #14532d;
```

**Khi nào dùng:**
- Success messages
- Confirmation states
- Positive indicators
- Completed tasks

#### Warning (Cảnh báo)
```css
--warning-50: #fffbeb;
--warning-100: #fef3c7;
--warning-200: #fde68a;
--warning-300: #fcd34d;
--warning-400: #fbbf24;
--warning-500: #f59e0b;  /* Main warning color */
--warning-600: #d97706;
--warning-700: #b45309;
--warning-800: #92400e;
--warning-900: #78350f;
```

**Khi nào dùng:**
- Warning messages
- Caution states
- Pending actions
- Important notices

#### Error (Lỗi)
```css
--error-50: #fef2f2;
--error-100: #fee2e2;
--error-200: #fecaca;
--error-300: #fca5a5;
--error-400: #f87171;
--error-500: #ef4444;  /* Main error color */
--error-600: #dc2626;
--error-700: #b91c1c;
--error-800: #991b1b;
--error-900: #7f1d1d;
```

**Khi nào dùng:**
- Error messages
- Validation errors
- Destructive actions
- Critical alerts

#### Info (Thông tin)
```css
--info-50: #f0f9ff;
--info-100: #e0f2fe;
--info-200: #bae6fd;
--info-300: #7dd3fc;
--info-400: #38bdf8;
--info-500: #0ea5e9;  /* Main info color */
--info-600: #0284c7;
--info-700: #0369a1;
--info-800: #075985;
--info-900: #0c4a6e;
```

**Khi nào dùng:**
- Info messages
- Tooltips
- Help text
- Informational badges

---

## 🎨 Color Usage Guidelines

### Text Colors

```css
/* Primary text */
color: var(--neutral-900);  /* Dark mode: --neutral-50 */

/* Secondary text */
color: var(--neutral-600);  /* Dark mode: --neutral-400 */

/* Tertiary text / Placeholder */
color: var(--neutral-400);  /* Dark mode: --neutral-600 */

/* Disabled text */
color: var(--neutral-300);  /* Dark mode: --neutral-700 */
```

### Background Colors

```css
/* Page background */
background: var(--neutral-50);  /* Dark mode: --neutral-950 */

/* Card/Container background */
background: #ffffff;  /* Dark mode: --neutral-900 */

/* Hover background */
background: var(--neutral-100);  /* Dark mode: --neutral-800 */

/* Active background */
background: var(--neutral-200);  /* Dark mode: --neutral-700 */
```

### Border Colors

```css
/* Default border */
border-color: var(--neutral-200);  /* Dark mode: --neutral-800 */

/* Hover border */
border-color: var(--neutral-300);  /* Dark mode: --neutral-700 */

/* Focus border */
border-color: var(--primary-500);
```

---

## 🌓 Dark Mode Support

Mỗi màu đều có variant cho dark mode. Sử dụng CSS variables để dễ dàng switch.

```css
/* Light mode */
:root {
  --bg-primary: #ffffff;
  --text-primary: var(--neutral-900);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--neutral-900);
    --text-primary: var(--neutral-50);
  }
}

/* Or use class-based */
.dark {
  --bg-primary: var(--neutral-900);
  --text-primary: var(--neutral-50);
}
```

---

## ♿ Accessibility

### Contrast Ratios

Đảm bảo contrast ratio đạt chuẩn WCAG:

- **Normal text**: Tối thiểu 4.5:1
- **Large text** (18px+ hoặc 14px+ bold): Tối thiểu 3:1
- **UI components**: Tối thiểu 3:1

### Recommended Combinations

✅ **Good contrast:**
- `--neutral-900` on `white` (21:1)
- `--neutral-700` on `white` (12.6:1)
- `--primary-600` on `white` (7.5:1)
- `white` on `--primary-600` (7.5:1)

❌ **Poor contrast:**
- `--neutral-400` on `white` (2.8:1) - Chỉ dùng cho decorative
- `--primary-300` on `white` (2.1:1) - Không dùng cho text

---

## 🎨 Alternative Color Schemes

Bạn có thể thay đổi primary/secondary colors cho từng project:

### Scheme 1: Green & Teal
```css
--primary-500: #10b981;  /* Green */
--secondary-500: #14b8a6;  /* Teal */
```

### Scheme 2: Orange & Pink
```css
--primary-500: #f97316;  /* Orange */
--secondary-500: #ec4899;  /* Pink */
```

### Scheme 3: Indigo & Cyan
```css
--primary-500: #6366f1;  /* Indigo */
--secondary-500: #06b6d4;  /* Cyan */
```

---

## 📦 Export Formats

### CSS Variables
```css
/* Xem file: colors.css */
```

### Tailwind Config
```javascript
// Xem file: tailwind-colors.js
```

### JSON
```json
// Xem file: colors.json
```

### SCSS Variables
```scss
// Xem file: colors.scss
```

---

## 🔗 Resources

- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel tool
