# StudyBrain

StudyBrain is a small study companion for students who want one place to set up their semester subjects, record what happened in class each day, and eventually turn those logs into a revision plan.

The project currently has a FastAPI backend and a React + Vite frontend. Data is stored locally in `data.json`, so it is simple to run while you are still shaping the idea.

## Features

- Set up the subjects for a semester
- Load the current day from the backend
- Write quick notes for each subject
- Save daily logs to a local JSON file
- Placeholder Study Mode screen for generating a revision plan from saved logs

## Tech Stack

- Backend: FastAPI, Pydantic
- Frontend: React, Vite
- Storage: local `data.json`

## Project Structure

```text
.
|-- main.py              # FastAPI backend
|-- data.json            # Local subject and log storage
`-- frontend/
    |-- src/App.jsx      # Main React app
    |-- src/main.jsx
    `-- package.json     # Vite frontend scripts
```

## Getting Started

### 1. Start the Backend

From the project root:

```bash
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

The backend runs at:

```text
http://localhost:8000
```

### 2. Start the Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs at:

```text
http://localhost:5173
```

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/` | Health check message |
| `POST` | `/setup` | Save semester subjects |
| `GET` | `/today` | Get the current weekday and saved subjects |
| `POST` | `/log` | Save notes for a day |

## Notes

- The backend allows frontend requests from `http://localhost:5173`.
- Daily logs are keyed by weekday name, such as `Monday` or `Wednesday`.
- Study Mode is not connected to a plan generator yet; it is the next natural feature to build.

## Future Ideas

- Store logs by full date instead of weekday
- Add a real revision-plan generator
- Show past logs in the UI
- Add editing and deleting for subjects and logs
- Move storage from `data.json` to a database

# StudyBrain

A personal academic companion that tracks what actually happens in your classes — not what the syllabus says. Built with FastAPI, React, and Claude AI.

---

## What it does

Most students either take notes inconsistently or don't take them at all. StudyBrain fixes this by giving you a dead-simple daily input flow — you spend 2 minutes after class typing what happened, and over the semester it builds a real picture of what was covered, what was skipped, and what you struggled with.

When you're ready to study, it reads everything you've logged and generates a revision plan tailored to your actual semester — not a generic one.

**Three core flows:**

- **Semester Setup** — Enter your subjects at the start of semester. The app remembers them for the rest of the year.
- **Daily Log** — Open the app, see today's subjects, type a few lines about what happened in each class. Takes 2 minutes.
- **Study Mode** — Hit Generate and Claude reads all your logs, identifies gaps, and builds a revision plan based on what you've actually covered.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI (Python) |
| Storage | JSON file (local) |
| AI | Claude API (Anthropic) |

---

## Project Structure

```
studybrain/
├── main.py                  # FastAPI backend
├── data.json                # Local storage (auto-generated)
├── .env                     # API keys (not committed)
└── frontend/
    └── src/
        └── App.jsx          # React frontend
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### Backend Setup

```bash
# Install dependencies
pip install fastapi uvicorn anthropic python-dotenv

# Create .env file
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# Start backend
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/setup` | Save semester subjects |
| GET | `/today` | Get today's day and subjects |
| POST | `/log` | Save daily class log |
| GET | `/study-plan` | Generate AI revision plan |

---

## How it works

```
User logs class notes daily
        ↓
FastAPI saves logs to data.json
        ↓
On Study Mode, all logs sent to Claude API
        ↓
Claude reads subject coverage + gaps
        ↓
Returns a personalised revision plan
```

---

## Roadmap

- [ ] Timetable support (know which subjects happen on which day automatically)
- [ ] Per-subject understanding tracker
- [ ] Voice input for faster logging
- [ ] Claude-powered quiz generation per subject
- [ ] Semester comparison across years

---

## Built by

Faheem — CS student at VIT Chennai, building tools that actually solve real problems.