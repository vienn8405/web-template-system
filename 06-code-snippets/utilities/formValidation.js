/**
 * Form Validation Utilities
 *
 * Comprehensive validation functions for forms
 * Includes common validators and custom validation support
 */

/**
 * Email Validation
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!re.test(email)) return 'Invalid email format';
  return null;
};

/**
 * Password Validation
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = false,
  } = options;

  if (!password) return 'Password is required';
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  if (requireUppercase && !/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (requireLowercase && !/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (requireNumber && !/\d/.test(password)) return 'Password must contain a number';
  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain a special character';
  return null;
};

/**
 * Confirm Password Validation
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

/**
 * Required Field Validation
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Min Length Validation
 */
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (!value) return null; // Use validateRequired separately
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

/**
 * Max Length Validation
 */
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (!value) return null;
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`;
  }
  return null;
};

/**
 * Phone Number Validation
 */
export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  if (!phone) return 'Phone number is required';
  if (!re.test(phone)) return 'Invalid phone number format';
  if (phone.replace(/\D/g, '').length < 10) return 'Phone number must be at least 10 digits';
  return null;
};

/**
 * URL Validation
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL format';
  }
};

/**
 * Number Validation
 */
export const validateNumber = (value, options = {}) => {
  const { min, max, integer = false } = options;

  if (!value && value !== 0) return 'Number is required';

  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid number';
  if (integer && !Number.isInteger(num)) return 'Must be a whole number';
  if (min !== undefined && num < min) return `Must be at least ${min}`;
  if (max !== undefined && num > max) return `Must be no more than ${max}`;

  return null;
};

/**
 * Date Validation
 */
export const validateDate = (date, options = {}) => {
  const { min, max, future = false, past = false } = options;

  if (!date) return 'Date is required';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return 'Invalid date';

  const now = new Date();
  if (future && dateObj <= now) return 'Date must be in the future';
  if (past && dateObj >= now) return 'Date must be in the past';

  if (min && dateObj < new Date(min)) return `Date must be after ${min}`;
  if (max && dateObj > new Date(max)) return `Date must be before ${max}`;

  return null;
};

/**
 * Age Validation
 */
export const validateAge = (birthDate, minAge = 18) => {
  if (!birthDate) return 'Birth date is required';

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < minAge) return `You must be at least ${minAge} years old`;
  return null;
};

/**
 * Credit Card Validation (Luhn Algorithm)
 */
export const validateCreditCard = (cardNumber) => {
  if (!cardNumber) return 'Card number is required';

  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return 'Card number must contain only digits';
  if (cleaned.length < 13 || cleaned.length > 19) return 'Invalid card number length';

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) return 'Invalid card number';
  return null;
};

/**
 * File Validation
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = [],
  } = options;

  if (!file) return 'File is required';

  if (file.size > maxSize) {
    const sizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return `File size must be less than ${sizeMB}MB`;
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }

  return null;
};

/**
 * Custom Validation Hook
 */
export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return null;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  };
}

// Usage Examples:

/*
// 1. Simple Validation
import { validateEmail, validatePassword } from './formValidation';

const emailError = validateEmail('test@example.com');
if (emailError) {
  console.log(emailError); // null if valid
}

const passwordError = validatePassword('weak');
if (passwordError) {
  console.log(passwordError); // "Password must be at least 8 characters"
}

// 2. Login Form with Validation
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password, { minLength: 6 });
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    handleLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}

// 3. Register Form with useFormValidation Hook
function RegisterForm() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      age: '',
    },
    {
      name: [
        (value) => validateRequired(value, 'Name'),
        (value) => validateMinLength(value, 2, 'Name'),
      ],
      email: [
        (value) => validateEmail(value),
      ],
      password: [
        (value) => validatePassword(value),
      ],
      confirmPassword: [
        (value, allValues) => validateConfirmPassword(allValues.password, value),
      ],
      phone: [
        (value) => validatePhone(value),
      ],
      age: [
        (value) => validateNumber(value, { min: 18, max: 120, integer: true }),
      ],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      showToast({ type: 'error', message: 'Please fix validation errors' });
      return;
    }

    try {
      await api.post('/auth/register', values);
      showToast({ type: 'success', message: 'Registration successful!' });
      reset();
    } catch (error) {
      showToast({ type: 'error', message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        error={touched.name && !!errors.name}
        helperText={touched.name && errors.name}
      />

      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />

      <Input
        label="Password"
        type="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password && !!errors.password}
        helperText={touched.password && errors.password}
      />

      <Input
        label="Confirm Password"
        type="password"
        value={values.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={touched.confirmPassword && !!errors.confirmPassword}
        helperText={touched.confirmPassword && errors.confirmPassword}
      />

      <Input
        label="Phone"
        value={values.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        onBlur={() => handleBlur('phone')}
        error={touched.phone && !!errors.phone}
        helperText={touched.phone && errors.phone}
      />

      <Input
        label="Age"
        type="number"
        value={values.age}
        onChange={(e) => handleChange('age', e.target.value)}
        onBlur={() => handleBlur('age')}
        error={touched.age && !!errors.age}
        helperText={touched.age && errors.age}
      />

      <Button type="submit">Register</Button>
    </form>
  );
}

// 4. File Upload with Validation
function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (selectedFile) => {
    const fileError = validateFile(selectedFile, {
      maxSize: 2 * 1024 * 1024, // 2MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    });

    if (fileError) {
      setError(fileError);
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <FileUpload
        onChange={handleFileChange}
        error={!!error}
        helperText={error}
      />
    </div>
  );
}

// 5. Real-time Validation
function PasswordInput() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const checkStrength = (pwd) => {
    if (pwd.length < 6) return 'Weak';
    if (pwd.length < 10) return 'Medium';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd)) {
      return 'Strong';
    }
    return 'Medium';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkStrength(value));
  };

  return (
    <div>
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <div className={`text-sm ${
        strength === 'Strong' ? 'text-green-600' :
        strength === 'Medium' ? 'text-yellow-600' :
        'text-red-600'
      }`}>
        Password strength: {strength}
      </div>
    </div>
  );
}
*/
