// src/components/VoiceInput/VoiceInput.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff } from 'react-icons/fi';
import './VoiceInput.css';

export default function VoiceInput({ onTranscriptChange }) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser compatibility for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' ';
        }
      }

      if (finalTranscript) {
        onTranscriptChange(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscriptChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return (
      <span className="voice-unsupported-note">
        🎤 Voice typing not supported on this browser (Try Chrome/Edge)
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
      title={isListening ? "Stop Listening" : "Start Dictating"}
    >
      {isListening ? <FiMicOff /> : <FiMic />}
      <span>{isListening ? "Listening..." : "Dictate Answer"}</span>
    </button>
  );
}