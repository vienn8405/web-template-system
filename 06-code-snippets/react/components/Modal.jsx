import React, { useEffect, useRef } from 'react';

/**
 * Modal Component
 *
 * A modal dialog component with backdrop and animations.
 * Supports different sizes and configurations.
 *
 * @example
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <Modal.Header>
 *     <Modal.Title>Modal Title</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Body>
 *     Modal content goes here
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 */

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  className = '',
  ...props
}) {
  const modalRef = useRef(null);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`
          bg-white rounded-lg shadow-xl
          w-full ${sizeClasses[size]}
          animate-slideUp
          focus:outline-none
          ${className}
        `}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

// Modal Header
Modal.Header = function ModalHeader({ children, onClose, className = '', ...props }) {
  return (
    <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Modal Title
Modal.Title = function ModalTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h2>
  );
};

// Modal Body
Modal.Body = function ModalBody({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Modal Footer
Modal.Footer = function ModalFooter({ children, className = '', ...props }) {
  return (
    <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Add animations to your global CSS or Tailwind config:
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}
*/

// Usage Examples:
/*

// Basic Modal
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header onClose={() => setIsOpen(false)}>
    <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>This is the modal content.</p>
  </Modal.Body>
  <Modal.Footer>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
    >
      Confirm
    </button>
  </Modal.Footer>
</Modal>

// Confirmation Modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
  <Modal.Header onClose={() => setIsOpen(false)}>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className="text-gray-600">
      Are you sure you want to delete this item? This action cannot be undone.
    </p>
  </Modal.Body>
  <Modal.Footer>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Delete
    </button>
  </Modal.Footer>
</Modal>

// Form Modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
  <Modal.Header onClose={() => setIsOpen(false)}>
    <Modal.Title>Create New User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Enter email"
        />
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      onClick={handleSubmit}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
    >
      Create User
    </button>
  </Modal.Footer>
</Modal>

// Large Content Modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
  <Modal.Header onClose={() => setIsOpen(false)}>
    <Modal.Title>Terms and Conditions</Modal.Title>
  </Modal.Header>
  <Modal.Body className="max-h-96 overflow-y-auto">
    <div className="prose">
      <p>Long content goes here...</p>
      <p>More content...</p>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
    >
      I Agree
    </button>
  </Modal.Footer>
</Modal>

// Modal without backdrop close
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  closeOnBackdrop={false}
  closeOnEsc={false}
>
  <Modal.Header>
    <Modal.Title>Important Action</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>You must make a choice to continue.</p>
  </Modal.Body>
  <Modal.Footer>
    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
      Proceed
    </button>
  </Modal.Footer>
</Modal>

*/
