// src/components/VoiceInput/VoiceInput.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff } from 'react-icons/fi';
import './VoiceInput.css';

export default function VoiceInput({ onTranscriptChange }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Disables mobile duplication issues
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let speechResult = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          speechResult += event.results[i][0].transcript + ' ';
        }
      }

      if (speechResult.trim()) {
        onTranscriptChange(speechResult.trim());
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [onTranscriptChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
    } else {
      try { recognitionRef.current.start(); } catch (e) {}
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
    >
      {isListening ? <FiMicOff /> : <FiMic />}
      <span>{isListening ? "Listening..." : "Dictate Answer"}</span>
    </button>
  );
}