import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Toast Notification Component
 *
 * Temporary notification messages that appear and auto-dismiss
 * Supports different types and positions
 *
 * @example
 * const { showToast } = useToast();
 * showToast({ message: 'Success!', type: 'success' });
 */

// Toast Container Component
let toastId = 0;

export function ToastContainer({ position = 'top-right' }) {
  const [toasts, setToasts] = useState([]);

  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  // Add toast
  const addToast = (toast) => {
    const id = toastId++;
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto dismiss
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  };

  // Remove toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Expose methods globally
  useEffect(() => {
    window.__toastMethods = { addToast, removeToast };
    return () => {
      delete window.__toastMethods;
    };
  }, []);

  return createPortal(
    <div className={`fixed ${positionClasses[position]} z-50 space-y-2`}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
}

// Individual Toast Component
export function Toast({
  type = 'info',
  message,
  title,
  icon,
  onClose,
  action,
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  // Type configurations
  const typeConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border rounded-lg shadow-lg p-4 min-w-[320px] max-w-md
        flex items-start gap-3
        transition-all duration-300
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      role="alert"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {icon || config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold text-sm mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm">
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Hook for using toasts
export function useToast() {
  const showToast = (options) => {
    if (window.__toastMethods) {
      return window.__toastMethods.addToast(options);
    }
    console.warn('ToastContainer not found. Please add <ToastContainer /> to your app.');
  };

  const hideToast = (id) => {
    if (window.__toastMethods) {
      window.__toastMethods.removeToast(id);
    }
  };

  return { showToast, hideToast };
}

// Usage Examples:

/*
// 1. Add ToastContainer to your App root
function App() {
  return (
    <>
      <YourApp />
      <ToastContainer position="top-right" />
    </>
  );
}

// 2. Use the hook in your components
function MyComponent() {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast({
      type: 'success',
      message: 'Your changes have been saved!',
      duration: 3000
    });
  };

  const handleError = () => {
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      duration: 5000
    });
  };

  const handleWarning = () => {
    showToast({
      type: 'warning',
      message: 'Your session will expire in 5 minutes',
      duration: 0 // Won't auto-dismiss
    });
  };

  const handleInfo = () => {
    showToast({
      type: 'info',
      message: 'New features are available!',
      action: {
        label: 'Learn More',
        onClick: () => console.log('Learn more clicked')
      }
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={handleInfo}>Show Info</button>
    </div>
  );
}

// Different positions
<ToastContainer position="top-left" />
<ToastContainer position="top-center" />
<ToastContainer position="top-right" />
<ToastContainer position="bottom-left" />
<ToastContainer position="bottom-center" />
<ToastContainer position="bottom-right" />

// With custom duration
showToast({
  type: 'success',
  message: 'Quick message',
  duration: 2000 // 2 seconds
});

// Persistent (no auto-dismiss)
showToast({
  type: 'warning',
  message: 'Important message',
  duration: 0 // Won't auto-dismiss
});

// With action button
showToast({
  type: 'info',
  message: 'You have a new message',
  action: {
    label: 'View',
    onClick: () => navigate('/messages')
  }
});

// With title
showToast({
  type: 'error',
  title: 'Upload Failed',
  message: 'The file size exceeds the maximum limit of 10MB'
});
*/
