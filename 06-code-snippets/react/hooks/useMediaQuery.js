import { useState, useEffect } from 'react';

/**
 * useMediaQuery Hook
 *
 * Track media query matches for responsive design
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (e) => setMatches(e.matches);

    // Add listener
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

// Preset breakpoint hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

// Usage Examples:
/*

// Basic usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <DesktopMenu />
      )}
    </div>
  );
}

// Using preset hooks
function Navigation() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  return (
    <nav>
      {isMobile && <MobileNav />}
      {isTablet && <TabletNav />}
      {isDesktop && <DesktopNav />}
    </nav>
  );
}

// Multiple breakpoints
function Layout() {
  const isSmall = useMediaQuery('(max-width: 640px)');
  const isMedium = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isLarge = useMediaQuery('(min-width: 1025px)');

  const columns = isSmall ? 1 : isMedium ? 2 : 3;

  return (
    <div style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {/* Content */}
    </div>
  );
}

// Dark mode detection
function ThemeComponent() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className={prefersDark ? 'dark-theme' : 'light-theme'}>
      Current theme: {prefersDark ? 'Dark' : 'Light'}
    </div>
  );
}

// Orientation detection
function OrientationComponent() {
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <div>
      Orientation: {isPortrait ? 'Portrait' : 'Landscape'}
    </div>
  );
}

// Conditional rendering based on screen size
function ImageGallery() {
  const isMobile = useIsMobile();
  const imagesPerRow = isMobile ? 2 : 4;

  return (
    <div className={`grid grid-cols-${imagesPerRow}`}>
      {images.map(img => (
        <img key={img.id} src={img.url} alt={img.alt} />
      ))}
    </div>
  );
}

*/
