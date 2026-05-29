import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import AudioUploader from './components/AudioUploader';
import NotationDisplay from './components/NotationDisplay';
import PitchVisualizer from './components/PitchVisualizer';

function App() {
  const [notation, setNotation] = useState(null);
  const [pitchData, setPitchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleAudioUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await axios.post('/api/convert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setNotation(response.data.data.notation);
        setPitchData(response.data.data.pitchData);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process audio');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Audio to Tab Converter</h1>
        <p>Convert your audio to musical notation</p>
      </header>

      <main className="app-main">
        <AudioUploader onUpload={handleAudioUpload} loading={loading} />

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Processing audio...</p>
          </div>
        )}

        {notation && (
          <div className="results">
            <NotationDisplay notation={notation} />
            {pitchData && <PitchVisualizer pitchData={pitchData} />}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Audio to Tab Converter | Powered by AI</p>
      </footer>
    </div>
  );
}

export default App;
