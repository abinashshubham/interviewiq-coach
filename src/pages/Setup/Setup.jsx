// src/pages/Setup/Setup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiSliders, FiLayers, FiCheckCircle, FiKey, FiEye, FiEyeOff } from 'react-icons/fi';
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
  
  // API Key state management synced with localStorage
  const [apiKey, setApiKey] = useState(localStorage.getItem('USER_HF_API_KEY') || '');
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('USER_HF_API_KEY', apiKey.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRole = role === 'Custom' ? customRole : role;
    
    if (!localStorage.getItem('USER_HF_API_KEY')?.trim() && !apiKey.trim()) {
      alert('Please provide and save a valid Hugging Face API key before deploying the simulation.');
      return;
    }

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

      {/* Step 0: Security Credentials Configuration */}
      <div className="setup-form-wrapper" style={{ marginBottom: '20px' }}>
        <div className="setup-card" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="card-indicator" style={{ background: 'linear-gradient(135deg, #ff9900, #ff5500)' }}><FiKey /></div>
          <h3>API Credentials Integration</h3>
          <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '15px', marginTop: '-5px' }}>
            Provide your free Hugging Face User Access Token (`hf_...`) to run secure, unlimited technical simulations.
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input 
                type={showKey ? "text" : "password"} 
                placeholder="Paste your token here (hf_...)" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '12px 40px 12px 12px', 
                  borderRadius: '6px', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  background: 'rgba(0,0,0,0.2)', 
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showKey ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            <motion.button 
              type="button"
              onClick={handleSaveKey} 
              className="pill-btn active"
              style={{ padding: '12px 20px', margin: 0, whiteSpace: 'nowrap', minWidth: '110px' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {keySaved ? 'Saved! ✓' : 'Save Token'}
            </motion.button>
          </div>
        </div>
      </div>

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