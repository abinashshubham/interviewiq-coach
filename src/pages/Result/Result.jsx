// src/pages/Result/Result.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { evaluateAnswer } from '../../services/gemini';
import { SessionManager } from '../../utils/sessionManager';
import { FiAward, FiCheckCircle, FiXCircle, FiTrendingUp, FiRefreshCw, FiHome } from 'react-icons/fi';
import './Result.css';

export default function Result() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const historicId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    async function resolveSessionData() {
      try {
        // 🎯 SCENARIO A: Historic Review Mode (?id=123)
        if (historicId) {
          const record = SessionManager.getHistoryById(historicId);
          if (record) {
            setQuestions(record.questions || []);
            setAnswers(record.userAnswers || {});
            setEvaluations(record.evaluations || []);
            setOverallScore(record.score || 0);
            setLoading(false);
            return;
          }
        }

        // 🎯 SCENARIO B: Fresh or In-Progress Test
        const storedQuestions = SessionManager.getQuestions();
        if (!storedQuestions) {
          navigate('/dashboard');
          return;
        }

        const storedAnswers = SessionManager.getAnswers();
        const setupConfig = SessionManager.getSetup() || { role: 'Software Engineer', level: 'Intermediate' };
        
        setQuestions(storedQuestions);
        setAnswers(storedAnswers);

        // Check if evaluations were already generated for this current active run
        const cachedEvals = SessionManager.getActiveEvaluations();
        if (cachedEvals) {
          setEvaluations(cachedEvals);
          const total = cachedEvals.reduce((sum, item) => sum + (Number(item.score) || 0), 0);
          setOverallScore(cachedEvals.length > 0 ? Math.round(total / cachedEvals.length) : 0);
          setLoading(false);
          return;
        }

        // Generate brand new AI evaluations if no cache exists
        const evalResults = [];
        let totalScore = 0;

        for (let i = 0; i < storedQuestions.length; i++) {
          const qData = storedQuestions[i];
          const userAns = storedAnswers[i] || 'No response provided.';

          const result = await evaluateAnswer(qData.question || qData, userAns, setupConfig.role, setupConfig.level);
          evalResults.push(result);
          totalScore += Number(result.score) || 0;
        }

        const finalScore = Math.round(totalScore / storedQuestions.length);

        setEvaluations(evalResults);
        setOverallScore(finalScore);

        // Retrieve fixed active session ID or generate fallback
        const sessionId = SessionManager.getActiveSessionId() || Date.now().toString();

        // Cache active evaluations & save to historic records
        SessionManager.saveActiveEvaluations(evalResults);
        SessionManager.saveSessionToHistory({
          id: sessionId,
          role: setupConfig.role,
          level: setupConfig.level,
          score: finalScore,
          date: new Date().toLocaleDateString(),
          questions: storedQuestions,
          evaluations: evalResults,
          userAnswers: storedAnswers
        });

        setLoading(false);
      } catch (err) {
        console.error('Error resolving session analytics:', err);
        alert('An error occurred while compiling your performance analytics.');
        navigate('/dashboard');
      }
    }

    resolveSessionData();
  }, [navigate, historicId]);

  const handleRestart = () => {
    SessionManager.clearActiveSession();
    navigate('/setup');
  };

  if (loading) return <Loader message="Analyzing responses and compiling diagnostic metrics..." />;

  return (
    <div className="result-layout">
      <main className="result-content">
        <header className="result-header">
          <div>
            <h1>Performance Diagnostics</h1>
            <p>Comprehensive AI breakdown of your technical responses and skill vectors.</p>
          </div>
          <div className="result-action-buttons">
            <button onClick={handleRestart} className="btn-secondary">
              <FiRefreshCw /> <span>New Mock</span>
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              <FiHome /> <span>Dashboard</span>
            </button>
          </div>
        </header>

        {/* Score Banner */}
        <section className="score-banner-card">
          <div className="score-circle-block">
            <FiAward className="score-trophy-icon" />
            <div>
              <span className="score-number">{overallScore}%</span>
              <span className="score-subtitle">Overall Readiness Rating</span>
            </div>
          </div>
          <div className="score-summary-meta">
            <h3>
              {overallScore >= 80 ? 'Excellent Technical Proficiency!' : overallScore >= 60 ? 'Solid Foundation' : 'Needs Practice'}
            </h3>
            <p>Your responses demonstrate strong domain vocabulary with room for edge-case handling refinement.</p>
          </div>
        </section>

        {/* Questions and Feedback Cards */}
        <section className="evaluations-list-section">
          <h2>Detailed Item Analysis</h2>
          {questions.map((q, idx) => {
            const ev = evaluations[idx] || {};
            const userResponse = answers[idx] || 'No response provided.';

            return (
              <div key={idx} className="evaluation-card">
                <div className="eval-card-header">
                  <span className="eval-index-badge">Question {idx + 1}</span>
                  <div className="eval-score-chip">
                    <FiTrendingUp /> <span>{ev.score || 0}% Match</span>
                  </div>
                </div>

                <h3 className="eval-question-text">{q.question || q}</h3>

                <div className="eval-response-box">
                  <h4>Your Answer:</h4>
                  <p>{userResponse}</p>
                </div>

                <div className="eval-feedback-grid">
                  <div className="feedback-col strengths">
                    <h4><FiCheckCircle /> Key Strengths</h4>
                    <ul>
                      {Array.isArray(ev.strengths) && ev.strengths.length > 0 ? (
                        ev.strengths.map((s, sIdx) => <li key={sIdx}>{s}</li>)
                      ) : (
                        <li>Good attempt at addressing the core scenario.</li>
                      )}
                    </ul>
                  </div>

                  <div className="feedback-col weaknesses">
                    <h4><FiXCircle /> Areas for Improvement</h4>
                    <ul>
                      {Array.isArray(ev.weaknesses) && ev.weaknesses.length > 0 ? (
                        ev.weaknesses.map((w, wIdx) => <li key={wIdx}>{w}</li>)
                      ) : (
                        <li>Consider expanding with concrete code patterns.</li>
                      )}
                    </ul>
                  </div>
                </div>

                {ev.suggestedAnswer && (
                  <div className="suggested-answer-box">
                    <h4>Ideal Model Answer:</h4>
                    <pre><code>{ev.suggestedAnswer}</code></pre>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}