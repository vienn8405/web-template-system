import { useState, useEffect } from 'react';

/**
 * useLocalStorage Hook
 *
 * Persist state to localStorage with automatic sync
 *
 * @example
 * const [name, setName] = useLocalStorage('userName', 'Guest');
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Usage Examples:
/*

// Basic usage
const [name, setName] = useLocalStorage('userName', 'Guest');

// With object
const [user, setUser] = useLocalStorage('user', {
  name: '',
  email: '',
  preferences: {}
});

// Update value
setName('John Doe');

// Update with function
setUser(prev => ({
  ...prev,
  name: 'John'
}));

// Clear value
setName(null);

*/
