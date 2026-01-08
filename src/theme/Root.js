import React from 'react';
// @ts-ignore - Docusaurus will resolve this path
import DocsChatWidget from '../components/DocsChatWidget';

// Wrapper around the root element to inject the chat widget globally
// This component is automatically picked up by Docusaurus theme system
export default function Root({children}) {
  return (
    <>
      {children}
      <DocsChatWidget />
    </>
  );
}
