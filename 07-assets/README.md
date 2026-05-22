# 🎨 Assets

> Thư viện assets và resources cho web projects

## 🎯 Mục đích

Cung cấp và tổ chức:
- Icons library
- Image placeholders
- Fonts
- Design resources
- Media assets

---

## 📋 Asset Categories

### 1. **Icons** (`icons/`)
- Icon libraries recommendations
- Custom icon sets
- Icon usage guidelines
- SVG optimization tips

### 2. **Images** (`images/`)
- Placeholder images
- Image optimization guides
- Responsive images
- WebP/AVIF support

### 3. **Fonts** (`fonts/`)
- Recommended font pairings
- Font loading strategies
- Web font optimization
- Variable fonts

### 4. **Illustrations** (`illustrations/`)
- Illustration resources
- SVG illustrations
- Animation-ready assets

### 5. **Logos** (`logos/`)
- Logo guidelines
- Logo variations
- Logo usage rules
- File formats

---

## 📁 Folder Structure

```
07-assets/
├── README.md                    # File này
├── icons/
│   ├── README.md
│   ├── icon-libraries.md
│   ├── custom-icons/
│   └── usage-guide.md
├── images/
│   ├── README.md
│   ├── placeholders/
│   ├── optimization-guide.md
│   └── responsive-images.md
├── fonts/
│   ├── README.md
│   ├── font-pairings.md
│   ├── loading-strategies.md
│   └── web-fonts/
├── illustrations/
│   ├── README.md
│   └── resources.md
└── logos/
    ├── README.md
    └── guidelines.md
```

---

## 🎨 Icon Libraries

### Recommended Icon Libraries

#### 1. **Heroicons** (Recommended)
- **URL**: https://heroicons.com/
- **Style**: Outline & Solid
- **Format**: SVG, React, Vue
- **License**: MIT
- **Best for**: Modern web apps, clean design

#### 2. **Lucide Icons**
- **URL**: https://lucide.dev/
- **Style**: Outline
- **Format**: SVG, React, Vue, Angular
- **License**: ISC
- **Best for**: Consistent, beautiful icons

#### 3. **Feather Icons**
- **URL**: https://feathericons.com/
- **Style**: Outline
- **Format**: SVG
- **License**: MIT
- **Best for**: Minimalist design

#### 4. **Font Awesome**
- **URL**: https://fontawesome.com/
- **Style**: Solid, Regular, Light, Duotone
- **Format**: Web font, SVG
- **License**: Free & Pro
- **Best for**: Large icon collection

#### 5. **Material Icons**
- **URL**: https://fonts.google.com/icons
- **Style**: Filled, Outlined, Rounded, Sharp
- **Format**: Web font, SVG
- **License**: Apache 2.0
- **Best for**: Material Design projects

---

## 🖼️ Image Resources

### Placeholder Images

#### Stock Photo Sites (Free)
- **Unsplash**: https://unsplash.com/
- **Pexels**: https://pexels.com/
- **Pixabay**: https://pixabay.com/
- **Burst by Shopify**: https://burst.shopify.com/

#### Placeholder Services
- **Lorem Picsum**: https://picsum.photos/
- **Placeholder.com**: https://placeholder.com/
- **DummyImage**: https://dummyimage.com/

### Image Optimization

```markdown
## Recommended Formats
- **WebP**: Modern format, great compression
- **AVIF**: Next-gen format, even better compression
- **JPEG**: Fallback for photos
- **PNG**: Fallback for graphics with transparency
- **SVG**: Vector graphics, icons, logos

## Optimization Tools
- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/
- **ImageOptim**: https://imageoptim.com/
- **Sharp** (Node.js): https://sharp.pixelplumbing.com/
```

---

## 🔤 Fonts

### Recommended Font Pairings

#### Pairing 1: Inter + Merriweather
```css
/* Sans-serif for UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Serif for content */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap');
```

