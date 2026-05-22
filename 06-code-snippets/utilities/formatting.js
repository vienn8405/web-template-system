/**
 * Formatting Utilities
 *
 * Common formatting functions for display
 */

/**
 * Format currency
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format number with thousands separator
 */
export function formatNumber(number, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Format date
 */
export function formatDate(date, format = 'short', locale = 'en-US') {
  const d = new Date(date);

  const formats = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  };

  return new Intl.DateTimeFormat(locale, formats[format] || formats.short).format(d);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone, format = 'US') {
  const digits = phone.replace(/\D/g, '');

  if (format === 'US' && digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (format === 'US' && digits.length === 11) {
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return phone;
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format percentage
 */
export function formatPercentage(value, decimals = 0) {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength, suffix = '...') {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter
 */
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Title case (capitalize each word)
 */
export function titleCase(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Slugify text (for URLs)
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format credit card number
 */
export function formatCreditCard(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

/**
 * Mask credit card (show last 4 digits)
 */
export function maskCreditCard(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 4) return cardNumber;
  return '**** **** **** ' + digits.slice(-4);
}

/**
 * Mask email (show first 2 and domain)
 */
export function maskEmail(email) {
  const [name, domain] = email.split('@');
  if (name.length <= 2) return email;
  return name.slice(0, 2) + '***@' + domain;
}

/**
 * Format duration (seconds to readable format)
 */
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

// Usage Examples:
/*

// Currency
formatCurrency(1234.56);           // "$1,234.56"
formatCurrency(1234.56, 'EUR');    // "€1,234.56"

// Number
formatNumber(1234567);             // "1,234,567"

// Date
formatDate(new Date());            // "Jan 15, 2026"
formatDate(new Date(), 'long');    // "January 15, 2026"
formatDate(new Date(), 'full');    // "Wednesday, January 15, 2026"

// Relative time
formatRelativeTime(new Date(Date.now() - 3600000));  // "1 hour ago"

// Phone
formatPhoneNumber('5551234567');   // "(555) 123-4567"

// File size
formatFileSize(1536);              // "1.5 KB"
formatFileSize(1048576);           // "1 MB"

// Percentage
formatPercentage(0.856);           // "86%"
formatPercentage(0.856, 2);        // "85.60%"

// Text
truncate('Long text here', 10);    // "Long te..."
capitalize('hello world');         // "Hello world"
titleCase('hello world');          // "Hello World"
slugify('Hello World!');           // "hello-world"

// Credit card
formatCreditCard('4532123456789012');     // "4532 1234 5678 9012"
maskCreditCard('4532123456789012');       // "**** **** **** 9012"

// Email
maskEmail('john.doe@example.com');        // "jo***@example.com"

// Duration
formatDuration(3665);              // "1h 1m 5s"

// React component example
function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <p>{truncate(product.description, 100)}</p>
      <p>Size: {formatFileSize(product.fileSize)}</p>
      <p>Added {formatRelativeTime(product.createdAt)}</p>
    </div>
  );
}

*/
