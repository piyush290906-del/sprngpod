#!/usr/bin/env python3
"""
SPRNGPOD Webinar Landing Server
Handles static file serving, form registration API, SQLite/JSON/CSV storage, and registrations export.
Zero external dependencies required (uses Python 3 standard library).
"""

import os
import sys
import json
import csv
import sqlite3
import datetime
from http import HTTPStatus
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse

PORT = int(os.environ.get("PORT", 8080))
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT_DIR, "data")
DB_PATH = os.path.join(DATA_DIR, "registrations.db")
JSON_PATH = os.path.join(DATA_DIR, "registrations.json")
CSV_PATH = os.path.join(DATA_DIR, "registrations.csv")

os.makedirs(DATA_DIR, exist_ok=True)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect(DB_PATH)
    with conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS registrations (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                company TEXT,
                designation TEXT,
                session_day TEXT NOT NULL,
                session_time TEXT NOT NULL,
                timezone TEXT NOT NULL,
                starts_at TEXT,
                ends_at TEXT,
                registered_at TEXT NOT NULL,
                ip_address TEXT
            )
        """)
    conn.close()

    if not os.path.exists(JSON_PATH):
        with open(JSON_PATH, "w", encoding="utf-8") as f:
            json.dump([], f, indent=2)

    if not os.path.exists(CSV_PATH):
        with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "id", "registeredAt", "name", "email", "phone",
                "company", "designation", "sessionDay", "sessionTime",
                "timezone", "startsAt", "endsAt"
            ])

init_db()

def calculate_session_dates(day_name, time_str):
    target_day = 1 if "tue" in day_name.lower() else 3  # 0=Monday in Python: 1=Tuesday, 3=Thursday
    hour = 16 if "4:00" in time_str else 14
    utc_hour = hour - 4  # UAE is GST (UTC+4)

    now = datetime.datetime.now(datetime.timezone.utc)
    current_day = now.weekday()

    days_ahead = (target_day - current_day) % 7
    if days_ahead == 0 and now.hour >= utc_hour:
        days_ahead = 7

    event_date = now.date() + datetime.timedelta(days=days_ahead)
    start_dt = datetime.datetime(
        event_date.year, event_date.month, event_date.day,
        utc_hour, 0, 0, tzinfo=datetime.timezone.utc
    )
    end_dt = start_dt + datetime.timedelta(hours=1)
    return start_dt.isoformat().replace("+00:00", "Z"), end_dt.isoformat().replace("+00:00", "Z")

class WebinarRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def send_json(self, status_code, data):
        payload = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(payload)

    def do_OPTIONS(self):
        self.send_response(HTTPStatus.NO_CONTENT)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ("/api/register", "/register"):
            self.handle_registration()
        else:
            self.send_json(HTTPStatus.NOT_FOUND, {"success": False, "message": "Endpoint not found"})

    def handle_registration(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length <= 0:
                self.send_json(HTTPStatus.BAD_REQUEST, {"success": False, "message": "Empty request body"})
                return

            body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(body)
        except Exception as e:
            self.send_json(HTTPStatus.BAD_REQUEST, {"success": False, "message": f"Invalid JSON payload: {str(e)}"})
            return

        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip()
        phone = str(data.get("phone", "")).strip()
        company = str(data.get("company", "")).strip()
        designation = str(data.get("designation", "")).strip()
        session_info = data.get("session") or {}
        session_day = str(session_info.get("day", "")).strip()
        session_time = str(session_info.get("time", "")).strip()
        timezone = str(session_info.get("timezone", "Asia/Dubai")).strip()

        # Validation
        if not name:
            self.send_json(HTTPStatus.BAD_REQUEST, {"success": False, "message": "Full name is required."})
            return
        if not email or "@" not in email:
            self.send_json(HTTPStatus.BAD_REQUEST, {"success": False, "message": "A valid email address is required."})
            return
        if not session_day or not session_time:
            self.send_json(HTTPStatus.BAD_REQUEST, {"success": False, "message": "Please select a valid webinar session."})
            return

        starts_at, ends_at = calculate_session_dates(session_day, session_time)
        timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
        reg_id = f"sprng_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}_{os.urandom(3).hex()}"
        client_ip = self.client_address[0] if self.client_address else "unknown"

        # 1. Save to SQLite DB
        try:
            conn = sqlite3.connect(DB_PATH)
            with conn:
                conn.execute("""
                    INSERT INTO registrations (
                        id, name, email, phone, company, designation,
                        session_day, session_time, timezone, starts_at, ends_at,
                        registered_at, ip_address
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    reg_id, name, email, phone, company, designation,
                    session_day, session_time, timezone, starts_at, ends_at,
                    timestamp, client_ip
                ))
            conn.close()
        except Exception as e:
            print(f"Error saving to SQLite: {e}", file=sys.stderr)

        # 2. Save to JSON file
        try:
            record = {
                "id": reg_id,
                "registeredAt": timestamp,
                "name": name,
                "email": email,
                "phone": phone,
                "company": company,
                "designation": designation,
                "session": {
                    "day": session_day,
                    "time": session_time,
                    "timezone": timezone,
                    "startsAt": starts_at,
                    "endsAt": ends_at
                },
                "ipAddress": client_ip
            }
            existing = []
            if os.path.exists(JSON_PATH):
                try:
                    with open(JSON_PATH, "r", encoding="utf-8") as f:
                        existing = json.load(f)
                except Exception:
                    existing = []
            existing.append(record)
            with open(JSON_PATH, "w", encoding="utf-8") as f:
                json.dump(existing, f, indent=2)
        except Exception as e:
            print(f"Error saving to JSON: {e}", file=sys.stderr)

        # 3. Save to CSV file
        try:
            with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerow([
                    reg_id, timestamp, name, email, phone,
                    company, designation, session_day, session_time,
                    timezone, starts_at, ends_at
                ])
        except Exception as e:
            print(f"Error saving to CSV: {e}", file=sys.stderr)

        print(f"[REGISTRATION] New registrant: {name} ({email}) - {session_day} {session_time}")

        self.send_json(HTTPStatus.OK, {
            "success": True,
            "message": "Registration received and recorded successfully.",
            "registrationId": reg_id,
            "session": {
                "day": session_day,
                "time": session_time,
                "timezone": timezone,
                "startsAt": starts_at,
                "endsAt": ends_at
            },
            "localOnly": False
        })

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"

        if path == "/api/registrations":
            self.handle_list_registrations()
            return
        elif path == "/api/registrations/export":
            self.handle_export_csv()
            return

        # Friendly URL mapping
        if path == "" or path == "/":
            self.path = "/index.html"
        elif path == "/webinar/register":
            self.path = "/webinar/register/index.html"
        elif path == "/webinar/success":
            self.path = "/webinar/success/index.html"
        elif path == "/admin":
            self.path = "/admin.html"

        super().do_GET()

    def handle_list_registrations(self):
        try:
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM registrations ORDER BY registered_at DESC")
            rows = [dict(row) for row in cursor.fetchall()]
            conn.close()
            self.send_json(HTTPStatus.OK, {
                "success": True,
                "count": len(rows),
                "registrations": rows
            })
        except Exception as e:
            self.send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {
                "success": False,
                "message": f"Failed to retrieve registrations: {str(e)}"
            })

    def handle_export_csv(self):
        if not os.path.exists(CSV_PATH):
            self.send_json(HTTPStatus.NOT_FOUND, {"success": False, "message": "No CSV records found"})
            return
        with open(CSV_PATH, "rb") as f:
            data = f.read()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/csv; charset=utf-8")
        self.send_header("Content-Disposition", 'attachment; filename="sprngpod_registrations.csv"')
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

def run(port=PORT):
    server = HTTPServer(("0.0.0.0", port), WebinarRequestHandler)
    print(f"============================================================")
    print(f"SPRNGPOD Webinar Server running at: http://localhost:{port}/")
    print(f"- Landing Page:        http://localhost:{port}/")
    print(f"- Registration Form:   http://localhost:{port}/webinar/register")
    print(f"- Registrations API:   http://localhost:{port}/api/registrations")
    print(f"- CSV Export:          http://localhost:{port}/api/registrations/export")
    print(f"- Stored Data Files:   {DATA_DIR}")
    print(f"============================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        server.server_close()

if __name__ == "__main__":
    run(PORT)
