import React from 'react';

/**
 * Card Component
 *
 * A flexible card component for displaying content.
 * Supports various layouts and configurations.
 *
 * @example
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *   </Card.Header>
 *   <Card.Body>
 *     Card content goes here
 *   </Card.Body>
 * </Card>
 */

export function Card({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  ...props
}) {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-300',
    filled: 'bg-gray-50 border border-gray-200',
  };

  const baseClasses = `
    rounded-lg overflow-hidden
    transition-all duration-200
    ${variantClasses[variant]}
    ${hoverable ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

// Card Header
Card.Header = function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Title
Card.Title = function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Subtitle
Card.Subtitle = function CardSubtitle({ children, className = '', ...props }) {
  return (
    <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
};

// Card Body
Card.Body = function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Footer
Card.Footer = function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Image
Card.Image = function CardImage({ src, alt, className = '', ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-48 object-cover ${className}`}
      {...props}
    />
  );
};

// Usage Examples:
/*

// Basic Card
<Card>
  <Card.Body>
    <p>Simple card content</p>
  </Card.Body>
</Card>

// Card with Header and Footer
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle>Card subtitle</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    <p>This is the main content of the card.</p>
  </Card.Body>
  <Card.Footer>
    <button className="text-primary-600">Action</button>
  </Card.Footer>
</Card>

// Card with Image
<Card hoverable>
  <Card.Image
    src="https://picsum.photos/400/200"
    alt="Card image"
  />
  <Card.Body>
    <Card.Title>Image Card</Card.Title>
    <p className="text-gray-600 mt-2">
      Card with an image at the top
    </p>
  </Card.Body>
</Card>

// Product Card
<Card hoverable variant="elevated">
  <Card.Image
    src="https://picsum.photos/400/300"
    alt="Product"
  />
  <Card.Body>
    <Card.Title>Product Name</Card.Title>
    <p className="text-2xl font-bold text-primary-600 mt-2">$99.99</p>
    <p className="text-gray-600 mt-2">
      Product description goes here
    </p>
  </Card.Body>
  <Card.Footer>
    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
      Add to Cart
    </button>
  </Card.Footer>
</Card>

// Stats Card
<Card variant="filled">
  <Card.Body>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Total Users</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">1,234</p>
      </div>
      <div className="bg-primary-100 p-3 rounded-full">
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
    </div>
    <div className="mt-4">
      <span className="text-green-600 text-sm font-medium">↑ 12%</span>
      <span className="text-gray-500 text-sm ml-2">from last month</span>
    </div>
  </Card.Body>
</Card>

// Clickable Card
<Card hoverable onClick={() => console.log('Card clicked')}>
  <Card.Body>
    <Card.Title>Clickable Card</Card.Title>
    <p className="text-gray-600 mt-2">Click anywhere on this card</p>
  </Card.Body>
</Card>

// Profile Card
<Card variant="elevated" className="max-w-sm">
  <Card.Body className="text-center">
    <img
      src="https://i.pravatar.cc/150"
      alt="Profile"
      className="w-24 h-24 rounded-full mx-auto"
    />
    <Card.Title className="mt-4">John Doe</Card.Title>
    <Card.Subtitle>Software Engineer</Card.Subtitle>
    <p className="text-gray-600 mt-4">
      Passionate about building great products
    </p>
  </Card.Body>
  <Card.Footer className="flex gap-2 justify-center">
    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
      Follow
    </button>
    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
      Message
    </button>
  </Card.Footer>
</Card>

*/
