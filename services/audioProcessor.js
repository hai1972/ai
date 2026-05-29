import * as fs from 'fs';
import * as path from 'path';
import * as Tone from 'tone';

const audioContext = new (typeof window !== 'undefined' ? window.AudioContext : typeof OfflineAudioContext !== 'undefined' ? OfflineAudioContext : null)();

/**
 * Extract pitch information from audio buffer
 * Uses autocorrelation algorithm for pitch detection
 */
async function extractPitch(arrayBuffer) {
  const audioContext = new (typeof window !== 'undefined' ? window.AudioContext : null)();
  if (!audioContext) return [];

  const audioData = await audioContext.decodeAudioData(arrayBuffer);
  const samples = audioData.getChannelData(0);
  
  const pitchData = [];
  const frameSize = 2048;
  const hopSize = 512;

  for (let i = 0; i < samples.length - frameSize; i += hopSize) {
    const frame = samples.slice(i, i + frameSize);
    const pitch = detectPitch(frame, audioData.sampleRate);
    if (pitch > 0) {
      pitchData.push({
        time: (i / audioData.sampleRate) * 1000,
        frequency: pitch,
        note: frequencyToNote(pitch)
      });
    }
  }

  return pitchData;
}

/**
 * Autocorrelation-based pitch detection
 */
function detectPitch(buffer, sampleRate) {
  const SIZE = buffer.length;
  const MAX_SAMPLES = Math.floor(SIZE / 2);
  
  let best_offset = -1;
  let best_correlation = 0;
  let rms = 0;

  // Calculate RMS
  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // Not enough signal
  if (rms < 0.01) return -1;

  // Find the best correlation offset
  let lastCorrelation = 1;
  for (let offset = 1; offset < MAX_SAMPLES; offset++) {
    let correlation = 0;

    for (let i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }

    correlation = 1 - (correlation / MAX_SAMPLES);
    
    if (correlation > 0.9 && correlation > lastCorrelation) {
      let foundGoodCorrelation = false;
      if (correlation > best_correlation) {
        best_correlation = correlation;
        best_offset = offset;
        foundGoodCorrelation = true;
      }

      if (foundGoodCorrelation) break;
    }

    lastCorrelation = correlation;
  }

  if (best_correlation > 0.01) {
    return sampleRate / best_offset;
  }

  return -1;
}

/**
 * Convert frequency to musical note
 */
function frequencyToNote(frequency) {
  const A4 = 440;
  const C0 = A4 * Math.pow(2, -4.75);
  
  const h = 12 * Math.log2(frequency / C0);
  const octave = Math.floor(h / 12);
  const cents = h % 12;
  
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteIndex = Math.round(cents);
  
  return notes[noteIndex % 12] + octave;
}

/**
 * Convert pitch data to musical notation
 */
async function generateNotation(pitchData) {
  const notation = {
    title: 'Audio Conversion',
    timeSignature: '4/4',
    tempo: 120,
    notes: [],
    chords: []
  };

  let currentTime = 0;
  let currentNote = null;
  let noteDuration = 0;

  for (let i = 0; i < pitchData.length; i++) {
    const data = pitchData[i];
    
    if (currentNote === null) {
      currentNote = data.note;
      currentTime = data.time;
      noteDuration = 0;
    } else if (data.note !== currentNote) {
      // Note changed - save previous note
      notation.notes.push({
        note: currentNote,
        duration: noteDuration,
        startTime: currentTime
      });
      currentNote = data.note;
      currentTime = data.time;
      noteDuration = 0;
    }

    if (i < pitchData.length - 1) {
      noteDuration = pitchData[i + 1].time - data.time;
    }
  }

  // Add last note
  if (currentNote) {
    notation.notes.push({
      note: currentNote,
      duration: noteDuration,
      startTime: currentTime
    });
  }

  return notation;
}

/**
 * Main audio processor
 */
export const audioProcessor = {
  async processAudio(filePath) {
    try {
      const audioBuffer = fs.readFileSync(filePath);
      const pitchData = await extractPitch(audioBuffer.buffer);
      const notation = await generateNotation(pitchData);

      // Clean up uploaded file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return {
        notation,
        pitchData: pitchData.slice(0, 100), // Limit response size
        processingTime: Date.now()
      };
    } catch (error) {
      throw new Error(`Audio processing failed: ${error.message}`);
    }
  }
};
