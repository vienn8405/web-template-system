/**
 * Validation Utilities
 *
 * Common validation functions for forms
 */

/**
 * Validate email address
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (flexible format)
 */
export function isValidPhone(phone) {
  const regex = /^[\d\s\-\+\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return regex.test(phone) && digitsOnly.length >= 10;
}

/**
 * Validate URL
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate password strength
 * Returns: { valid: boolean, strength: 'weak'|'medium'|'strong', errors: string[] }
 */
export function validatePassword(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  const errors = [];
  let strength = 'weak';

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Calculate strength
  if (errors.length === 0) {
    if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
      strength = 'strong';
    } else if (password.length >= minLength) {
      strength = 'medium';
    }
  }

  return {
    valid: errors.length === 0,
    strength,
    errors,
  };
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function isValidCreditCard(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');

  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate required field
 */
export function isRequired(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validate minimum length
 */
export function minLength(value, min) {
  return value.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(value, max) {
  return value.length <= max;
}

/**
 * Validate number range
 */
export function inRange(value, min, max) {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Validate date is in the past
 */
export function isPastDate(date) {
  return new Date(date) < new Date();
}

/**
 * Validate date is in the future
 */
export function isFutureDate(date) {
  return new Date(date) > new Date();
}

/**
 * Validate age (minimum)
 */
export function isMinimumAge(birthDate, minimumAge = 18) {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minimumAge;
  }

  return age >= minimumAge;
}

// Usage Examples:
/*

// Email validation
const email = 'user@example.com';
if (isValidEmail(email)) {
  console.log('Valid email');
}

// Phone validation
const phone = '+1 (555) 123-4567';
if (isValidPhone(phone)) {
  console.log('Valid phone');
}

// Password validation
const password = 'MyP@ssw0rd123';
const result = validatePassword(password);
if (result.valid) {
  console.log(`Password strength: ${result.strength}`);
} else {
  console.log('Errors:', result.errors);
}

// Form validation example
function validateForm(formData) {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = 'Name is required';
  }

  if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (!isValidPhone(formData.phone)) {
    errors.phone = 'Invalid phone number';
  }

  const passwordResult = validatePassword(formData.password);
  if (!passwordResult.valid) {
    errors.password = passwordResult.errors[0];
  }

  if (!isMinimumAge(formData.birthDate, 18)) {
    errors.birthDate = 'Must be at least 18 years old';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

// React form validation
function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    const passwordResult = validatePassword(formData.password);
    if (!passwordResult.valid) {
      newErrors.password = passwordResult.errors[0];
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Invalid phone';
    }

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form is valid!');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      {errors.email && <span>{errors.email}</span>}

      {/* More fields... *\/}
    </form>
  );
}

*/
