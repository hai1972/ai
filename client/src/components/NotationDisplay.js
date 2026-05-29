import React from 'react';
import './NotationDisplay.css';

function NotationDisplay({ notation }) {
  if (!notation || !notation.notes) {
    return null;
  }

  return (
    <div className="notation-display">
      <div className="notation-header">
        <h3>Musical Notation</h3>
        <div className="notation-meta">
          <span>Tempo: {notation.tempo} BPM</span>
          <span>Time: {notation.timeSignature}</span>
        </div>
      </div>

      <div className="notation-content">
        <div className="staff">
          {/* Draw staff lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <div key={`line-${i}`} className="staff-line"></div>
          ))}

          {/* Display notes */}
          <div className="notes-container">
            {notation.notes.map((note, index) => (
              <div 
                key={index}
                className="note-item"
                style={{
                  left: `${(index / notation.notes.length) * 100}%`
                }}
              >
                <div className="note-head">{note.note}</div>
                <div className="note-info">
                  {note.duration > 0 && (
                    <small>{Math.round(note.duration)}ms</small>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notes-list">
          <h4>Note Sequence</h4>
          <ul>
            {notation.notes.slice(0, 10).map((note, index) => (
              <li key={index}>
                <span className="note-name">{note.note}</span>
                <span className="note-duration">
                  {Math.round(note.duration)}ms
                </span>
              </li>
            ))}
            {notation.notes.length > 10 && (
              <li className="more">+{notation.notes.length - 10} more</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotationDisplay;
