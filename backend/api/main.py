from fastapi import FastAPI

from backend.database.queries import (
    get_recent_predictions,
    get_attack_statistics,
    get_recent_notifications,
    get_dashboard_statistics,
    get_model_info
)

app = FastAPI(
    title="IDS API",
    version="1.0"
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

@app.get("/dashboard")
def dashboard():

    return {
        "model": get_model_info(),
        "summary": get_dashboard_statistics(),
        "statistics": get_attack_statistics(),
        "predictions": get_recent_predictions(),
        "notifications": get_recent_notifications()
    }
