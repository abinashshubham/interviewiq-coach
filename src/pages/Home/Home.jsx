import React from "react";
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import { FiCpu, FiSliders, FiActivity, FiShield } from "react-icons/fi";
import Hero from "../../components/Hero/Hero";
import "./Home.css";

// 🎯 Using motion.create() eliminates the console deprecation warning
const MotionNavLink = motion.create(NavLink);

const features = [
  {
    icon: <FiCpu />,
    title: "Gemini Engine Synthesis",
    desc: "Instantly construct highly accurate runtime behavioral or technical questions unique to your context.",
  },
  {
    icon: <FiSliders />,
    title: "Hyper-Granular Tuners",
    desc: "Adjust specialized engineering difficulty baselines across Junior, Senior, or Staff levels.",
  },
  {
    icon: <FiActivity />,
    title: "Interactive Analytics",
    desc: "Map comprehensive communication cadence competencies using clean radar tracking configurations.",
  },
  {
    icon: <FiShield />,
    title: "Privacy Guaranteed",
    desc: "All local session answers are compiled directly using local secure persistence keys.",
  },
];

export default function Home() {
  return (
    <div className="home-wrapper">
      <Hero />

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Engineered to Build Confidence</h2>
          <p>
            Everything you need to systematically target technical knowledge
            frameworks.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => (
            <motion.div
              className="feature-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div className="feature-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Layout Layer */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Land Your Dream Offer?</h2>
          <p>
            Deploy a simulation module now to accurately check your real
            engineering baseline values.
          </p>
          <MotionNavLink
            to="/setup"
            className="cta-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Initialize Architecture Engine
          </MotionNavLink>
        </div>
      </section>
    </div>
  );
}