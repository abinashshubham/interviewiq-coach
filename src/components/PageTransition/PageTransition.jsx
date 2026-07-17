// src/components/PageTransition/PageTransition.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './PageTransition.css';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1] // High-premium clean cubic easing curves
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3
    }
  }
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-transition-wrapper"
    >
      {children}
    </motion.div>
  );
}