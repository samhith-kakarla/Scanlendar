import os
from fastapi import APIRouter, status

from google import create_google_service

auth_router = APIRouter()

@auth_router.get('')
def overview():
    return { "data": "Auth Routes" }

@auth_router.get('/google_authenticate')
def authenticate_user_with_google():
    service = create_google_service()
    
    # Get tokens and return to user
