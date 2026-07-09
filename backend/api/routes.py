from fastapi import APIRouter

from backend.database.queries import (
    get_recent_predictions,
    get_recent_notifications,
    get_attack_statistics,
    get_dashboard_statistics
)

router = APIRouter()


@router.get("/predictions")
def predictions():

    return get_recent_predictions()


@router.get("/notifications")
def notifications():

    return get_recent_notifications()


@router.get("/statistics")
def statistics():

    return get_attack_statistics()


@router.get("/dashboard")
def dashboard():

    return {
        "summary": get_dashboard_statistics(),
        "predictions": get_recent_predictions(),
        "notifications": get_recent_notifications(),
        "statistics": get_attack_statistics()
    }
