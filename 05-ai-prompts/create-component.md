# 🤖 Create Component - AI Prompt

> Hướng dẫn chi tiết để AI tạo component mới theo đúng chuẩn

---

## 📋 Prompt Template

```markdown
# Task: Create [Component Name] Component

## 1. Context
I need a [component type] component for [specific use case].

## 2. Requirements

### Functional Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Design Requirements
- Follow design system from `01-design-system/`
- Use design tokens (colors, spacing, typography)
- Match existing component style

### Technical Requirements
- Tech stack: [React/Vue/Vanilla JS]
- Responsive: Mobile-first
- Accessibility: WCAG 2.1 AA
- Browser support: Modern browsers

## 3. Component Specifications

### Props/Attributes
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| prop1 | string | - | Yes | Description |
| prop2 | boolean | false | No | Description |

### Variants
- Variant 1: [description]
- Variant 2: [description]

### States
- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading (if applicable)
- Error (if applicable)

### Sizes (if applicable)
- Small: [dimensions]
- Medium: [dimensions]
- Large: [dimensions]

## 4. Reference Materials

### Similar Components
Check these existing components:
- `02-components/[category]/[similar-component].md`

### Design System
- Colors: `01-design-system/colors.md`
- Typography: `01-design-system/typography.md`
- Spacing: `01-design-system/spacing.md`
- Breakpoints: `01-design-system/breakpoints.md`

### Patterns
- Relevant pattern: `04-patterns/[pattern-name].md`

## 5. Expected Output

Please provide:

1. **Component Code**
   - Clean, readable code
   - Proper comments
   - TypeScript types (if applicable)

2. **Styles**
   - CSS/SCSS/Tailwind classes
   - Responsive styles
   - All states styled

3. **Documentation**
   - Component description
   - Props/API documentation
   - Usage examples

4. **Accessibility**
   - ARIA attributes used
   - Keyboard navigation support
   - Screen reader considerations

5. **Usage Examples**
   - Basic usage
   - With all props
   - Different variants
   - Different states

## 6. Checklist

Before submitting, ensure:
- [ ] Follows design system
- [ ] Uses design tokens (no hardcoded values)
- [ ] Responsive (mobile-first)
- [ ] Accessible (ARIA, keyboard, screen reader)
- [ ] All states implemented
- [ ] Properly commented
- [ ] Usage examples provided
- [ ] Works in all modern browsers
```

---

## 🎯 Step-by-Step Process for AI

### Step 1: Analyze Request
```
1. Identify component type (Button, Input, Card, etc.)
2. Understand use case
3. List functional requirements
4. Note any special requirements
```

### Step 2: Research
```
1. Read design system files:
   - colors.md
   - typography.md
   - spacing.md
   - breakpoints.md

2. Check existing similar components:
   - Look in 02-components/[category]/
   - Identify reusable patterns

3. Review relevant patterns:
   - Check 04-patterns/ for applicable patterns
```

### Step 3: Plan Component
```
1. Define component structure
2. List all props/attributes needed
3. Identify all states
4. Plan responsive behavior
5. Consider accessibility requirements
```

### Step 4: Implement
```
1. Write component code
2. Apply design tokens
3. Implement all states
4. Add responsive styles
5. Add ARIA attributes
6. Add comments
```

### Step 5: Document
```
1. Write component description
2. Document all props
3. Create usage examples
4. Note accessibility features
5. Add best practices
```

### Step 6: Verify
```
1. Check design system compliance
2. Verify accessibility
3. Test responsive behavior
4. Review code quality
5. Ensure examples work
```

---

## 💡 Example: Create Primary Button

### User Request
```
Create a primary button component for CTAs.
```

### AI Response

```markdown
# Primary Button Component

## Description
A primary button component for main call-to-action elements. Uses the primary color from the design system and includes all necessary states and accessibility features.

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | ReactNode | - | Yes | Button text or content |
| size | 'sm' \| 'md' \| 'lg' | 'md' | No | Button size |
| disabled | boolean | false | No | Disabled state |
| loading | boolean | false | No | Loading state |
| fullWidth | boolean | false | No | Full width button |
| onClick | function | - | No | Click handler |
| type | 'button' \| 'submit' \| 'reset' | 'button' | No | Button type |

## Code (React + Tailwind)

```jsx
import React from 'react';

export function PrimaryButton({
  children,
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  // Size classes based on design system spacing
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',      // 12px 8px, 14px text
    md: 'px-4 py-3 text-base',    // 16px 12px, 16px text
    lg: 'px-6 py-4 text-lg',      // 24px 16px, 20px text
  };

  // Base classes using design tokens
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    bg-primary-600 text-white
    hover:bg-primary-700
    active:bg-primary-800
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
  `;

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
```

## Usage Examples

### Basic Usage
```jsx
<PrimaryButton onClick={() => console.log('Clicked')}>
  Click Me
</PrimaryButton>
```

### Different Sizes
```jsx
<PrimaryButton size="sm">Small Button</PrimaryButton>
<PrimaryButton size="md">Medium Button</PrimaryButton>
<PrimaryButton size="lg">Large Button</PrimaryButton>
```

### Loading State
```jsx
<PrimaryButton loading>
  Processing...
</PrimaryButton>
```

### Disabled State
```jsx
<PrimaryButton disabled>
  Disabled Button
</PrimaryButton>
```

### Full Width
```jsx
<PrimaryButton fullWidth>
  Full Width Button
</PrimaryButton>
```

### Form Submit
```jsx
<form onSubmit={handleSubmit}>
  <PrimaryButton type="submit">
    Submit Form
  </PrimaryButton>
</form>
```

## Accessibility Features

- ✅ Semantic `<button>` element
- ✅ Proper `type` attribute
- ✅ `aria-busy` for loading state
- ✅ `disabled` attribute for disabled state
- ✅ Focus ring for keyboard navigation
- ✅ Sufficient color contrast (7.5:1)
- ✅ Minimum touch target size (44px height)

## Responsive Behavior

- Mobile: Full width by default on small screens (optional)
- Tablet/Desktop: Inline width based on content
- Touch targets: Minimum 44px height on all devices

## Design System Compliance

- ✅ Colors: Uses `primary-600`, `primary-700`, `primary-800` from design system
- ✅ Spacing: Uses `px-3`, `py-2`, etc. from spacing scale
- ✅ Typography: Uses `text-sm`, `text-base`, `text-lg` from typography scale
- ✅ Border radius: Uses `rounded-lg` (0.5rem)
- ✅ Transitions: Uses `duration-200` (200ms)

## Best Practices

✅ **DO:**
- Use for primary actions only (1 per screen)
- Provide clear, action-oriented text
- Use loading state for async actions
- Disable during processing

❌ **DON'T:**
- Use multiple primary buttons on same screen
- Use for destructive actions (use danger variant)
- Make text too long (keep concise)
- Forget to handle loading/disabled states
```

---

## 🔗 Related

- [Button Components](../../02-components/buttons/)
- [Design System](../../01-design-system/)
- [Code Snippets](../../06-code-snippets/)