#### Pairing 2: Poppins + Lora
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
```

#### Pairing 3: Work Sans + Playfair Display
```css
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### Font Loading Strategy

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
</style>
```

---

## 🎨 Illustrations

### Free Illustration Resources

#### 1. **unDraw**
- **URL**: https://undraw.co/
- **Style**: Flat, customizable colors
- **Format**: SVG, PNG
- **License**: Free for commercial use

#### 2. **Storyset**
- **URL**: https://storyset.com/
- **Style**: Animated, customizable
- **Format**: SVG, Lottie
- **License**: Free with attribution

#### 3. **Humaaans**
- **URL**: https://humaaans.com/
- **Style**: Mix-and-match characters
- **Format**: SVG
- **License**: Free for commercial use

#### 4. **DrawKit**
- **URL**: https://drawkit.com/
- **Style**: Hand-drawn, vector
- **Format**: SVG
- **License**: Free & Premium

#### 5. **Blush**
- **URL**: https://blush.design/
- **Style**: Various styles
- **Format**: SVG, PNG
- **License**: Free & Premium

---

## 📐 Logo Guidelines

### Logo Formats

```markdown
## Required Formats
- **SVG**: Primary format, scalable
- **PNG**: Transparent background (multiple sizes)
- **JPG**: Solid background version
- **Favicon**: .ico, .png (16x16, 32x32, 180x180)

## Recommended Sizes (PNG)
- 512x512 (High-res)
- 256x256 (Standard)
- 128x128 (Medium)
- 64x64 (Small)
- 32x32 (Icon)
```

### Logo Variations

```markdown
## Standard Variations
1. **Full Color**: Primary logo
2. **White**: For dark backgrounds
3. **Black**: For light backgrounds
4. **Monochrome**: Single color version
5. **Icon Only**: Symbol without text
6. **Horizontal**: Wide layout
7. **Vertical**: Stacked layout
```

---

## 🎯 Asset Usage Guidelines

### Icons

```jsx
// React example with Heroicons
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

function Navigation() {
  return (
    <nav>
      <HomeIcon className="w-6 h-6" />
      <UserIcon className="w-6 h-6" />
    </nav>
  );
}
```

### Images

```html
<!-- Responsive images with WebP -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Fonts

```css
/* System font stack (fallback) */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
               'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
               sans-serif;
}

/* Custom web font */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
               'Segoe UI', sans-serif;
}
```

---

## ⚡ Performance Best Practices

### Image Optimization

```markdown
✅ **DO:**
- Use WebP/AVIF with fallbacks
- Lazy load images below the fold
- Use responsive images (srcset)
- Compress images before upload
- Use CDN for image delivery
- Set explicit width/height to prevent layout shift

❌ **DON'T:**
- Use unoptimized images
- Load all images eagerly
- Use single size for all screens
- Forget alt text
- Use images for text
```

### Icon Optimization

```markdown
✅ **DO:**
- Use SVG for icons
- Inline critical icons
- Use icon sprites for multiple icons
- Optimize SVG files
- Use consistent icon sizes

❌ **DON'T:**
- Use icon fonts (accessibility issues)
- Use PNG for simple icons
- Load entire icon library
- Use different icon styles
```

### Font Optimization

```markdown
✅ **DO:**
- Use font-display: swap
- Preload critical fonts
- Use WOFF2 format
- Subset fonts (remove unused characters)
- Use system fonts when possible

❌ **DON'T:**
- Load too many font weights
- Use multiple font families
- Block rendering waiting for fonts
- Use web fonts for body text (consider system fonts)
```

---

## 📦 Asset Organization

### File Naming Convention

```
// Icons
icon-name-variant.svg
home-outline.svg
user-solid.svg

// Images
category-description-size.format
hero-background-1920x1080.webp
product-thumbnail-400x400.jpg

// Fonts
font-name-weight-style.format
inter-regular.woff2
inter-bold-italic.woff2
```

### Folder Structure in Project

```
public/
├── icons/
│   ├── logo.svg
│   └── favicon.ico
├── images/
│   ├── hero/
│   ├── products/
│   └── placeholders/
└── fonts/
    ├── inter-regular.woff2
    └── inter-bold.woff2
```

---

## 🔗 Related Resources

- [Design System](../01-design-system/) - Design tokens
- [Components](../02-components/) - Component usage
- [Documentation](../09-documentation/) - Implementation guides

---

**Note**: Folder này chứa guidelines và resources. Actual assets sẽ được thêm vào project khi cần thiết.
