/**
 * Array and Object Utilities
 *
 * Helper functions for working with arrays and objects
 */

/**
 * Group array of objects by key
 */
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

/**
 * Sort array of objects by key
 */
export function sortBy(array, key, order = 'asc') {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Remove duplicates from array
 */
export function unique(array) {
  return [...new Set(array)];
}

/**
 * Remove duplicates from array of objects by key
 */
export function uniqueBy(array, key) {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Chunk array into smaller arrays
 */
export function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flatten nested array
 */
export function flatten(array) {
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

/**
 * Get random item from array
 */
export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Deep merge objects
 */
export function deepMerge(target, ...sources) {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Pick specific keys from object
 */
export function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

/**
 * Omit specific keys from object
 */
export function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Check if object is empty
 */
export function isEmpty(obj) {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
}

/**
 * Get nested object value safely
 */
export function get(obj, path, defaultValue = undefined) {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

/**
 * Set nested object value
 */
export function set(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;

  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sleep/delay function
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage Examples:
/*

// Group by
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];
groupBy(users, 'role');
// { admin: [...], user: [...] }

// Sort by
sortBy(users, 'name');           // Sort ascending
sortBy(users, 'name', 'desc');   // Sort descending

// Unique
unique([1, 2, 2, 3, 3, 4]);      // [1, 2, 3, 4]
uniqueBy(users, 'role');         // Remove duplicate roles

// Chunk
chunk([1, 2, 3, 4, 5], 2);       // [[1, 2], [3, 4], [5]]

// Flatten
flatten([1, [2, [3, [4]]]]);     // [1, 2, 3, 4]

// Random & Shuffle
randomItem([1, 2, 3, 4]);        // Random item
shuffle([1, 2, 3, 4]);           // Shuffled array

// Object operations
const user = { name: 'John', age: 30, email: 'john@example.com' };
pick(user, ['name', 'email']);   // { name: 'John', email: '...' }
omit(user, ['age']);             // { name: 'John', email: '...' }

// Nested object access
const data = { user: { profile: { name: 'John' } } };
get(data, 'user.profile.name');  // 'John'
get(data, 'user.profile.age', 0); // 0 (default)

set(data, 'user.profile.age', 30);

// Deep clone
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// Deep merge
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
deepMerge(obj1, obj2);
// { a: 1, b: { c: 2, d: 3 }, e: 4 }

// Debounce & Throttle
const handleSearch = debounce((query) => {
  console.log('Searching:', query);
}, 500);

const handleScroll = throttle(() => {
  console.log('Scrolling...');
}, 1000);

// Generate ID
generateId();                    // "id_1234567890_abc123def"
generateId('user');              // "user_1234567890_abc123def"

// Sleep
async function example() {
  console.log('Start');
  await sleep(2000);
  console.log('After 2 seconds');
}

// React example
function UserList({ users }) {
  const groupedUsers = groupBy(users, 'role');

  return (
    <div>
      {Object.entries(groupedUsers).map(([role, users]) => (
        <div key={role}>
          <h3>{role}</h3>
          {users.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

*/
