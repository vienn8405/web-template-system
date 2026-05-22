# 🔘 Buttons

> Button components cho mọi use case

## 📋 Available Buttons

1. **Primary Button** - Main CTA button
2. **Secondary Button** - Secondary actions
3. **Outline Button** - Tertiary actions
4. **Ghost Button** - Subtle actions
5. **Icon Button** - Icon-only actions
6. **Button Group** - Multiple buttons together
7. **Loading Button** - Async action buttons

---

## 🎨 Design Principles

### Hierarchy
- **Primary**: Màu nổi bật nhất, chỉ 1 primary button per screen
- **Secondary**: Màu nhẹ hơn, cho actions phụ
- **Tertiary**: Outline hoặc ghost, cho actions ít quan trọng

### Sizing
- **Small**: 32px height - Compact spaces
- **Medium**: 40px height - Default
- **Large**: 48px height - Hero sections, important CTAs

### States
- Default
- Hover
- Active/Pressed
- Focus (keyboard)
- Disabled
- Loading

---

## ♿ Accessibility

### Requirements
- Minimum touch target: 44x44px (iOS) hoặc 48x48px (Android)
- Clear focus indicator
- Proper ARIA labels
- Keyboard accessible (Enter/Space)
- Disabled state clearly visible

### Best Practices
```html
<!-- Good -->
<button type="button" aria-label="Submit form">
  Submit
</button>

<!-- With icon only -->
<button type="button" aria-label="Close dialog">
  <svg>...</svg>
</button>

<!-- Loading state -->
<button type="button" aria-busy="true" disabled>
  <span class="sr-only">Loading...</span>
  Loading...
</button>
```

---

## 📝 Usage Guidelines

### When to use Primary Button
✅ Main action on the page  
✅ Form submissions  
✅ Call-to-action  
❌ Multiple primary buttons on same screen  
❌ Destructive actions (use danger variant)

### When to use Secondary Button
✅ Secondary actions  
✅ Cancel buttons  
✅ Alternative actions  
❌ Main CTA  

### When to use Outline Button
✅ Tertiary actions  
✅ Filters  
✅ Tags (clickable)  
✅ Less important actions

### When to use Ghost Button
✅ Navigation items  
✅ Subtle actions  
✅ Icon buttons in toolbars  
❌ Primary actions

### When to use Icon Button
✅ Close, menu, settings icons  
✅ Actions with universally understood icons  
❌ Actions that need text explanation

---

## 🎨 Color Variants

### Primary (Blue)
Default brand color

### Secondary (Purple)
Alternative actions

### Success (Green)
Positive actions (Save, Confirm, Approve)

### Danger (Red)
Destructive actions (Delete, Remove, Cancel subscription)

### Warning (Orange)
Caution actions (Archive, Unpublish)

### Info (Cyan)
Informational actions (Learn more, View details)

---

## 📦 Component Files

Xem chi tiết implementation trong các files:
- `primary-button.md` - Primary button specs
- `secondary-button.md` - Secondary button specs
- `outline-button.md` - Outline button specs
- `ghost-button.md` - Ghost button specs
- `icon-button.md` - Icon button specs
- `button-group.md` - Button group specs
- `loading-button.md` - Loading button specs

---

## 🔗 Related

- [Forms](../forms/) - Form buttons
- [Code Snippets](../../06-code-snippets/) - Implementation code
- [Design System](../../01-design-system/) - Colors, spacing
