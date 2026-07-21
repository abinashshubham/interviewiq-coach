// src/components/Footer/Footer.jsx
import React from 'react';
import { FiHeart, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">
            © {currentYear} <span className="brand-highlight">InterviewIQ Coach</span>. All rights reserved.
          </p>
          <p className="footer-credit">
            Crafted with <FiHeart className="heart-icon" /> by <span className="author-name">Abinash Shubham</span>
          </p>
        </div>

        <div className="footer-socials">
          <a href="https://github.com/abinashshubham/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/abinashshubham" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://abinashshubham.github.io/my-portfolio/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
            <FiGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
}