import os
import json
from flask import Flask, redirect, request, url_for, jsonify
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request

app = Flask(__name__)

# Set the client ID and secret from Google Cloud Console
CLIENT_ID = '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com'  # Replace with your client ID
CLIENT_SECRET = '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'  # Replace with your client secret
REDIRECT_URI = 'http://localhost:5000/oauth2callback'  # Replace with your redirect URI (e.g., http://localhost:5000/oauth2callback)
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# This path is where your OAuth 2.0 client secrets file will be located
CLIENT_SECRETS_FILE = 'client_secrets.json'

# Flask route to start OAuth flow
@app.route('/auth')
def auth():
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
    flow.redirect_uri = REDIRECT_URI

    # Generate the authorization URL
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )

    # Store the state so we can verify it later
    session['state'] = state
    return redirect(authorization_url)

# Flask route to handle OAuth callback and exchange the authorization code for credentials
@app.route('/oauth2callback')
def oauth2callback():
    # Retrieve the authorization response
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES, state=session['state'])
    flow.redirect_uri = REDIRECT_URI
    authorization_response = request.url

    # Fetch the credentials
    flow.fetch_token(authorization_response=authorization_response)

    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)

    # Now you can make requests to Google Sheets API
    return redirect(url_for('get_google_sheet_data'))

# Flask route to access Google Sheets API with the credentials
@app.route('/get_google_sheet_data')
def get_google_sheet_data():
    credentials = session.get('credentials')
    if not credentials:
        return redirect(url_for('auth'))

    credentials = google.oauth2.credentials.Credentials(**credentials)
    service = build('sheets', 'v4', credentials=credentials)

    # Call the Sheets API to get data from a spreadsheet
    spreadsheet_id = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE'  # Replace with your spreadsheet ID
    range_name = 'Sheet1!A1:D10'  # Replace with your desired range
    sheet = service.spreadsheets()

    result = sheet.values().get(spreadsheetId=spreadsheet_id, range=range_name).execute()
    values = result.get('values', [])

    return jsonify(values)

# Utility function to convert credentials to a dictionary
def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }

if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
