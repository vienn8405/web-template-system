import React from 'react';

/**
 * Checkbox Component
 *
 * A customizable checkbox with label and description support
 * Supports checked, indeterminate, and disabled states
 *
 * @example
 * <Checkbox
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   label="Accept terms and conditions"
 * />
 */

export function Checkbox({
  checked = false,
  onChange,
  label = '',
  description = '',
  disabled = false,
  indeterminate = false,
  error = false,
  required = false,
  size = 'md',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
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
      {/* Checkbox Input */}
      <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          ref={(input) => {
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
          className={`
            ${sizeClasses[size]}
            rounded border-2
            transition-all duration-200
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

        {/* Custom Checkmark for Indeterminate */}
        {indeterminate && (
          <div className="absolute pointer-events-none">
            <svg
              className={`${sizeClasses[size]} text-primary-600`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <rect x="4" y="9" width="12" height="2" rx="1" />
            </svg>
          </div>
        )}
      </div>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <span className={`block text-sm font-medium ${error ? 'text-error-700' : 'text-neutral-900'}`}>
              {label}
              {required && <span className="text-error-500 ml-1">*</span>}
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
 * CheckboxGroup Component
 *
 * Group multiple checkboxes together
 */
export function CheckboxGroup({
  options = [],
  value = [],
  onChange,
  label = '',
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  className = '',
}) {
  const handleChange = (optionValue, isChecked) => {
    if (isChecked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
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

      {/* Checkboxes */}
      <div className="space-y-3">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={value.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
            error={error}
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

// Usage Examples:

/*
// Basic Checkbox
<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the terms and conditions"
/>

// With Description
<Checkbox
  checked={newsletter}
  onChange={setNewsletter}
  label="Subscribe to newsletter"
  description="Get weekly updates about new features and products"
/>

// Required Checkbox
<Checkbox
  checked={accepted}
  onChange={setAccepted}
  label="Accept privacy policy"
  required
/>

// Indeterminate State (for "Select All")
<Checkbox
  checked={allSelected}
  indeterminate={someSelected}
  onChange={handleSelectAll}
  label="Select all items"
/>

// Disabled
<Checkbox
  checked={true}
  disabled
  label="This option is disabled"
/>

// With Error
<Checkbox
  checked={false}
  onChange={setChecked}
  label="Required field"
  error
  required
/>

// Different Sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// Checkbox Group
<CheckboxGroup
  label="Select your interests"
  required
  options={[
    { value: 'tech', label: 'Technology', description: 'Latest tech news' },
    { value: 'design', label: 'Design', description: 'UI/UX trends' },
    { value: 'business', label: 'Business', description: 'Business insights' }
  ]}
  value={interests}
  onChange={setInterests}
/>

// Checkbox Group with Error
<CheckboxGroup
  label="Required selections"
  required
  error
  helperText="Please select at least one option"
  options={options}
  value={selected}
  onChange={setSelected}
/>
*/
