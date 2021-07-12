from fastapi import APIRouter, status
from nltk.util import py25
from scan_nlp import Nlp

# from scan_api.schemas.calendar import CalendarEventModel

calendar_router = APIRouter()

@calendar_router.get('')
def overview():
    return { "data": "Calendar Routes" } 

@calendar_router.post('/get_event_info/{text}')
def getEventInfo(text: str):
    event_info = Nlp(text)

    return {
        'title': event_info['day'], 
        'description': event_info['description'], 
        'start_time': "{}:00-{}:00".format(event_info['start_time']),
        'end_time': "{}:00-{}:00".format(event_info['end_time']),
    }


