import os
import pickle

from google_auth_oauthlib.flow import Flow, InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.auth.transport.requests import Request

from .constants import GOOGLE_CLIENT_SECRET_FILE, GOOGLE_API_NAME, GOOGLE_API_VERSION, GOOGLE_API_SCOPES


def create_google_service():
    creds = None

    pickle_file = f'token_{GOOGLE_API_NAME}_{GOOGLE_API_VERSION}.pickle'
    
    if os.path.exists(pickle_file):
        with open(pickle_file, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(GOOGLE_CLIENT_SECRET_FILE, GOOGLE_API_SCOPES)
            cred = flow.run_local_server()

        with open(pickle_file, 'wb') as token:
            pickle.dump(cred, token)

    try:
        service = build(GOOGLE_API_NAME, GOOGLE_API_VERSION, credentials=creds)
        print(GOOGLE_API_NAME, 'service created successfully')
        return service
    except Exception as e:
        print(e)
        return None

