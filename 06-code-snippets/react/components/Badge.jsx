import React from 'react';

/**
 * Badge Component
 *
 * Small status indicators and labels
 * Perfect for counts, status, and labels
 *
 * @example
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" dot>Online</Badge>
 */

export function Badge({
  children,
  variant = 'neutral', // 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size = 'md', // 'sm' | 'md' | 'lg'
  dot = false,
  pill = false,
  outline = false,
  className = '',
  ...props
}) {
  // Variant styles
  const variantClasses = {
    primary: outline
      ? 'border-primary-500 text-primary-700 bg-primary-50'
      : 'bg-primary-600 text-white',
    secondary: outline
      ? 'border-secondary-500 text-secondary-700 bg-secondary-50'
      : 'bg-secondary-600 text-white',
    success: outline
      ? 'border-green-500 text-green-700 bg-green-50'
      : 'bg-green-600 text-white',
    warning: outline
      ? 'border-yellow-500 text-yellow-700 bg-yellow-50'
      : 'bg-yellow-500 text-white',
    error: outline
      ? 'border-red-500 text-red-700 bg-red-50'
      : 'bg-red-600 text-white',
    info: outline
      ? 'border-blue-500 text-blue-700 bg-blue-50'
      : 'bg-blue-600 text-white',
    neutral: outline
      ? 'border-neutral-300 text-neutral-700 bg-white'
      : 'bg-neutral-600 text-white',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium
        ${pill ? 'rounded-full' : 'rounded'}
        ${outline ? 'border' : ''}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`
            ${dotSizeClasses[size]}
            rounded-full
            ${outline ? `bg-current` : 'bg-white'}
          `}
        />
      )}
      {children}
    </span>
  );
}

/**
 * Notification Badge (for counts)
 */
export function NotificationBadge({
  count = 0,
  max = 99,
  showZero = false,
  dot = false,
  position = 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  children,
  className = '',
}) {
  const displayCount = count > max ? `${max}+` : count;
  const shouldShow = showZero || count > 0;

  const positionClasses = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  if (!shouldShow) {
    return <>{children}</>;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <span
        className={`
          absolute ${positionClasses[position]}
          flex items-center justify-center
          ${dot ? 'w-2 h-2' : 'min-w-[20px] h-5 px-1'}
          text-xs font-bold text-white bg-red-600
          rounded-full border-2 border-white
        `}
      >
        {!dot && displayCount}
      </span>
    </div>
  );
}

/**
 * Status Badge (with icon)
 */
export function StatusBadge({
  status = 'active', // 'active' | 'inactive' | 'pending' | 'success' | 'error'
  label,
  size = 'md',
  className = '',
}) {
  const statusConfig = {
    active: {
      color: 'bg-green-600',
      label: label || 'Active',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    inactive: {
      color: 'bg-neutral-400',
      label: label || 'Inactive',
      textColor: 'text-neutral-700',
      bgColor: 'bg-neutral-50',
    },
    pending: {
      color: 'bg-yellow-500',
      label: label || 'Pending',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
    },
    success: {
      color: 'bg-green-600',
      label: label || 'Success',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    error: {
      color: 'bg-red-600',
      label: label || 'Error',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
    },
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${sizeClasses[size]}
        ${config.textColor} ${config.bgColor}
        rounded-full font-medium
        ${className}
      `}
    >
      <span className={`${dotSizeClasses[size]} ${config.color} rounded-full`} />
      {config.label}
    </span>
  );
}

// Usage Examples:

/*
// Basic Badges
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="neutral">Neutral</Badge>

// Outline Badges
<Badge variant="primary" outline>Primary</Badge>
<Badge variant="success" outline>Success</Badge>

// Pill Badges
<Badge variant="primary" pill>Pill Badge</Badge>

// With Dot
<Badge variant="success" dot>Online</Badge>
<Badge variant="error" dot>Offline</Badge>

// Different Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Notification Badge
<NotificationBadge count={5}>
  <button className="p-2">
    <BellIcon className="w-6 h-6" />
  </button>
</NotificationBadge>

// Notification Badge with Max
<NotificationBadge count={150} max={99}>
  <button>Messages</button>
</NotificationBadge>

// Dot Notification
<NotificationBadge dot count={1}>
  <button>Notifications</button>
</NotificationBadge>

// Different Positions
<NotificationBadge count={3} position="top-left">
  <Avatar />
</NotificationBadge>

// Status Badges
<StatusBadge status="active" />
<StatusBadge status="inactive" />
<StatusBadge status="pending" />
<StatusBadge status="success" />
<StatusBadge status="error" />

// Custom Status Label
<StatusBadge status="active" label="Available" />
<StatusBadge status="pending" label="In Review" />

// In Tables
<table>
  <tr>
    <td>John Doe</td>
    <td><StatusBadge status="active" /></td>
    <td><Badge variant="primary">Admin</Badge></td>
  </tr>
</table>

// In Cards
<div className="flex items-center justify-between">
  <h3>Product Name</h3>
  <Badge variant="success">In Stock</Badge>
</div>

// Multiple Badges
<div className="flex gap-2">
  <Badge variant="primary">React</Badge>
  <Badge variant="secondary">TypeScript</Badge>
  <Badge variant="info">Tailwind</Badge>
</div>

// With Icons in Navigation
<nav>
  <a href="/messages">
    Messages
    <NotificationBadge count={12}>
      <span className="ml-2" />
    </NotificationBadge>
  </a>
</nav>
*/
