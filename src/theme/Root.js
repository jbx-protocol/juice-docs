import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore - Docusaurus will resolve this path
import NavbarSearchBar from '../components/NavbarSearchBar';

// Wrapper around the root element
// This component is automatically picked up by Docusaurus theme system
export default function Root({children}) {
  const rootRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Wait for navbar to be rendered
    const checkAndInject = () => {
      const navbarItems = document.querySelector('.navbar__items');
      if (!navbarItems) {
        // Retry if navbar not ready yet
        setTimeout(checkAndInject, 100);
        return;
      }

      // Check if already injected
      if (containerRef.current) {
        return;
      }

      // Create container for search bar
      const searchContainer = document.createElement('div');
      searchContainer.className = 'navbar__item navbar__item--custom-search';
      containerRef.current = searchContainer;
      
      // Find the position to insert (after left items, before right items)
      const rightItems = navbarItems.querySelector('.navbar__items--right');
      if (rightItems) {
        navbarItems.insertBefore(searchContainer, rightItems);
      } else {
        navbarItems.appendChild(searchContainer);
      }

      // Use React 18 createRoot for proper rendering
      const root = createRoot(searchContainer);
      rootRef.current = root;
      root.render(<NavbarSearchBar />);
    };

    // Start checking after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkAndInject, 100);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup: unmount React root if it exists
      if (rootRef.current && containerRef.current) {
        try {
          rootRef.current.unmount();
          // Remove the container from DOM only if it's still a child
          const container = containerRef.current;
          if (container && container.parentNode && container.parentNode.contains(container)) {
            container.parentNode.removeChild(container);
          }
        } catch (e) {
          // Ignore cleanup errors - React may have already cleaned up
        }
        rootRef.current = null;
        containerRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
