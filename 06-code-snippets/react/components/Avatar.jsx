import React from 'react';

/**
 * Avatar Component
 *
 * Display user profile pictures or initials
 * Supports images, initials, icons, and status indicators
 *
 * @example
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 * <Avatar initials="JD" />
 */

export function Avatar({
  src,
  alt = '',
  initials,
  icon,
  size = 'md',
  status,
  shape = 'circle', // 'circle' | 'square'
  className = '',
  ...props
}) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
    '2xl': 'w-32 h-32 text-3xl',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-neutral-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${shapeClasses[shape]}
          flex items-center justify-center
          overflow-hidden
          bg-neutral-200 text-neutral-600
          font-semibold
        `}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : icon ? (
          icon
        ) : (
          // Default user icon
          <svg className="w-2/3 h-2/3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Status Indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            ${statusSizeClasses[size]}
            ${statusColors[status]}
            rounded-full border-2 border-white
          `}
        />
      )}
    </div>
  );
}

/**
 * Avatar Group - Multiple avatars stacked
 */
export function AvatarGroup({
  avatars = [],
  max = 3,
  size = 'md',
  className = '',
}) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className="ring-2 ring-white"
        />
      ))}

      {remaining > 0 && (
        <div
          className={`
            ${size === 'xs' ? 'w-6 h-6 text-xs' : ''}
            ${size === 'sm' ? 'w-8 h-8 text-sm' : ''}
            ${size === 'md' ? 'w-12 h-12 text-base' : ''}
            ${size === 'lg' ? 'w-16 h-16 text-lg' : ''}
            ${size === 'xl' ? 'w-24 h-24 text-2xl' : ''}
            flex items-center justify-center
            rounded-full bg-neutral-300 text-neutral-700
            font-semibold ring-2 ring-white
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

// Usage Examples:

/*
// Image Avatar
<Avatar
  src="/path/to/avatar.jpg"
  alt="John Doe"
/>

// Initials Avatar
<Avatar initials="JD" />
<Avatar initials="AB" />

// Icon Avatar
<Avatar
  icon={
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
  }
/>

// Different Sizes
<Avatar src="/avatar.jpg" size="xs" />
<Avatar src="/avatar.jpg" size="sm" />
<Avatar src="/avatar.jpg" size="md" />
<Avatar src="/avatar.jpg" size="lg" />
<Avatar src="/avatar.jpg" size="xl" />
<Avatar src="/avatar.jpg" size="2xl" />

// Square Shape
<Avatar src="/avatar.jpg" shape="square" />

// With Status
<Avatar src="/avatar.jpg" status="online" />
<Avatar src="/avatar.jpg" status="offline" />
<Avatar src="/avatar.jpg" status="away" />
<Avatar src="/avatar.jpg" status="busy" />

// Avatar Group
<AvatarGroup
  avatars={[
    { src: '/avatar1.jpg', alt: 'User 1' },
    { src: '/avatar2.jpg', alt: 'User 2' },
    { src: '/avatar3.jpg', alt: 'User 3' },
    { src: '/avatar4.jpg', alt: 'User 4' },
    { src: '/avatar5.jpg', alt: 'User 5' }
  ]}
  max={3}
/>

// Avatar Group with Initials
<AvatarGroup
  avatars={[
    { initials: 'JD' },
    { initials: 'AB' },
    { initials: 'CD' },
    { initials: 'EF' }
  ]}
  max={3}
  size="sm"
/>

// In User Profile
<div className="flex items-center gap-3">
  <Avatar src="/avatar.jpg" size="lg" status="online" />
  <div>
    <h3 className="font-semibold">John Doe</h3>
    <p className="text-sm text-neutral-600">john@example.com</p>
  </div>
</div>

// In Comments
<div className="flex gap-3">
  <Avatar src="/avatar.jpg" size="sm" />
  <div className="flex-1">
    <div className="bg-neutral-100 rounded-lg p-3">
      <p className="font-semibold text-sm">John Doe</p>
      <p className="text-sm">This is a comment...</p>
    </div>
  </div>
</div>

// In Table
<table>
  <tr>
    <td>
      <div className="flex items-center gap-2">
        <Avatar src="/avatar.jpg" size="sm" />
        <span>John Doe</span>
      </div>
    </td>
  </tr>
</table>

// Clickable Avatar
<button onClick={() => console.log('Avatar clicked')}>
  <Avatar src="/avatar.jpg" className="hover:opacity-80 transition-opacity" />
</button>
*/
