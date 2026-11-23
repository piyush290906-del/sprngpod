/**
 * SPRNGPOD Webinar Landing Server (Node.js)
 * Serves landing page & assets, handles form registrations, saves to JSON & CSV.
 * Zero npm dependencies (standard Node.js library).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT, 10) || 8080;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const JSON_PATH = path.join(DATA_DIR, 'registrations.json');
const CSV_PATH = path.join(DATA_DIR, 'registrations.csv');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(JSON_PATH)) {
  fs.writeFileSync(JSON_PATH, JSON.stringify([], null, 2), 'utf8');
}

if (!fs.existsSync(CSV_PATH)) {
  const header = 'id,registeredAt,name,email,phone,company,designation,sessionDay,sessionTime,timezone,startsAt,endsAt\n';
  fs.writeFileSync(CSV_PATH, header, 'utf8');
}

function calculateSessionDates(dayName, timeStr) {
  const targetDay = (dayName || '').toLowerCase().includes('tue') ? 2 : 4; // 2=Tue, 4=Thu
  const hour = (timeStr || '').includes('4:00') ? 16 : 14;
  const now = new Date();
  const currentDay = now.getUTCDay();
  const utcHour = hour - 4; // UAE is GST (UTC+4)

  let daysAhead = (targetDay - currentDay + 7) % 7;
  if (daysAhead === 0 && now.getUTCHours() >= utcHour) {
    daysAhead = 7;
  }

  const startDt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysAhead, utcHour, 0, 0));
  const endDt = new Date(startDt.getTime() + 60 * 60 * 1000);
  return { startsAt: startDt.toISOString(), endsAt: endDt.toISOString() };
}

function sendJson(res, statusCode, data) {
  const payload = Buffer.from(JSON.stringify(data, null, 2), 'utf8');
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': payload.length,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(payload);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname.replace(/\/$/, '') || '/';

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // API: Register POST
  if (req.method === 'POST' && (pathname === '/api/register' || pathname === '/register')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) req.destroy(); // 1MB limit
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const name = (data.name || '').trim();
        const email = (data.email || '').trim();
        const phone = (data.phone || '').trim();
        const company = (data.company || '').trim();
        const designation = (data.designation || '').trim();
        const sessionInfo = data.session || {};
        const sessionDay = (sessionInfo.day || '').trim();
        const sessionTime = (sessionInfo.time || '').trim();
        const timezone = (sessionInfo.timezone || 'Asia/Dubai').trim();

        if (!name) return sendJson(res, 400, { success: false, message: 'Full name is required.' });
        if (!email || !email.includes('@')) return sendJson(res, 400, { success: false, message: 'A valid email address is required.' });
        if (!sessionDay || !sessionTime) return sendJson(res, 400, { success: false, message: 'Please select a webinar session.' });

        const dates = calculateSessionDates(sessionDay, sessionTime);
        const timestamp = new Date().toISOString();
        const regId = 'sprng_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
        const clientIp = req.socket.remoteAddress || 'unknown';

        const record = {
          id: regId,
          registeredAt: timestamp,
          name,
          email,
          phone,
          company,
          designation,
          session: {
            day: sessionDay,
            time: sessionTime,
            timezone,
            startsAt: dates.startsAt,
            endsAt: dates.endsAt
          },
          ipAddress: clientIp
        };

        // 1. Append to JSON
        try {
          const list = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8') || '[]');
          list.push(record);
          fs.writeFileSync(JSON_PATH, JSON.stringify(list, null, 2), 'utf8');
        } catch (e) {
          console.error('Error writing JSON:', e);
        }

        // 2. Append to CSV
        try {
          const escapeCsv = val => `"${String(val || '').replace(/"/g, '""')}"`;
          const row = [
            regId, timestamp, name, email, phone,
            company, designation, sessionDay, sessionTime,
            timezone, dates.startsAt, dates.endsAt
          ].map(escapeCsv).join(',') + '\n';
          fs.appendFileSync(CSV_PATH, row, 'utf8');
        } catch (e) {
          console.error('Error writing CSV:', e);
        }

        console.log(`[REGISTRATION] New attendee: ${name} (${email}) - ${sessionDay} ${sessionTime}`);

        sendJson(res, 200, {
          success: true,
          message: 'Registration received and recorded successfully.',
          registrationId: regId,
          session: {
            day: sessionDay,
            time: sessionTime,
            timezone,
            startsAt: dates.startsAt,
            endsAt: dates.endsAt
          },
          localOnly: false
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Invalid JSON request: ' + err.message });
      }
    });
    return;
  }

  // API: List registrations
  if (req.method === 'GET' && pathname === '/api/registrations') {
    try {
      const list = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8') || '[]');
      return sendJson(res, 200, { success: true, count: list.length, registrations: list });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // API: Export CSV
  if (req.method === 'GET' && pathname === '/api/registrations/export') {
    if (!fs.existsSync(CSV_PATH)) {
      return sendJson(res, 404, { success: false, message: 'No registrations found' });
    }
    const data = fs.readFileSync(CSV_PATH);
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="sprngpod_registrations.csv"',
      'Content-Length': data.length
    });
    return res.end(data);
  }

  // Static File Serving
  let filePath = path.join(ROOT_DIR, pathname);
  if (pathname === '/' || pathname === '') {
    filePath = path.join(ROOT_DIR, 'index.html');
  } else if (pathname === '/webinar/register') {
    filePath = path.join(ROOT_DIR, 'webinar', 'register', 'index.html');
  } else if (pathname === '/webinar/success') {
    filePath = path.join(ROOT_DIR, 'webinar', 'success', 'index.html');
  } else if (pathname === '/admin') {
    filePath = path.join(ROOT_DIR, 'admin.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`============================================================`);
  console.log(`SPRNGPOD Webinar Server running at: http://localhost:${PORT}/`);
  console.log(`- Landing Page:        http://localhost:${PORT}/`);
  console.log(`- Registration Form:   http://localhost:${PORT}/webinar/register`);
  console.log(`- Registrations API:   http://localhost:${PORT}/api/registrations`);
  console.log(`- CSV Export:          http://localhost:${PORT}/api/registrations/export`);
  console.log(`- Stored Data Files:   ${DATA_DIR}`);
  console.log(`============================================================`);
});
