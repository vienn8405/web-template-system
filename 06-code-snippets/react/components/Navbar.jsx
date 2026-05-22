import React, { useState } from 'react';

/**
 * Navbar Component
 *
 * A responsive navigation bar with mobile menu support.
 * Follows the design system and includes common navigation patterns.
 *
 * @example
 * <Navbar logo="MyBrand">
 *   <Navbar.Link href="/">Home</Navbar.Link>
 *   <Navbar.Link href="/about">About</Navbar.Link>
 * </Navbar>
 */

export function Navbar({
  children,
  logo,
  logoHref = '/',
  className = '',
  ...props
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href={logoHref} className="text-xl font-bold text-primary-600">
              {logo}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {children}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {children}
          </div>
        </div>
      )}
    </nav>
  );
}

// Navbar Link
Navbar.Link = function NavbarLink({
  href,
  children,
  active = false,
  className = '',
  ...props
}) {
  return (
    <a
      href={href}
      className={`
        block md:inline-block
        px-3 py-2 rounded-lg
        text-base font-medium
        transition-colors duration-200
        ${active
          ? 'text-primary-600 bg-primary-50'
          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};

// Navbar Button
Navbar.Button = function NavbarButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  };

  return (
    <button
      className={`
        block md:inline-block w-full md:w-auto
        px-4 py-2 rounded-lg
        font-medium text-center
        transition-colors duration-200
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

// Navbar Dropdown
Navbar.Dropdown = function NavbarDropdown({
  label,
  children,
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1
          px-3 py-2 rounded-lg
          text-base font-medium text-gray-700
          hover:text-primary-600 hover:bg-gray-50
          transition-colors duration-200
          ${className}
        `}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {children}
        </div>
      )}
    </div>
  );
};

// Navbar Dropdown Item
Navbar.DropdownItem = function NavbarDropdownItem({
  href,
  children,
  className = '',
  ...props
}) {
  return (
    <a
      href={href}
      className={`
        block px-4 py-2
        text-sm text-gray-700
        hover:bg-gray-50 hover:text-primary-600
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};

// Usage Examples:
/*

// Basic Navbar
<Navbar logo="MyBrand">
  <Navbar.Link href="/" active>Home</Navbar.Link>
  <Navbar.Link href="/about">About</Navbar.Link>
  <Navbar.Link href="/services">Services</Navbar.Link>
  <Navbar.Link href="/contact">Contact</Navbar.Link>
</Navbar>

// Navbar with Button
<Navbar logo="MyBrand">
  <Navbar.Link href="/">Home</Navbar.Link>
  <Navbar.Link href="/features">Features</Navbar.Link>
  <Navbar.Link href="/pricing">Pricing</Navbar.Link>
  <Navbar.Button variant="primary">
    Get Started
  </Navbar.Button>
</Navbar>

// Navbar with Dropdown
<Navbar logo="MyBrand">
  <Navbar.Link href="/">Home</Navbar.Link>

  <Navbar.Dropdown label="Products">
    <Navbar.DropdownItem href="/products/web">Web Apps</Navbar.DropdownItem>
    <Navbar.DropdownItem href="/products/mobile">Mobile Apps</Navbar.DropdownItem>
    <Navbar.DropdownItem href="/products/desktop">Desktop Apps</Navbar.DropdownItem>
  </Navbar.Dropdown>

  <Navbar.Dropdown label="Resources">
    <Navbar.DropdownItem href="/docs">Documentation</Navbar.DropdownItem>
    <Navbar.DropdownItem href="/blog">Blog</Navbar.DropdownItem>
    <Navbar.DropdownItem href="/support">Support</Navbar.DropdownItem>
  </Navbar.Dropdown>

  <Navbar.Link href="/pricing">Pricing</Navbar.Link>
  <Navbar.Button variant="outline">Sign In</Navbar.Button>
  <Navbar.Button variant="primary">Sign Up</Navbar.Button>
</Navbar>

// Navbar with Logo Image
<Navbar
  logo={
    <img src="/logo.png" alt="Company Logo" className="h-8" />
  }
>
  <Navbar.Link href="/">Home</Navbar.Link>
  <Navbar.Link href="/about">About</Navbar.Link>
</Navbar>

// Navbar with Icons
<Navbar logo="MyBrand">
  <Navbar.Link href="/">
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Home
    </div>
  </Navbar.Link>
  <Navbar.Link href="/search">
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      Search
    </div>
  </Navbar.Link>
</Navbar>

// Sticky Navbar
<Navbar logo="MyBrand" className="sticky top-0 z-50 shadow-sm">
  <Navbar.Link href="/">Home</Navbar.Link>
  <Navbar.Link href="/about">About</Navbar.Link>
  <Navbar.Link href="/contact">Contact</Navbar.Link>
</Navbar>

// Dark Navbar
<Navbar
  logo="MyBrand"
  className="bg-gray-900 border-gray-800"
>
  <Navbar.Link href="/" className="text-gray-300 hover:text-white hover:bg-gray-800">
    Home
  </Navbar.Link>
  <Navbar.Link href="/about" className="text-gray-300 hover:text-white hover:bg-gray-800">
    About
  </Navbar.Link>
  <Navbar.Button variant="primary">
    Get Started
  </Navbar.Button>
</Navbar>

*/
