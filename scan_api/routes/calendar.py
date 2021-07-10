from fastapi import APIRouter, status

# from scan_api.schemas.calendar import CalendarEventModel

calendar_router = APIRouter()

@calendar_router.get('')
def overview():
    return { "data": "Calendar Routes" } 
