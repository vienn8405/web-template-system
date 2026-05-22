import React from 'react';

/**
 * Pagination Component
 *
 * Navigation for paginated content
 * Supports different sizes and variants
 *
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={setPage}
 * />
 */

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  size = 'md',
  className = '',
}) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // + 2 for ellipsis

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, '...', ...middleRange, '...', totalPages];
    }
  };

  const pages = getPageNumbers();

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const buttonBaseClasses = `
    ${sizeClasses[size]}
    border border-neutral-300 rounded-md
    font-medium transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
  `;

  const PageButton = ({ page, isActive = false, disabled = false, onClick }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonBaseClasses}
        ${isActive
          ? 'bg-primary-600 text-white border-primary-600'
          : 'bg-white text-neutral-700 hover:bg-neutral-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Page ${page}`}
    >
      {page}
    </button>
  );

  const NavButton = ({ direction, disabled, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonBaseClasses}
        bg-white text-neutral-700 hover:bg-neutral-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
    >
      {children}
    </button>
  );

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`flex items-center gap-1 ${className}`}
    >
      {/* First Page */}
      {showFirstLast && (
        <NavButton
          direction="first"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </NavButton>
      )}

      {/* Previous */}
      {showPrevNext && (
        <NavButton
          direction="prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </NavButton>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-neutral-500"
            >
              ...
            </span>
          );
        }

        return (
          <PageButton
            key={page}
            page={page}
            isActive={currentPage === page}
            onClick={() => onPageChange(page)}
          />
        );
      })}

      {/* Next */}
      {showPrevNext && (
        <NavButton
          direction="next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </NavButton>
      )}

      {/* Last Page */}
      {showFirstLast && (
        <NavButton
          direction="last"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </NavButton>
      )}
    </nav>
  );
}

/**
 * Simple Pagination (Previous/Next only)
 */
export function SimplePagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPageInfo = true,
  className = '',
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-4 py-2 text-sm font-medium
          border border-neutral-300 rounded-md
          bg-white text-neutral-700
          hover:bg-neutral-50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
        "
      >
        Previous
      </button>

      {/* Page Info */}
      {showPageInfo && (
        <span className="text-sm text-neutral-600">
          Page {currentPage} of {totalPages}
        </span>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2 text-sm font-medium
          border border-neutral-300 rounded-md
          bg-white text-neutral-700
          hover:bg-neutral-50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
        "
      >
        Next
      </button>
    </div>
  );
}

/**
 * Load More Button (Infinite scroll alternative)
 */
export function LoadMore({
  onLoadMore,
  loading = false,
  hasMore = true,
  className = '',
}) {
  if (!hasMore) {
    return (
      <div className={`text-center text-sm text-neutral-500 ${className}`}>
        No more items to load
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="
          px-6 py-3 text-sm font-medium
          bg-white border border-neutral-300 rounded-lg
          text-neutral-700 hover:bg-neutral-50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150
        "
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}

// Usage Examples:

/*
// Basic Pagination
<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
/>

// Without First/Last buttons
<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
  showFirstLast={false}
/>

// More siblings (show more page numbers)
<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
  siblingCount={2}
/>

// Small size
<Pagination
  size="sm"
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>

// Large size
<Pagination
  size="lg"
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>

// Simple Pagination (Prev/Next only)
<SimplePagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>

// Without page info
<SimplePagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  showPageInfo={false}
/>

// Load More Button
<LoadMore
  onLoadMore={loadMoreItems}
  loading={isLoading}
  hasMore={hasMoreItems}
/>

// Complete Example with Data
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalItems = 95;
const totalPages = Math.ceil(totalItems / itemsPerPage);

const currentItems = items.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

<div>
  <div className="grid grid-cols-3 gap-4">
    {currentItems.map(item => (
      <ItemCard key={item.id} item={item} />
    ))}
  </div>

  <div className="mt-8">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </div>
</div>
*/
