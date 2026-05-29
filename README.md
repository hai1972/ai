# 🎵 Audio to Tab Converter

A web application that converts audio files to musical notation using AI and pitch detection.

## Features

✨ **Core Functionality**
- 🎤 Audio file upload (MP3, WAV, FLAC, OGG)
- 🎵 Automatic pitch detection using autocorrelation algorithm
- 📊 Musical notation generation
- 📈 Pitch contour visualization
- 🎼 Support for vocals and various instruments

## Project Structure

```
audio-to-tab-converter/
├── server.js                 # Express backend server
├── services/
│   └── audioProcessor.js    # Audio processing & pitch detection
├── package.json             # Backend dependencies
└── client/
    ├── package.json         # Frontend dependencies
    ├── public/
    │   └── index.html       # React app entry HTML
    └── src/
        ├── index.js         # React entry point
        ├── App.js           # Main app component
        ├── App.css          # App styles
        └── components/
            ├── AudioUploader.js      # File upload component
            ├── AudioUploader.css
            ├── NotationDisplay.js    # Notation visualization
            ├── NotationDisplay.css
            ├── PitchVisualizer.js    # Pitch chart
            └── PitchVisualizer.css
```

## Tech Stack

**Backend**
- Node.js + Express.js
- Multer for file uploads
- CORS enabled for cross-origin requests

**Frontend**
- React 18
- Axios for API calls
- Canvas API for visualization
- Tone.js for audio processing

## Installation

### Backend Setup
```bash
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

## Running the Application

### Development Mode (Full Stack)

```bash
# Terminal 1: Backend
npm start

# Terminal 2: Frontend
cd client
npm start
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
# Build frontend
cd client
npm run build

# Run backend (serves built React app)
npm start
```

## API Endpoints

### POST /api/convert
Converts audio file to musical notation

**Request:**
```
Content-Type: multipart/form-data
- audio: AudioFile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notation": {
      "title": "Audio Conversion",
      "timeSignature": "4/4",
      "tempo": 120,
      "notes": [
        {
          "note": "C4",
          "duration": 500,
          "startTime": 0
        }
      ]
    },
    "pitchData": [
      {
        "time": 100,
        "frequency": 261.63,
        "note": "C4"
      }
    ],
    "processingTime": 1234567890
  }
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-05-29T10:00:00Z"
}
```

## Audio Processing Algorithm

### Pitch Detection
Uses autocorrelation algorithm for robust pitch detection:
1. Split audio into frames (2048 samples)
2. Calculate autocorrelation for each frame
3. Find peak correlation to determine fundamental frequency
4. Convert frequency to musical note

### Note Generation
1. Group consecutive frames with same note
2. Calculate note duration
3. Generate musical notation with timing information

## Supported Audio Formats
- MP3
- WAV
- FLAC
- OGG
- M4A
- OPUS

## Future Enhancements

- [ ] Multi-instrument detection
- [ ] Chord recognition
- [ ] Export to various notation formats (MusicXML, ABC, PDF)
- [ ] Real-time audio streaming support
- [ ] Voice-to-lyrics conversion
- [ ] Advanced ML model for improved accuracy
- [ ] Batch processing
- [ ] WebSocket support for live conversion

## Performance Optimization

- Client-side audio encoding detection
- Server-side caching for repeated conversions
- Streaming support for large files
- Progressive Web App (PWA) support

## Environment Variables

Create `.env` file in root directory:

```
PORT=5000
NODE_ENV=development
UPLOAD_DIR=./uploads
```

## Error Handling

The application includes comprehensive error handling:
- Invalid file format detection
- Audio processing error recovery
- Server error responses with descriptive messages
- Client-side validation and user feedback

## License

MIT

## Author

hai1972

---

**Note:** This is an AI-assisted implementation. For production use, consider:
- Implementing more advanced ML models
- Adding proper authentication/authorization
- Setting up database for conversion history
- Implementing rate limiting
- Adding comprehensive testing suite
