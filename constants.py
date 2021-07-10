import os

GOOGLE_CLIENT_SECRET_FILE = 'client_secret_671433459980-ra2bm5drm34m3ndeueo5fdpou8mghhqp.apps.googleusercontent.com.json'
GOOGLE_API_SCOPES = ['https://googleapis.com/auth/calendar']
GOOGLE_API_NAME = 'scanlendar'
GOOGLE_API_VERSION = 'v3'

GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID", "")
GOOGLE_API_KEY = os.getenv("API_KEY", "")