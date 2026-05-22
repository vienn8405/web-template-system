import React from 'react';

/**
 * Skeleton Loader Component
 *
 * Placeholder loading state for content
 * Shows animated skeleton while content is loading
 *
 * @example
 * <Skeleton width="200px" height="20px" />
 */

export function Skeleton({
  width = '100%',
  height = '1rem',
  circle = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        bg-neutral-200 animate-pulse
        ${circle ? 'rounded-full' : 'rounded'}
        ${className}
      `}
      style={{ width, height }}
      {...props}
    />
  );
}

/**
 * Skeleton Text - Multiple lines of text
 */
export function SkeletonText({
  lines = 3,
  lastLineWidth = '70%',
  className = '',
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="1rem"
          width={index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Card - Card layout skeleton
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-lg border border-neutral-200 p-4 ${className}`}>
      {/* Image */}
      <Skeleton height="200px" className="mb-4" />

      {/* Title */}
      <Skeleton height="1.5rem" width="80%" className="mb-2" />

      {/* Description */}
      <SkeletonText lines={3} />

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <Skeleton width="80px" height="2rem" />
        <Skeleton width="100px" height="2rem" />
      </div>
    </div>
  );
}

/**
 * Skeleton Avatar - Avatar placeholder
 */
export function SkeletonAvatar({
  size = 'md',
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <Skeleton
      circle
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}

/**
 * Skeleton Table - Table loading state
 */
export function SkeletonTable({
  rows = 5,
  columns = 4,
  className = '',
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height="2rem" className="flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="1.5rem" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton List - List item skeleton
 */
export function SkeletonList({
  items = 5,
  showAvatar = true,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {showAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1">
            <Skeleton height="1rem" width="60%" className="mb-2" />
            <Skeleton height="0.875rem" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Form - Form loading state
 */
export function SkeletonForm({
  fields = 4,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index}>
          <Skeleton height="1rem" width="120px" className="mb-2" />
          <Skeleton height="2.5rem" width="100%" />
        </div>
      ))}
      <Skeleton height="2.5rem" width="120px" className="mt-6" />
    </div>
  );
}

/**
 * Skeleton Profile - Profile page skeleton
 */
export function SkeletonProfile({ className = '' }) {
  return (
    <div className={className}>
      {/* Cover Image */}
      <Skeleton height="200px" className="mb-4" />

      {/* Profile Info */}
      <div className="flex items-start gap-4 mb-6">
        <SkeletonAvatar size="xl" />
        <div className="flex-1">
          <Skeleton height="2rem" width="200px" className="mb-2" />
          <Skeleton height="1rem" width="150px" className="mb-4" />
          <SkeletonText lines={2} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton height="2rem" width="60px" className="mx-auto mb-2" />
            <Skeleton height="1rem" width="80px" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* Content */}
      <SkeletonCard />
    </div>
  );
}

// Usage Examples:

/*
// Basic Skeleton
<Skeleton width="200px" height="20px" />

// Circle Skeleton (for avatars)
<Skeleton circle width="48px" height="48px" />

// Text Lines
<SkeletonText lines={3} />
<SkeletonText lines={5} lastLineWidth="60%" />

// Avatar
<SkeletonAvatar size="sm" />
<SkeletonAvatar size="md" />
<SkeletonAvatar size="lg" />
<SkeletonAvatar size="xl" />

// Card Loading
<SkeletonCard />

// Multiple Cards
<div className="grid grid-cols-3 gap-4">
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard />
</div>

// Table Loading
<SkeletonTable rows={5} columns={4} />

// List Loading
<SkeletonList items={5} showAvatar />

// Form Loading
<SkeletonForm fields={4} />

// Profile Loading
<SkeletonProfile />

// Custom Skeleton Layout
<div className="flex items-center gap-4">
  <SkeletonAvatar size="lg" />
  <div className="flex-1">
    <Skeleton height="1.5rem" width="200px" className="mb-2" />
    <Skeleton height="1rem" width="150px" />
  </div>
</div>

// Product Card Skeleton
<div className="border rounded-lg p-4">
  <Skeleton height="200px" className="mb-4" />
  <Skeleton height="1.5rem" width="80%" className="mb-2" />
  <Skeleton height="1rem" width="60%" className="mb-4" />
  <div className="flex items-center justify-between">
    <Skeleton height="2rem" width="80px" />
    <Skeleton height="2.5rem" width="120px" />
  </div>
</div>

// Blog Post Skeleton
<article>
  <Skeleton height="400px" className="mb-6" />
  <Skeleton height="2.5rem" width="80%" className="mb-4" />
  <div className="flex items-center gap-3 mb-6">
    <SkeletonAvatar size="sm" />
    <Skeleton height="1rem" width="150px" />
  </div>
  <SkeletonText lines={8} />
</article>

// Conditional Loading
{isLoading ? (
  <SkeletonCard />
) : (
  <ProductCard product={product} />
)}

// Dashboard Skeleton
<div className="grid grid-cols-4 gap-4 mb-6">
  {Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="bg-white p-4 rounded-lg border">
      <Skeleton height="1rem" width="100px" className="mb-2" />
      <Skeleton height="2rem" width="80px" />
    </div>
  ))}
</div>
*/
