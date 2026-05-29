import React, { useState } from 'react';
import './AudioUploader.css';

function AudioUploader({ onUpload, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('audio/')) {
      onUpload(file);
    } else {
      alert('Please upload an audio file');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`audio-uploader ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleChange}
        disabled={loading}
        style={{ display: 'none' }}
      />
      
      <div className="uploader-content">
        <div className="uploader-icon">🎵</div>
        <h2>Upload Your Audio</h2>
        <p>Drag and drop your audio file here or click to select</p>
        <p className="uploader-formats">Supported: MP3, WAV, FLAC, OGG</p>
        <button 
          className="upload-button"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Select Audio File'}
        </button>
      </div>
    </div>
  );
}

export default AudioUploader;
