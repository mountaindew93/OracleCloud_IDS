from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import threading

from backend.pipeline.scheduler import main as scheduler_main

from backend.database.queries import (
    get_recent_predictions,
    get_attack_statistics,
    get_recent_notifications,
    get_dashboard_statistics,
    get_model_info,
    get_attack_trend,
    get_recent_attacks,
    get_logs,
)

app = FastAPI(
    title="IDS API",
    version="1.0"
)


scheduler_started = False


@app.on_event("startup")
def startup_event():

    global scheduler_started

    if not scheduler_started:

        thread = threading.Thread(
            target=scheduler_main,
            daemon=True
        )

        thread.start()

        scheduler_started = True

        print("=" * 50)
        print("Scheduler Started Automatically")
        print("=" * 50)

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "IDS API Server Running"
    }


@app.get("/predictions")
def predictions():
    return get_recent_predictions()


@app.get("/statistics")
def statistics():
    return get_attack_statistics()


@app.get("/model")
def model():
    return get_model_info()


@app.get("/notifications")
def notifications():
    return get_recent_notifications()


@app.get("/dashboard")
def dashboard():
    return {
        "summary": get_dashboard_statistics(),
        "statistics": get_attack_statistics(),
        "trend": get_attack_trend(),
        "predictions": get_recent_predictions(),
        "notifications": get_recent_notifications(),
        "model": get_model_info()
    }

@app.get("/recent-attacks")
def recent_attacks():
    return get_recent_attacks()

@app.get("/logs")
def logs(mode: str = "all"):

    if mode == "attack":
        return get_recent_attacks(limit=1000)

    return get_logs(limit=1000)