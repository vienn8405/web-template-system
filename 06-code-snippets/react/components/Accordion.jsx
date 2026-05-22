import React, { useState } from 'react';

/**
 * Accordion Component
 *
 * Collapsible content panels
 * Perfect for FAQs, settings, and grouped content
 *
 * @example
 * <Accordion
 *   items={[
 *     { title: 'Question 1', content: 'Answer 1' },
 *     { title: 'Question 2', content: 'Answer 2' }
 *   ]}
 * />
 */

export function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}) {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`divide-y divide-neutral-200 border border-neutral-200 rounded-lg ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          icon={item.icon}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}

/**
 * Single Accordion Item
 */
export function AccordionItem({
  title,
  content,
  icon,
  isOpen = false,
  onToggle,
  className = '',
}) {
  return (
    <div className={className}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && <span className="text-neutral-600">{icon}</span>}
          <span className="font-medium text-neutral-900">{title}</span>
        </div>

        {/* Chevron Icon */}
        <svg
          className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      <div
        className={`
          overflow-hidden transition-all duration-200
          ${isOpen ? 'max-h-96' : 'max-h-0'}
        `}
      >
        <div className="px-4 pb-4 text-neutral-600">
          {content}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple Accordion (Controlled)
 */
export function SimpleAccordion({
  title,
  children,
  defaultOpen = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-neutral-200 rounded-lg ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-neutral-200 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Usage Examples:

/*
// Basic Accordion
<Accordion
  items={[
    {
      title: 'What is your return policy?',
      content: 'You can return any item within 30 days of purchase for a full refund.'
    },
    {
      title: 'How long does shipping take?',
      content: 'Standard shipping takes 5-7 business days. Express shipping is 2-3 days.'
    },
    {
      title: 'Do you ship internationally?',
      content: 'Yes, we ship to over 100 countries worldwide.'
    }
  ]}
/>

// Allow Multiple Open
<Accordion
  allowMultiple
  items={[
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' },
    { title: 'Section 3', content: 'Content 3' }
  ]}
/>

// Default Open Items
<Accordion
  defaultOpen={[0, 2]}
  allowMultiple
  items={items}
/>

// With Icons
<Accordion
  items={[
    {
      title: 'Account Settings',
      icon: <UserIcon className="w-5 h-5" />,
      content: 'Manage your account settings here.'
    },
    {
      title: 'Privacy',
      icon: <LockIcon className="w-5 h-5" />,
      content: 'Control your privacy settings.'
    }
  ]}
/>

// FAQ Example
<div className="max-w-3xl mx-auto">
  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
  <Accordion
    items={[
      {
        title: 'How do I create an account?',
        content: 'Click the "Sign Up" button in the top right corner and fill out the registration form.'
      },
      {
        title: 'Is my data secure?',
        content: 'Yes, we use industry-standard encryption to protect your data.'
      },
      {
        title: 'Can I cancel my subscription?',
        content: 'Yes, you can cancel your subscription at any time from your account settings.'
      },
      {
        title: 'What payment methods do you accept?',
        content: 'We accept all major credit cards, PayPal, and bank transfers.'
      }
    ]}
  />
</div>

// Simple Accordion (Individual)
<SimpleAccordion title="Click to expand">
  <p>This is the content that will be shown when expanded.</p>
</SimpleAccordion>

// Multiple Simple Accordions
<div className="space-y-4">
  <SimpleAccordion title="Personal Information">
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
    </form>
  </SimpleAccordion>

  <SimpleAccordion title="Address">
    <form>
      <input type="text" placeholder="Street" />
      <input type="text" placeholder="City" />
    </form>
  </SimpleAccordion>
</div>

// With Rich Content
<Accordion
  items={[
    {
      title: 'Product Features',
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      )
    },
    {
      title: 'Technical Specifications',
      content: (
        <table className="w-full">
          <tr>
            <td className="font-semibold">Weight</td>
            <td>1.5 kg</td>
          </tr>
          <tr>
            <td className="font-semibold">Dimensions</td>
            <td>30 x 20 x 10 cm</td>
          </tr>
        </table>
      )
    }
  ]}
/>

// Settings Page Example
<div className="space-y-4">
  <h2 className="text-xl font-bold">Settings</h2>
  <Accordion
    allowMultiple
    items={[
      {
        title: 'Profile Settings',
        content: <ProfileSettingsForm />
      },
      {
        title: 'Notification Preferences',
        content: <NotificationSettings />
      },
      {
        title: 'Privacy & Security',
        content: <PrivacySettings />
      }
    ]}
  />
</div>
*/
