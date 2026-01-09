import React from 'react';
// @ts-ignore - Docusaurus will resolve this path
import NavbarSearchBar from '../../../components/NavbarSearchBar';

export default function SearchBarNavbarItem(props) {
  return (
    <div className="navbar__item navbar__item--search">
      <NavbarSearchBar />
    </div>
  );
}
