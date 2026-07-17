import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.jsx'; // Self tracking matching structure import call
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="hero-badge">Next-Gen Interview Preparation</span>
        <h1 className="hero-title">
          Master Your Next Tech Interview with <span className="gradient-text">Generative AI</span>
        </h1>
        <p className="hero-subtitle">
          Generate production-grade custom role configurations, practice voice or text response cycles, and receive real-time granular architectural weakness metrics instantly.
        </p>
        <div className="hero-actions">
          <Link to="/setup" className="hero-btn-primary">Get Started Free</Link>
          <Link to="/dashboard" className="hero-btn-secondary">View Demo Dashboard</Link>
        </div>
      </motion.div>
    </section>
  );
}