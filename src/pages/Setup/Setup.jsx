import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Using framer-motion imports or layout structures
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
    if (!finalRole) return alert('Please specify a valid career target role.');

    // Save configuration parameters to LocalStorage for processing on the runtime page
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
              <button
                type="button"
                key={r}
                className={`pill-btn ${role === r ? 'active' : ''}`}
                onClick={() => { setRole(r); setCustomRole(''); }}
              >
                {r}
              </button>
            ))}
            <button
              type="button"
              className={`pill-btn ${role === 'Custom' ? 'active' : ''}`}
              onClick={() => setRole('Custom')}
            >
              Other / Custom Role
            </button>
          </div>

          {role === 'Custom' && (
            <input
              type="text"
              placeholder="e.g. Senior Staff Site Reliability Engineer..."
              className="custom-role-input"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              required
            />
          )}
        </div>

        {/* Step 2: Experience Tier Tuning */}
        <div className="setup-card">
          <div className="card-indicator"><FiSliders /></div>
          <h3>Select Seniority Baseline</h3>
          <div className="tier-selector-grid">
            {['Junior', 'Intermediate', 'Senior', 'Staff / Lead'].map((tier) => (
              <label 
                key={tier} 
                className={`tier-radio-card ${level === tier ? 'active' : ''}`}
              >
                <input 
                  type="radio" 
                  name="level" 
                  value={tier} 
                  checked={level === tier} 
                  onChange={(e) => setLevel(e.target.value)} 
                />
                <span>{tier}</span>
              </label>
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
        <button type="submit" className="initialize-engine-btn">
          <FiCheckCircle />
          <span>Deploy Simulation Environment</span>
        </button>
      </form>
    </div>
  );
}