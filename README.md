# SPRNGPOD Webinar Landing & Backend

A clean, responsive webinar landing page for SPRNGPOD with live registration, modal confirmation, and built-in backend data collection.

## Quick Start

You can run the backend with either **Python** or **Node.js** (zero external dependencies required):

### Option A: Run with Python
```bash
python server.py
```

### Option B: Run with Node.js
```bash
node server.js
# or
npm start
```

By default, the server runs at **http://localhost:8080**.
You can customize the port by setting the `PORT` environment variable:
```bash
PORT=3000 python server.py
```

## Features

- **Homepage & Presentation**:
  - Live webinar details for "The Future of Visitor Management".
  - Clean hero presentation with responsive navigation and authentic SPRNGPOD 6-bar branding.
  - Video preview, curriculum breakdown, and embedded SPRNG-ZIP product showcase.
- **Registration Form** (`/webinar/register`):
  - Full Name, Email, optional Phone number, optional Company, and optional Designation.
  - Session selection (Tuesday & Thursday at 2:00 PM or 4:00 PM UAE Time / GST).
- **Instant Registration Modal**:
  - When submitting the form, an on-screen popup confirms the registration.
  - Generates and downloads an `.ics` calendar file to add the session directly to Google Calendar, Apple Calendar, or Outlook.
- **Backend Data Collection**:
  - Collects registrations via `POST /api/register`.
  - Automatically records every submission in three formats inside `data/`:
    1. **`data/registrations.csv`**: Ready to open in Excel or Google Sheets.
    2. **`data/registrations.json`**: Structured JSON database for APIs and integrations.
    3. **`data/registrations.db`**: SQLite database (when running via `server.py`).

## API Endpoints

- `POST /api/register`: Submit a new registration.
  - Body: `{ "name": "...", "email": "...", "phone": "...", "company": "...", "designation": "...", "session": { "day": "Tuesday", "time": "2:00 PM" } }`
- `GET /api/registrations`: Retrieve all registered attendees as JSON.
- `GET /api/registrations/export`: Download the `registrations.csv` file directly.
