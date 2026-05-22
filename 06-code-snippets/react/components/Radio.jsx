import React from 'react';

/**
 * Radio Button Component
 *
 * A single radio button with label and description
 * Should be used within RadioGroup for proper functionality
 *
 * @example
 * <Radio
 *   checked={value === 'option1'}
 *   onChange={() => setValue('option1')}
 *   label="Option 1"
 * />
 */

export function Radio({
  checked = false,
  onChange,
  label = '',
  description = '',
  disabled = false,
  error = false,
  size = 'md',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <label
      className={`
        flex items-start gap-3
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Radio Input */}
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`
          ${sizeClasses[size]}
          rounded-full border-2
          transition-all duration-200
          flex-shrink-0 mt-0.5
          ${error
            ? 'border-error-500 text-error-600 focus:ring-error-500'
            : 'border-neutral-300 text-primary-600 focus:ring-primary-500'
          }
          ${disabled
            ? 'bg-neutral-100 cursor-not-allowed'
            : 'bg-white hover:border-primary-400 cursor-pointer'
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
        {...props}
      />

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <span className={`block text-sm font-medium ${error ? 'text-error-700' : 'text-neutral-900'}`}>
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
 * RadioGroup Component
 *
 * Group multiple radio buttons together
 * Handles single selection logic
 *
 * @example
 * <RadioGroup
 *   options={[
 *     { value: 'card', label: 'Credit Card' },
 *     { value: 'paypal', label: 'PayPal' }
 *   ]}
 *   value={paymentMethod}
 *   onChange={setPaymentMethod}
 * />
 */

export function RadioGroup({
  options = [],
  value,
  onChange,
  label = '',
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  orientation = 'vertical',
  size = 'md',
  className = '',
  name,
}) {
  const handleChange = (optionValue) => {
    if (!disabled && onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={className}>
      {/* Group Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      {/* Radio Buttons */}
      <div
        className={`
          ${orientation === 'vertical' ? 'space-y-3' : 'flex flex-wrap gap-4'}
        `}
        role="radiogroup"
        aria-label={label}
        aria-required={required}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
            error={error}
            size={size}
          />
        ))}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p className={`mt-2 text-sm ${error ? 'text-error-500' : 'text-neutral-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * RadioCard Component
 *
 * Radio button styled as a card for better visual hierarchy
 * Great for pricing plans, feature selections, etc.
 */

export function RadioCard({
  checked = false,
  onChange,
  title = '',
  description = '',
  icon,
  badge,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <label
      className={`
        relative block p-4 border-2 rounded-lg cursor-pointer
        transition-all duration-200
        ${checked
          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
        }
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Radio Input */}
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="w-5 h-5 mt-0.5 border-2 border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-2 focus:ring-offset-2"
          {...props}
        />

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon && <span className="text-neutral-600">{icon}</span>}
              <span className="font-semibold text-neutral-900">{title}</span>
            </div>
            {badge && (
              <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-neutral-600">{description}</p>
          )}
        </div>
      </div>
    </label>
  );
}

// Usage Examples:

/*
// Basic Radio Group
<RadioGroup
  label="Payment Method"
  required
  options={[
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' }
  ]}
  value={paymentMethod}
  onChange={setPaymentMethod}
/>

// With Descriptions
<RadioGroup
  label="Shipping Method"
  options={[
    {
      value: 'standard',
      label: 'Standard Shipping',
      description: '5-7 business days • Free'
    },
    {
      value: 'express',
      label: 'Express Shipping',
      description: '2-3 business days • $10'
    },
    {
      value: 'overnight',
      label: 'Overnight',
      description: 'Next business day • $25'
    }
  ]}
  value={shipping}
  onChange={setShipping}
/>

// Horizontal Layout
<RadioGroup
  label="Size"
  orientation="horizontal"
  options={[
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' }
  ]}
  value={size}
  onChange={setSize}
/>

// With Error
<RadioGroup
  label="Gender"
  required
  error
  helperText="Please select your gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]}
  value={gender}
  onChange={setGender}
/>

// Radio Cards (for Pricing Plans)
<div className="space-y-3">
  <RadioCard
    checked={plan === 'basic'}
    onChange={() => setPlan('basic')}
    title="Basic Plan"
    description="Perfect for individuals"
    badge="$9/mo"
  />
  <RadioCard
    checked={plan === 'pro'}
    onChange={() => setPlan('pro')}
    title="Pro Plan"
    description="For small teams"
    badge="$29/mo"
  />
  <RadioCard
    checked={plan === 'enterprise'}
    onChange={() => setPlan('enterprise')}
    title="Enterprise"
    description="For large organizations"
    badge="Custom"
  />
</div>

// Different Sizes
<RadioGroup
  size="sm"
  options={options}
  value={value}
  onChange={setValue}
/>
*/
