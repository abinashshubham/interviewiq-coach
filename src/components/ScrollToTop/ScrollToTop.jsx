// src/components/ScrollToTop.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Reset scroll to top on page route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Toggle floating button visibility based on scroll distance
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleManualScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      onClick={handleManualScroll} 
      className="scroll-to-top-btn" 
      aria-label="Scroll to top"
    >
      <FiArrowUp />
    </button>
  );
}