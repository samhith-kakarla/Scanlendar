from fastapi import APIRouter, status

# from scan_api.schemas.calendar import CalendarEventModel

calendar_router = APIRouter()

@calendar_router.get('')
def overview():
    return { "data": "Calendar Routes" } 

@calendar_router.post('/get_event_info/{text}')
def getEventInfo(text: str):
    event_info = run_nlp(text)

    return {
        'title': event_info['text'], 
        'description': event_info['description'], 
        'start_time': event_info['start_time'], 
        'end_time': event_info['end_time'], 
        'start_date': event_info['start_date'], 
        'end_date': event_info['end_date']
    }


