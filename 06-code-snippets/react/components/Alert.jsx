import React, { useState, useEffect } from 'react';

/**
 * Alert Component
 *
 * A flexible alert component for displaying messages.
 * Supports different variants and can be dismissible.
 *
 * @example
 * <Alert variant="success" onClose={() => setShow(false)}>
 *   Operation completed successfully!
 * </Alert>
 */

export function Alert({
  children,
  variant = 'info',
  dismissible = false,
  onClose,
  icon,
  title,
  className = '',
  autoClose,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto close after specified time
  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  // Variant styles
  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  // Icon colors
  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  // Default icons
  const defaultIcons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  const displayIcon = icon || defaultIcons[variant];

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border
        ${variantClasses[variant]}
        ${className}
      `}
      role="alert"
      {...props}
    >
      {/* Icon */}
      {displayIcon && (
        <div className={`flex-shrink-0 ${iconColors[variant]}`}>
          {displayIcon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="font-semibold mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>

      {/* Close Button */}
      {dismissible && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${iconColors[variant]} hover:opacity-70 transition-opacity`}
          aria-label="Close alert"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Usage Examples:
/*

// Success Alert
<Alert variant="success">
  Your changes have been saved successfully!
</Alert>

// Error Alert
<Alert variant="error" title="Error">
  There was a problem processing your request.
</Alert>

// Warning Alert
<Alert variant="warning" dismissible onClose={() => console.log('Closed')}>
  Your session will expire in 5 minutes.
</Alert>

// Info Alert
<Alert variant="info" title="New Feature">
  Check out our new dashboard redesign!
</Alert>

// Dismissible Alert
const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert
    variant="success"
    dismissible
    onClose={() => setShowAlert(false)}
  >
    Operation completed successfully!
  </Alert>
)}

// Auto-close Alert (closes after 5 seconds)
<Alert
  variant="info"
  autoClose={5000}
  onClose={() => console.log('Alert closed')}
>
  This alert will close automatically in 5 seconds.
</Alert>

// Alert with Custom Icon
<Alert
  variant="info"
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
>
  Custom icon alert
</Alert>

// Alert with Title and Description
<Alert variant="error" title="Payment Failed" dismissible>
  <p>Your payment could not be processed. Please check your card details and try again.</p>
  <button className="mt-2 text-sm font-medium underline">
    Update Payment Method
  </button>
</Alert>

// Alert with Actions
<Alert variant="warning" title="Update Available">
  <p className="mb-3">A new version of the app is available.</p>
  <div className="flex gap-2">
    <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
      Update Now
    </button>
    <button className="px-3 py-1 border border-yellow-600 text-yellow-800 text-sm rounded hover:bg-yellow-100">
      Later
    </button>
  </div>
</Alert>

// Simple Alert without Icon
<Alert variant="info" icon={null}>
  Simple message without icon
</Alert>

// Alert List
<div className="space-y-3">
  <Alert variant="success">Success message</Alert>
  <Alert variant="error">Error message</Alert>
  <Alert variant="warning">Warning message</Alert>
  <Alert variant="info">Info message</Alert>
</div>

*/
