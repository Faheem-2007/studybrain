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
