from fastapi import FastAPI

from scan_api.routes.auth import auth_router
from scan_api.routes.calendar import calendar_router

app = FastAPI()

app.include_router(auth_router, prefix='/auth', tags=["Google Authentication"])
app.include_router(calendar_router, prefix="/calendar", tags=["Calendar Manager"])


@app.get('/')
def home():
    return { "data": "Hello World" }