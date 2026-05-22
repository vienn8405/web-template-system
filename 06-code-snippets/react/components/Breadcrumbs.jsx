import React from 'react';

/**
 * Breadcrumbs Component
 *
 * Navigation breadcrumbs showing the current page's location
 * Helps users understand where they are in the site hierarchy
 *
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptop', href: '/products/laptop' }
 *   ]}
 * />
 */

export function Breadcrumbs({
  items = [],
  separator = 'chevron', // 'chevron' | 'slash' | 'arrow' | custom element
  maxItems,
  className = '',
}) {
  // Truncate items if maxItems is specified
  const displayItems = maxItems && items.length > maxItems
    ? [
        items[0],
        { label: '...', href: null, isEllipsis: true },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  // Separator icons
  const separators = {
    chevron: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    slash: <span>/</span>,
    arrow: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
  };

  const getSeparator = () => {
    if (typeof separator === 'string') {
      return separators[separator] || separator;
    }
    return separator;
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.isEllipsis;

          return (
            <li key={index} className="flex items-center">
              {/* Breadcrumb Item */}
              {isEllipsis ? (
                <span className="text-neutral-500">...</span>
              ) : isLast ? (
                <span
                  className="font-medium text-neutral-900"
                  aria-current="page"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-150"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </a>
              )}

              {/* Separator */}
              {!isLast && (
                <span className="mx-2 text-neutral-400">
                  {getSeparator()}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Breadcrumb Item Component (for custom implementations)
 */
export function BreadcrumbItem({
  href,
  children,
  isLast = false,
  icon,
  className = '',
}) {
  if (isLast) {
    return (
      <span
        className={`font-medium text-neutral-900 ${className}`}
        aria-current="page"
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`text-neutral-600 hover:text-primary-600 transition-colors duration-150 ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </a>
  );
}

// Usage Examples:

/*
// Basic Breadcrumbs
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', href: '/products/electronics/laptops' }
  ]}
/>

// With Slash Separator
<Breadcrumbs
  separator="slash"
  items={[
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Article Title', href: '/blog/article' }
  ]}
/>

// With Arrow Separator
<Breadcrumbs
  separator="arrow"
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/dashboard/settings' },
    { label: 'Profile', href: '/dashboard/settings/profile' }
  ]}
/>

// With Icons
<Breadcrumbs
  items={[
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon className="w-4 h-4" />
    },
    {
      label: 'Products',
      href: '/products',
      icon: <ShoppingBagIcon className="w-4 h-4" />
    },
    {
      label: 'Laptop',
      href: '/products/laptop'
    }
  ]}
/>

// With Max Items (Collapsed)
<Breadcrumbs
  maxItems={3}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Subcategory', href: '/category/sub' },
    { label: 'Product Type', href: '/category/sub/type' },
    { label: 'Product', href: '/category/sub/type/product' }
  ]}
/>
// Will show: Home > ... > Product Type > Product

// Custom Separator
<Breadcrumbs
  separator={<span className="text-primary-500">→</span>}
  items={items}
/>

// Responsive Breadcrumbs (hide on mobile)
<Breadcrumbs
  className="hidden md:flex"
  items={items}
/>

// With Custom Styling
<Breadcrumbs
  className="bg-neutral-50 px-4 py-2 rounded-lg"
  items={items}
/>

// E-commerce Example
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Men', href: '/men' },
    { label: 'Clothing', href: '/men/clothing' },
    { label: 'T-Shirts', href: '/men/clothing/tshirts' },
    { label: 'Blue Cotton T-Shirt', href: '/men/clothing/tshirts/blue-cotton' }
  ]}
/>

// Dashboard Example
<Breadcrumbs
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/dashboard/users' },
    { label: 'John Doe', href: '/dashboard/users/123' },
    { label: 'Edit Profile', href: '/dashboard/users/123/edit' }
  ]}
/>
*/
