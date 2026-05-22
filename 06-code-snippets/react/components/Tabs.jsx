import React, { useState } from 'react';

/**
 * Tabs Component
 *
 * A tabbed interface for organizing content into separate views
 * Supports different variants and orientations
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
 *   ]}
 * />
 */

export function Tabs({
  tabs = [],
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'underline', // 'underline' | 'pills' | 'enclosed'
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  fullWidth = false,
  className = '',
}) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);

  // Use controlled or uncontrolled state
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (tabId) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  // Variant styles
  const getTabButtonClasses = (tab) => {
    const isActive = activeTab === tab.id;
    const baseClasses = 'px-4 py-2 font-medium text-sm transition-all duration-200 focus:outline-none';

    if (variant === 'underline') {
      return `
        ${baseClasses}
        border-b-2
        ${isActive
          ? 'border-primary-600 text-primary-600'
          : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
        }
      `;
    }

    if (variant === 'pills') {
      return `
        ${baseClasses}
        rounded-lg
        ${isActive
          ? 'bg-primary-600 text-white'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
        }
      `;
    }

    if (variant === 'enclosed') {
      return `
        ${baseClasses}
        border border-neutral-300 rounded-t-lg -mb-px
        ${isActive
          ? 'bg-white border-b-white text-primary-600'
          : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
        }
      `;
    }

    return baseClasses;
  };

  const tabListClasses = `
    flex
    ${orientation === 'vertical' ? 'flex-col space-y-1' : 'space-x-1'}
    ${variant === 'underline' ? 'border-b border-neutral-200' : ''}
    ${fullWidth && orientation === 'horizontal' ? 'w-full' : ''}
  `;

  return (
    <div className={`${orientation === 'vertical' ? 'flex gap-6' : ''} ${className}`}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation={orientation}
        className={tabListClasses}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`
              ${getTabButtonClasses(tab)}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${fullWidth && orientation === 'horizontal' ? 'flex-1' : ''}
            `}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-neutral-200 text-neutral-700 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className={`
          ${orientation === 'vertical' ? 'flex-1' : 'mt-4'}
          ${variant === 'enclosed' ? 'border border-neutral-300 rounded-b-lg rounded-tr-lg p-4' : ''}
        `}
      >
        {activeTabContent}
      </div>
    </div>
  );
}

/**
 * Simple Tab Button (for custom implementations)
 */
export function TabButton({
  active = false,
  onClick,
  children,
  disabled = false,
  className = '',
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 font-medium text-sm
        border-b-2 transition-all duration-200
        focus:outline-none
        ${active
          ? 'border-primary-600 text-primary-600'
          : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// Usage Examples:

/*
// Basic Tabs (Underline variant)
<Tabs
  tabs={[
    {
      id: 'profile',
      label: 'Profile',
      content: <div>Profile content here</div>
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <div>Settings content here</div>
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: <div>Notifications content here</div>
    }
  ]}
/>

// Pills Variant
<Tabs
  variant="pills"
  tabs={[
    { id: 'all', label: 'All', content: <AllProducts /> },
    { id: 'active', label: 'Active', content: <ActiveProducts /> },
    { id: 'draft', label: 'Draft', content: <DraftProducts /> }
  ]}
/>

// Enclosed Variant
<Tabs
  variant="enclosed"
  tabs={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'analytics', label: 'Analytics', content: <Analytics /> },
    { id: 'reports', label: 'Reports', content: <Reports /> }
  ]}
/>

// With Icons
<Tabs
  tabs={[
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon />,
      content: <HomePage />
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageIcon />,
      badge: '3',
      content: <MessagesPage />
    }
  ]}
/>

// Vertical Tabs
<Tabs
  orientation="vertical"
  tabs={[
    { id: 'general', label: 'General', content: <GeneralSettings /> },
    { id: 'security', label: 'Security', content: <SecuritySettings /> },
    { id: 'billing', label: 'Billing', content: <BillingSettings /> }
  ]}
/>

// Full Width Tabs
<Tabs
  fullWidth
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <Content1 /> },
    { id: 'tab2', label: 'Tab 2', content: <Content2 /> },
    { id: 'tab3', label: 'Tab 3', content: <Content3 /> }
  ]}
/>

// Controlled Tabs
const [activeTab, setActiveTab] = useState('tab1');

<Tabs
  activeTab={activeTab}
  onChange={setActiveTab}
  tabs={tabs}
/>

// With Disabled Tab
<Tabs
  tabs={[
    { id: 'tab1', label: 'Available', content: <Content1 /> },
    { id: 'tab2', label: 'Coming Soon', content: null, disabled: true },
    { id: 'tab3', label: 'Active', content: <Content3 /> }
  ]}
/>
*/
