import React, { useEffect, useState } from 'react';
// @ts-ignore - Docusaurus will resolve this path
import NavbarSearchBar from '../components/NavbarSearchBar';

// Wrapper around the root element
// This component is automatically picked up by Docusaurus theme system
export default function Root({children}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Find the navbar items container
    const navbarItems = document.querySelector('.navbar__items');
    if (!navbarItems) return;

    // Find or create the search container
    let searchContainer = document.querySelector('.navbar__item--custom-search');
    if (!searchContainer) {
      searchContainer = document.createElement('div');
      searchContainer.className = 'navbar__item navbar__item--custom-search';
      
      // Find the position to insert (after left items, before right items)
      const rightItems = navbarItems.querySelector('.navbar__items--right');
      if (rightItems) {
        navbarItems.insertBefore(searchContainer, rightItems);
      } else {
        navbarItems.appendChild(searchContainer);
      }
    }
  }, []);

  return (
    <>
      {children}
      {mounted && (
        <div 
          className="navbar__item--custom-search-wrapper"
          style={{ display: 'none' }}
          ref={(el) => {
            if (el) {
              const target = document.querySelector('.navbar__item--custom-search');
              if (target && target !== el.parentNode) {
                target.appendChild(el);
                el.style.display = 'block';
              }
            }
          }}
        >
          <NavbarSearchBar />
        </div>
      )}
    </>
  );
}
