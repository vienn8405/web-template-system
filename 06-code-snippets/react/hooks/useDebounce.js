import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 *
 * Debounce a value to limit how often it updates
 * Useful for search inputs, API calls, etc.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage Examples:
/*

// Search input with debounce
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // API call only happens after user stops typing for 500ms
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}

// Form validation with debounce
function FormComponent() {
  const [email, setEmail] = useState('');
  const debouncedEmail = useDebounce(email, 300);

  useEffect(() => {
    if (debouncedEmail) {
      validateEmail(debouncedEmail);
    }
  }, [debouncedEmail]);

  return (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}

// Window resize with debounce
function ResponsiveComponent() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const debouncedSize = useDebounce(windowSize, 200);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      Width: {debouncedSize.width}px, Height: {debouncedSize.height}px
    </div>
  );
}

*/
