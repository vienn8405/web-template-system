import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Tooltip Component
 *
 * A small popup that displays additional information on hover or focus
 * Supports multiple positions and triggers
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 */

export function Tooltip({
  children,
  content,
  position = 'top', // 'top' | 'bottom' | 'left' | 'right'
  trigger = 'hover', // 'hover' | 'click' | 'focus'
  delay = 200,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  // Calculate tooltip position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8; // Gap between trigger and tooltip

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > window.innerHeight - padding) {
      top = window.innerHeight - tooltipRect.height - padding;
    }

    setCoords({ top, left });
  };

  // Show tooltip
  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  // Hide tooltip
  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Update position when visible
  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isVisible]);

  // Event handlers based on trigger type
  const getEventHandlers = () => {
    if (trigger === 'hover') {
      return {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      };
    }
    if (trigger === 'click') {
      return {
        onClick: () => setIsVisible(!isVisible),
      };
    }
    if (trigger === 'focus') {
      return {
        onFocus: show,
        onBlur: hide,
      };
    }
    return {};
  };

  // Arrow position classes
  const arrowClasses = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-neutral-900',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-neutral-900',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-neutral-900',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-neutral-900',
  };

  return (
    <>
      {/* Trigger Element */}
      <span
        ref={triggerRef}
        {...getEventHandlers()}
        className={className}
      >
        {children}
      </span>

      {/* Tooltip Portal */}
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className="fixed z-50 px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg shadow-lg max-w-xs"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}

          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
          />
        </div>,
        document.body
      )}
    </>
  );
}

/**
 * Simple Tooltip (CSS-only, no portal)
 */
export function SimpleTooltip({
  children,
  content,
  position = 'top',
  className = '',
}) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className={`relative inline-block group ${className}`}>
      {children}
      <div
        role="tooltip"
        className={`
          absolute ${positionClasses[position]}
          px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 pointer-events-none
          whitespace-nowrap z-50
        `}
      >
        {content}
      </div>
    </div>
  );
}

// Usage Examples:

/*
// Basic Tooltip
<Tooltip content="This is a helpful tooltip">
  <button>Hover me</button>
</Tooltip>

// Different Positions
<Tooltip content="Top tooltip" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>

// Click Trigger
<Tooltip content="Click to see this" trigger="click">
  <button>Click me</button>
</Tooltip>

// Focus Trigger
<Tooltip content="Focus to see this" trigger="focus">
  <input type="text" placeholder="Focus me" />
</Tooltip>

// Custom Delay
<Tooltip content="Appears after 500ms" delay={500}>
  <button>Slow tooltip</button>
</Tooltip>

// With Icon
<Tooltip content="Additional information about this feature">
  <svg className="w-5 h-5 text-neutral-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</Tooltip>

// Simple Tooltip (CSS-only)
<SimpleTooltip content="Simple tooltip">
  <button>Hover me</button>
</SimpleTooltip>

// In Form Labels
<label className="flex items-center gap-2">
  Email Address
  <Tooltip content="We'll never share your email with anyone">
    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
</label>

// With Disabled Button
<Tooltip content="Please fill in all required fields first">
  <span className="inline-block">
    <button disabled className="opacity-50 cursor-not-allowed">
      Submit
    </button>
  </span>
</Tooltip>

// Long Content
<Tooltip content="This is a longer tooltip with more detailed information that might wrap to multiple lines">
  <button>Hover for details</button>
</Tooltip>
*/
