import React, { useState, useRef, useEffect } from 'react';

/**
 * Select Dropdown Component
 *
 * A custom select dropdown with search functionality
 * Supports single and multi-select modes
 *
 * @example
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   placeholder="Select an option"
 * />
 */

export function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  searchable = false,
  multiple = false,
  disabled = false,
  error = false,
  helperText = '',
  label = '',
  required = false,
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get selected option(s) label
  const getSelectedLabel = () => {
    if (!value) return placeholder;

    if (multiple) {
      const selectedOptions = options.filter(opt => value.includes(opt.value));
      return selectedOptions.length > 0
        ? selectedOptions.map(opt => opt.label).join(', ')
        : placeholder;
    }

    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  // Handle option selection
  const handleSelect = (optionValue) => {
    if (multiple) {
      const newValue = value?.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...(value || []), optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Check if option is selected
  const isSelected = (optionValue) => {
    if (multiple) {
      return value?.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left
          bg-white border rounded-lg
          flex items-center justify-between
          transition-all duration-200
          ${error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
          }
          ${disabled
            ? 'bg-neutral-100 cursor-not-allowed opacity-60'
            : 'hover:border-neutral-400 cursor-pointer'
          }
          ${isOpen ? 'ring-2 ring-offset-2' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...props}
      >
        <span className={value ? 'text-neutral-900' : 'text-neutral-400'}>
          {getSelectedLabel()}
        </span>

        {/* Arrow Icon */}
        <svg
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-neutral-200">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto max-h-48" role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-neutral-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-4 py-3 text-left text-sm
                    flex items-center justify-between
                    transition-colors duration-150
                    ${isSelected(option.value)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-900 hover:bg-neutral-50'
                    }
                  `}
                  role="option"
                  aria-selected={isSelected(option.value)}
                >
                  <span>{option.label}</span>

                  {/* Checkmark for selected */}
                  {isSelected(option.value) && (
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Helper Text / Error Message */}
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
// Basic Single Select
<Select
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ]}
  value={country}
  onChange={setCountry}
  placeholder="Select country"
/>

// With Label and Required
<Select
  label="Country"
  required
  options={countries}
  value={country}
  onChange={setCountry}
/>

// Searchable Select
<Select
  searchable
  options={longListOfOptions}
  value={selected}
  onChange={setSelected}
  placeholder="Search and select..."
/>

// Multi-Select
<Select
  multiple
  options={skills}
  value={selectedSkills}
  onChange={setSelectedSkills}
  placeholder="Select skills"
/>

// With Error
<Select
  label="Category"
  required
  error
  helperText="Please select a category"
  options={categories}
  value={category}
  onChange={setCategory}
/>

// Disabled
<Select
  disabled
  options={options}
  value={value}
  onChange={setValue}
/>
*/
