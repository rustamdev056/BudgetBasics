import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      aria-label="Back to top"
      className="back-to-top"
      id="backToTop"
      style={{ display: visible ? 'block' : 'none' }}
      onClick={scrollToTop}
      type="button"
    >
      ↑
    </button>
  );
}
