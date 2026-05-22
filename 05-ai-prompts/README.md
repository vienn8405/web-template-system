# 🤖 AI Prompts & Skills

> Prompts và hướng dẫn để AI có thể sử dụng template system hiệu quả

## 🎯 Mục đích

Cung cấp các prompts, instructions, và skills để AI có thể:
- Hiểu và sử dụng template system
- Tạo components mới dựa trên design system
- Xây dựng pages từ layouts có sẵn
- Apply best practices và patterns
- Customize và extend templates

---

## 📋 Available Prompts

### 1. **Create Component** (`create-component.md`)
Hướng dẫn AI tạo component mới

### 2. **Create Page** (`create-page.md`)
Hướng dẫn AI tạo page từ layout template

### 3. **Refactor Code** (`refactor-code.md`)
Hướng dẫn AI refactor code theo best practices

### 4. **Add Feature** (`add-feature.md`)
Hướng dẫn AI thêm feature mới

### 5. **Fix Bug** (`fix-bug.md`)
Hướng dẫn AI debug và fix bugs

### 6. **Optimize Performance** (`optimize-performance.md`)
Hướng dẫn AI optimize performance

### 7. **Improve Accessibility** (`improve-accessibility.md`)
Hướng dẫn AI cải thiện accessibility

### 8. **Add Responsive** (`add-responsive.md`)
Hướng dẫn AI làm responsive design

---

## 📁 Folder Structure

```
05-ai-prompts/
├── README.md                    # File này
├── create-component.md
├── create-page.md
├── refactor-code.md
├── add-feature.md
├── fix-bug.md
├── optimize-performance.md
├── improve-accessibility.md
├── add-responsive.md
└── examples/
    ├── component-example.md
    ├── page-example.md
    └── refactor-example.md
```

---

## 🤖 How AI Should Use This System

### Step 1: Understand the Request
```
User Request → Analyze → Identify Type (Component/Page/Feature/Bug)
```

### Step 2: Load Relevant Resources
```
Load Design System → Load Components → Load Patterns → Load Layout
```

### Step 3: Plan Implementation
```
Check existing components → Identify reusable parts → Plan structure
```

### Step 4: Implement
```
Follow design system → Use patterns → Write clean code → Add comments
```

### Step 5: Verify
```
Check accessibility → Check responsive → Check performance → Test
```

---

## 📝 AI Prompt Templates

### Creating a Component

```markdown
# Task: Create [Component Name]

## Context
I need to create a [component type] component for [use case].

## Requirements
- Follow design system from `01-design-system/`
- Use colors, typography, spacing from design tokens
- Make it responsive (mobile-first)
- Ensure accessibility (WCAG 2.1 AA)
- Include all states (default, hover, active, disabled)

## Reference
- Similar components: [list from 02-components/]
- Patterns to follow: [list from 04-patterns/]
- Tech stack: [React/Vue/Vanilla]

## Output
Please provide:
1. Component code
2. Props/API documentation
3. Usage examples
4. Accessibility notes
```

---

### Creating a Page

```markdown
# Task: Create [Page Name]

## Context
I need to create a [page type] page for [purpose].

## Requirements
- Use layout from `03-layouts/[layout-name]/`
- Use components from `02-components/`
- Follow patterns from `04-patterns/`
- Responsive design (mobile-first)
- SEO optimized
- Accessible

## Sections Needed
1. [Section 1]
2. [Section 2]
3. [Section 3]

## Reference
- Layout template: `03-layouts/[name]/`
- Components to use: [list]
- Tech stack: [React/Vue/Vanilla]

## Output
Please provide:
1. Page structure
2. Component composition
3. Responsive behavior
4. SEO meta tags
```

---

### Refactoring Code

```markdown
# Task: Refactor [Component/Page]

## Context
Current code needs refactoring to improve [performance/maintainability/accessibility].

## Current Issues
1. [Issue 1]
2. [Issue 2]

## Requirements
- Follow patterns from `04-patterns/`
- Improve [specific aspect]
- Maintain functionality
- Add comments

## Reference
- Best practices: `04-patterns/[relevant-pattern].md`
- Design system: `01-design-system/`

## Output
Please provide:
1. Refactored code
2. Explanation of changes
3. Before/after comparison
```

---

## 🎯 AI Guidelines

### When Creating Components

