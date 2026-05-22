# 🧩 Components Library

> Thư viện components UI có thể tái sử dụng cho mọi project

## 📋 Mục lục

Danh sách đầy đủ các components có sẵn trong thư viện.

---

## 🎯 Component Categories

### 1. **Buttons** (`buttons/`)
- Primary Button
- Secondary Button
- Outline Button
- Ghost Button
- Icon Button
- Button Group
- Loading Button

### 2. **Forms** (`forms/`)
- Text Input
- Textarea
- Select Dropdown
- Checkbox
- Radio Button
- Toggle Switch
- File Upload
- Search Input
- Date Picker
- Form Validation

### 3. **Navigation** (`navigation/`)
- Navbar
- Sidebar
- Breadcrumbs
- Tabs
- Pagination
- Menu Dropdown
- Mobile Menu

### 4. **Cards** (`cards/`)
- Basic Card
- Image Card
- Product Card
- Profile Card
- Pricing Card
- Stats Card
- Blog Card

### 5. **Modals & Overlays** (`modals/`)
- Modal Dialog
- Drawer/Sidebar
- Alert Dialog
- Confirmation Dialog
- Bottom Sheet
- Backdrop/Overlay

### 6. **Feedback** (`feedback/`)
- Alert/Banner
- Toast/Notification
- Progress Bar
- Spinner/Loader
- Skeleton Loader
- Badge
- Tooltip

### 7. **Data Display** (`data-display/`)
- Table
- List
- Avatar
- Badge
- Chip/Tag
- Accordion
- Timeline

### 8. **Layout** (`layout/`)
- Container
- Grid
- Stack
- Divider
- Spacer
- Section

### 9. **Media** (`media/`)
- Image
- Video Player
- Gallery
- Carousel
- Lightbox

### 10. **Typography** (`typography/`)
- Heading
- Paragraph
- Link
- Blockquote
- Code Block
- List (Ordered/Unordered)

---

## 📁 Folder Structure

```
02-components/
├── README.md                    # File này
├── _component-list.md           # Danh sách chi tiết
├── buttons/
│   ├── README.md
│   ├── primary-button.md
│   ├── secondary-button.md
│   └── ...
├── forms/
│   ├── README.md
│   ├── text-input.md
│   ├── select.md
│   └── ...
├── navigation/
│   ├── README.md
│   ├── navbar.md
│   └── ...
├── cards/
├── modals/
├── feedback/
├── data-display/
├── layout/
├── media/
└── typography/
```

---

## 📝 Component Documentation Format

Mỗi component sẽ có documentation theo format:

```markdown
# Component Name

## Description
Brief description of the component

## Variants
- Variant 1
- Variant 2

## Props/Attributes
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |

## Usage Examples
### React
### Vue
### HTML/CSS

## Accessibility
- ARIA attributes
- Keyboard navigation

## Best Practices
- When to use
- When not to use
```

---

## 🎨 Design Principles

### Consistency
- Tất cả components follow design system
- Sử dụng design tokens từ `01-design-system/`

### Accessibility
- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA attributes

### Responsive
- Mobile-first design
- Works on all screen sizes
- Touch-friendly on mobile

### Customizable
- Easy to customize colors, sizes
- Support theming
- CSS variables for easy override

### Performance
- Lightweight
- No unnecessary dependencies
- Optimized for performance

---

## 🚀 Quick Start

### 1. Chọn component cần dùng
Xem danh sách trong `_component-list.md`

### 2. Đọc documentation
Mỗi component có file riêng với đầy đủ thông tin

### 3. Copy code
Chọn code snippet phù hợp với tech stack của bạn

### 4. Customize
Điều chỉnh theo design của project

---

## 🔗 Related Resources

- [Design System](../01-design-system/)
- [Code Snippets](../06-code-snippets/)
- [Patterns](../04-patterns/)

---

**Note**: Đây là component library documentation. Actual code implementations nằm trong `06-code-snippets/` theo từng tech stack.
