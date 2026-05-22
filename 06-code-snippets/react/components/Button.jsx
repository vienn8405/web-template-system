import React from 'react';

/**
 * Button Component
 *
 * A versatile button component following the design system.
 * Supports multiple variants, sizes, and states.
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  // Variant styles based on design system
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
    ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500',
  };

  // Size styles based on design system spacing
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',      // 12px 8px, 14px text
    md: 'px-4 py-3 text-base',    // 16px 12px, 16px text
    lg: 'px-6 py-4 text-lg',      // 24px 16px, 20px text
  };

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
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

// Usage Examples:
/*

// Primary Button
<Button variant="primary" onClick={() => console.log('Clicked')}>
  Click Me
</Button>

// Secondary Button
<Button variant="secondary" size="lg">
  Secondary Action
</Button>

// Outline Button
<Button variant="outline" size="sm">
  Outline Button
</Button>

// Loading State
<Button variant="primary" loading>
  Processing...
</Button>

// Disabled State
<Button variant="primary" disabled>
  Disabled Button
</Button>

// Full Width
<Button variant="primary" fullWidth>
  Full Width Button
</Button>

// Danger Button
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// With Icon
<Button variant="primary">
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Add Item
</Button>

*/