✅ **DO:**
- Read design system first (`01-design-system/`)
- Check if similar component exists (`02-components/`)
- Use design tokens (colors, spacing, typography)
- Follow naming conventions
- Include all states (hover, active, disabled, loading)
- Make it responsive
- Add ARIA attributes
- Write clear comments
- Provide usage examples

❌ **DON'T:**
- Hardcode colors, sizes, spacing
- Ignore accessibility
- Skip responsive design
- Create duplicate components
- Use inline styles (prefer CSS classes)
- Forget error states
- Skip documentation

---

### When Creating Pages

✅ **DO:**
- Start with layout template (`03-layouts/`)
- Reuse existing components (`02-components/`)
- Follow patterns (`04-patterns/`)
- Use semantic HTML
- Add meta tags for SEO
- Optimize images
- Implement loading states
- Handle errors gracefully
- Test on multiple screen sizes

❌ **DON'T:**
- Create components from scratch if they exist
- Ignore layout templates
- Skip SEO optimization
- Forget mobile users
- Hardcode content
- Skip error handling
- Ignore performance

---

### When Refactoring

✅ **DO:**
- Understand current code first
- Identify patterns to apply
- Improve readability
- Optimize performance
- Enhance accessibility
- Add comments
- Keep functionality intact
- Test thoroughly

❌ **DON'T:**
- Change functionality without permission
- Remove comments
- Skip testing
- Ignore edge cases
- Over-engineer
- Break existing features

---

## 📚 Knowledge Base for AI

### Design System Location
```
01-design-system/
├── colors.md          → Color palette and usage
├── typography.md      → Font sizes, weights, line heights
├── spacing.md         → Spacing scale and usage
├── breakpoints.md     → Responsive breakpoints
└── design-tokens.json → All tokens in JSON format
```

### Components Location
```
02-components/
├── _component-list.md → Full list of available components
├── buttons/           → Button components
├── forms/             → Form components
├── navigation/        → Navigation components
└── ...                → Other categories
```

### Layouts Location
```
03-layouts/
├── landing-page/      → Landing page layouts
├── blog/              → Blog layouts
├── dashboard/         → Dashboard layouts
└── ...                → Other layouts
```

### Patterns Location
```
04-patterns/
├── authentication.md  → Auth patterns
├── forms-validation.md → Form patterns
├── data-fetching.md   → Data fetching patterns
└── ...                → Other patterns
```

---

## 🔍 AI Decision Tree

```
User Request
    ↓
Is it a component?
    ├─ Yes → Check 02-components/ for existing
    │         ├─ Exists → Customize it
    │         └─ New → Create using design system
    │
    └─ No → Is it a page?
            ├─ Yes → Use layout from 03-layouts/
            │         Use components from 02-components/
            │         Apply patterns from 04-patterns/
            │
            └─ No → Is it a feature?
                    ├─ Yes → Check patterns in 04-patterns/
                    │         Use relevant components
                    │
                    └─ No → Is it a bug fix?
                            └─ Yes → Analyze code
                                     Apply best practices
                                     Test thoroughly
```

---

## 💡 Example Prompts

### Example 1: Create Button Component

```
Create a primary button component following the design system.

Requirements:
- Use primary color from 01-design-system/colors.md
- Use spacing from 01-design-system/spacing.md
- Include hover, active, disabled states
- Make it accessible (ARIA, keyboard)
- Support small, medium, large sizes
- Support icon + text variant

Tech stack: React + Tailwind CSS
```

### Example 2: Create Landing Page

```
Create a landing page for a SaaS product.

Sections needed:
1. Hero with CTA
2. Features (3 columns)
3. Testimonials
4. Pricing (3 tiers)
5. FAQ
6. Final CTA

Requirements:
- Use landing-page layout from 03-layouts/
- Use components from 02-components/
- Mobile-first responsive
- SEO optimized
- Fast loading

Tech stack: Next.js + Tailwind CSS
```

### Example 3: Add Form Validation

```
Add validation to the contact form.

Requirements:
- Follow patterns from 04-patterns/forms-validation.md
- Client-side validation (real-time)
- Show inline errors
- Validate on blur and submit
- Accessible error messages
- Disable submit during processing

Tech stack: React + React Hook Form
```

---

## 🔗 Related Resources

- [Design System](../01-design-system/)
- [Components](../02-components/)
- [Layouts](../03-layouts/)
- [Patterns](../04-patterns/)
- [Code Snippets](../06-code-snippets/)

---

**Note**: Các prompts chi tiết sẽ được tạo trong các files tương ứng với examples và best practices cụ thể.
