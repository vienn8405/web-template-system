import React from 'react';

/**
 * Toggle Switch Component
 *
 * A switch component for on/off states
 * Perfect for settings and feature toggles
 *
 * @example
 * <Toggle
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 */

export function Toggle({
  checked = false,
  onChange,
  label = '',
  description = '',
  disabled = false,
  size = 'md',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`
        flex items-start gap-3
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleChange}
        disabled={disabled}
        className={`
          ${sizeClasses[size].track}
          relative inline-flex items-center
          rounded-full transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          flex-shrink-0
          ${checked
            ? 'bg-primary-600'
            : 'bg-neutral-300'
          }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        {...props}
      >
        {/* Thumb */}
        <span
          className={`
            ${sizeClasses[size].thumb}
            inline-block rounded-full bg-white shadow-lg
            transform transition-transform duration-200 ease-in-out
            ${checked ? sizeClasses[size].translate : 'translate-x-0.5'}
          `}
        />
      </button>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <span className="block text-sm font-medium text-neutral-900">
              {label}
            </span>
          )}
          {description && (
            <span className="block text-sm text-neutral-500 mt-1">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

/**
 * ToggleGroup Component
 *
 * Group multiple toggles together
 */
export function ToggleGroup({
  items = [],
  label = '',
  helperText = '',
  disabled = false,
  size = 'md',
  className = '',
}) {
  return (
    <div className={className}>
      {/* Group Label */}
      {label && (
        <h3 className="text-sm font-medium text-neutral-700 mb-3">
          {label}
        </h3>
      )}

      {/* Toggles */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <Toggle
            key={index}
            checked={item.checked}
            onChange={item.onChange}
            label={item.label}
            description={item.description}
            disabled={disabled || item.disabled}
            size={size}
          />
        ))}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p className="mt-2 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

// Usage Examples:

/*
// Basic Toggle
<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
/>

// With Description
<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
  description="Use dark theme across the application"
/>

// Different Sizes
<Toggle size="sm" checked={value} onChange={setValue} label="Small" />
<Toggle size="md" checked={value} onChange={setValue} label="Medium" />
<Toggle size="lg" checked={value} onChange={setValue} label="Large" />

// Disabled
<Toggle
  checked={true}
  disabled
  label="This toggle is disabled"
/>

// Toggle Group (Settings Page)
<ToggleGroup
  label="Notification Settings"
  helperText="Manage how you receive notifications"
  items={[
    {
      checked: emailNotif,
      onChange: setEmailNotif,
      label: 'Email Notifications',
      description: 'Receive notifications via email'
    },
    {
      checked: pushNotif,
      onChange: setPushNotif,
      label: 'Push Notifications',
      description: 'Receive push notifications on your device'
    },
    {
      checked: smsNotif,
      onChange: setSmsNotif,
      label: 'SMS Notifications',
      description: 'Receive notifications via SMS'
    }
  ]}
/>

// Settings Card with Toggles
<div className="bg-white rounded-lg shadow p-6 space-y-4">
  <h2 className="text-lg font-semibold">Privacy Settings</h2>

  <Toggle
    checked={profilePublic}
    onChange={setProfilePublic}
    label="Public Profile"
    description="Make your profile visible to everyone"
  />

  <Toggle
    checked={showEmail}
    onChange={setShowEmail}
    label="Show Email"
    description="Display your email on your profile"
  />

  <Toggle
    checked={allowMessages}
    onChange={setAllowMessages}
    label="Allow Messages"
    description="Let other users send you messages"
  />
</div>
*/
