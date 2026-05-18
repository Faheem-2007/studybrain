from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os

app = FastAPI()
from datetime import datetime

@app.get("/today")
def get_today():
    day = datetime.now().strftime("%A")
    data = load_data()
    subjects = data.get("subjects", [])
    return {"day": day, "subjects": subjects}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "data.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            return json.load(f)
    return {}

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

class SemesterSetup(BaseModel):
    subjects: List[str]

class DailyLog(BaseModel):
    date: str
    logs: dict

@app.post("/log")
def save_log(data: DailyLog):
    existing = load_data()
    if "logs" not in existing:
        existing["logs"] = {}
    existing["logs"][data.date] = data.logs
    save_data(existing)
    return {"saved": True}

@app.get("/")
def home():
    return {"message": "StudyBrain is alive"}

@app.post("/setup")
def setup_semester(data: SemesterSetup):
    existing = load_data()
    existing["subjects"] = data.subjects
    save_data(existing)
    return {"saved": data.subjects}