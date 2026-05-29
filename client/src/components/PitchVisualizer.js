import React, { useEffect, useRef } from 'react';
import './PitchVisualizer.css';

function PitchVisualizer({ pitchData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !pitchData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Find min and max frequencies
    const frequencies = pitchData.map(p => p.frequency);
    const minFreq = Math.min(...frequencies);
    const maxFreq = Math.max(...frequencies);
    const freqRange = maxFreq - minFreq;

    // Draw pitch curve
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();

    pitchData.forEach((point, index) => {
      const x = (index / pitchData.length) * width;
      const normalizedFreq = (point.frequency - minFreq) / freqRange;
      const y = height - (normalizedFreq * height * 0.8 + height * 0.1);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#764ba2';
    pitchData.forEach((point, index) => {
      const x = (index / pitchData.length) * width;
      const normalizedFreq = (point.frequency - minFreq) / freqRange;
      const y = height - (normalizedFreq * height * 0.8 + height * 0.1);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

  }, [pitchData]);

  return (
    <div className="pitch-visualizer">
      <h3>Pitch Contour</h3>
      <canvas 
        ref={canvasRef}
        width={400}
        height={250}
        className="pitch-canvas"
      />
      <div className="pitch-stats">
        {pitchData && (
          <>
            <div className="stat">
              <span className="label">Detected Notes:</span>
              <span className="value">{pitchData.length}</span>
            </div>
            <div className="stat">
              <span className="label">Avg Frequency:</span>
              <span className="value">
                {(pitchData.reduce((sum, p) => sum + p.frequency, 0) / pitchData.length).toFixed(1)} Hz
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PitchVisualizer;
