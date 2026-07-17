// src/pages/Setup/Setup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiSliders, FiLayers, FiCheckCircle } from 'react-icons/fi';
import './Setup.css';

const popularRoles = [
  'Frontend Engineer',
  'Backend Architect',
  'Full Stack Developer',
  'Mobile Specialist',
  'DevOps Engineer'
];

export default function Setup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [count, setCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRole = role === 'Custom' ? customRole : role;
    
    if (!finalRole || finalRole.trim() === '') {
      alert('Please specify a valid career target role.');
      return;
    }

    // Persist configuration settings locally for target page simulation ingestion
    localStorage.setItem('interview_setup', JSON.stringify({
      role: finalRole,
      level,
      count
    }));

    // Transition smoothly to the simulated dynamic interview screen module
    navigate('/interview');
  };

  return (
    <div className="setup-container">
      <header className="setup-header">
        <h1>Configure AI Simulation</h1>
        <p>Fine-tune target configurations to initialize custom technical environments.</p>
      </header>

      <form onSubmit={handleSubmit} className="setup-form-wrapper">
        
        {/* Step 1: Role Configuration */}
        <div className="setup-card">
          <div className="card-indicator"><FiBriefcase /></div>
          <h3>Select Target Position</h3>
          
          <div className="roles-pill-grid">
            {popularRoles.map((r) => (
              <motion.button
                type="button"
                key={r}
                className={`pill-btn ${role === r ? 'active' : ''}`}
                onClick={() => { setRole(r); setCustomRole(''); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {r}
              </motion.button>
            ))}
            <motion.button
              type="button"
              className={`pill-btn ${role === 'Custom' ? 'active' : ''}`}
              onClick={() => setRole('Custom')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Other / Custom Role
            </motion.button>
          </div>

          {role === 'Custom' && (
            <motion.input
              type="text"
              placeholder="e.g. Senior Staff Site Reliability Engineer..."
              className="custom-role-input"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              required
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        {/* Step 2: Experience Tier Tuning */}
        <div className="setup-card">
          <div className="card-indicator"><FiSliders /></div>
          <h3>Select Seniority Baseline</h3>
          <div className="tier-selector-grid">
            {['Junior', 'Intermediate', 'Senior', 'Staff / Lead'].map((tier) => (
              <motion.label 
                key={tier} 
                className={`tier-radio-card ${level === tier ? 'active' : ''}`}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                whileTap={{ scale: 0.98 }}
              >
                <input 
                  type="radio" 
                  name="level" 
                  value={tier} 
                  checked={level === tier} 
                  onChange={(e) => setLevel(e.target.value)} 
                />
                <span>{tier}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Step 3: Question Depth Configuration */}
        <div className="setup-card">
          <div className="card-indicator"><FiLayers /></div>
          <h3>Total Evaluation Queries</h3>
          <div className="count-slider-wrapper">
            <input 
              type="range" 
              min="3" 
              max="10" 
              value={count} 
              onChange={(e) => setCount(Number(e.target.value))}
              className="premium-range-slider"
            />
            <div className="count-display-badge">{count} Questions</div>
          </div>
        </div>

        {/* Execution Pipeline Button Trigger */}
        <motion.button 
          type="submit" 
          className="initialize-engine-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiCheckCircle />
          <span>Deploy Simulation Environment</span>
        </motion.button>
      </form>
    </div>
  );
}