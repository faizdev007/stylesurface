import React, { useEffect, useRef } from 'react';

const CodeInjector: React.FC = () => {
  const injectedRef = useRef(false);

  useEffect(() => {
    // Prevent double injection in React Strict Mode
    if (injectedRef.current) return;
    injectedRef.current = true;

    const inject = (code: string, target: HTMLElement) => {
      try {
        // Create a range to turn string into DocumentFragment which executes scripts
        const range = document.createRange();
        range.selectNode(target);
        const fragment = range.createContextualFragment(code);
        target.appendChild(fragment);
      } catch (e) {
        console.error("Failed to inject code:", e);
      }
    };

    const headerCode = localStorage.getItem('site_header_code');
    if (headerCode && headerCode.trim()) {
      inject(headerCode, document.head);
    }

    const footerCode = localStorage.getItem('site_footer_code');
    if (footerCode && footerCode.trim()) {
      inject(footerCode, document.body);
    }
  }, []);

  return null;
};

export default CodeInjector;