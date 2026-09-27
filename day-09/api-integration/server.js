const http = require('http');

const PORT = 3000;

const facilities = [
  {
    id: 1,
    name: 'North Campus Clinic',
    type: 'Clinic',
    status: 'Operational',
    region: 'North',
    location: 'Nairobi, North District',
    manager: 'A. Wanjiku',
    cleanlinessScore: 92,
    complaints: 3,
    riskLevel: 'Low',
    lastInspectionDate: '2026-09-18',
    description: 'Primary care and preventive health facility serving the north-west district.'
  },
  {
    id: 2,
    name: 'Freshwater Warehouse',
    type: 'Warehouse',
    status: 'Needs Review',
    region: 'Coastal',
    location: 'Mombasa, Coastal District',
    manager: 'J. Otieno',
    cleanlinessScore: 74,
    complaints: 12,
    riskLevel: 'Medium',
    lastInspectionDate: '2026-09-12',
    description: 'Storage and logistics unit for perishable goods and cold-chain inventory.'
  },
  {
    id: 3,
    name: 'Cedar Learning Hub',
    type: 'Training Center',
    status: 'Operational',
    region: 'Central',
    location: 'Kisumu, Central District',
    manager: 'L. Njeri',
    cleanlinessScore: 88,
    complaints: 4,
    riskLevel: 'Low',
    lastInspectionDate: '2026-09-22',
    description: 'Training and skills development center for technical operations and onboarding.'
  },
  {
    id: 4,
    name: 'Lakeside Laboratory',
    type: 'Laboratory',
    status: 'Critical',
    region: 'West',
    location: 'Kakamega, Western District',
    manager: 'S. Kamau',
    cleanlinessScore: 68,
    complaints: 18,
    riskLevel: 'High',
    lastInspectionDate: null,
    description: 'Public health testing lab for quality controls and contamination checks.'
  }
];

const inspections = [
  {
    id: 101,
    facilityId: 1,
    inspectionDate: '2026-09-18',
    inspector: 'Evelyn K.',
    cleanlinessScore: 92,
    odorScore: 12,
    wasteLevel: 'Low',
    remarks: 'Excellent hygiene record. Minor documentation upgrades recommended.',
    status: 'Pass'
  },
  {
    id: 102,
    facilityId: 2,
    inspectionDate: '2026-09-12',
    inspector: 'Daniel M.',
    cleanlinessScore: 74,
    odorScore: 38,
    wasteLevel: 'Moderate',
    remarks: 'Address pest control and storage labeling before the next review.',
    status: 'Warning'
  },
  {
    id: 103,
    facilityId: 3,
    inspectionDate: '2026-09-22',
    inspector: 'Grace T.',
    cleanlinessScore: 88,
    odorScore: 18,
    wasteLevel: 'Low',
    remarks: 'Strong facility cleanliness; reserve training modules should be refreshed.',
    status: 'Pass'
  }
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large')); 
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON request body'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost:3000');

  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname === '/api/dashboard') {
    const metrics = {
      totalFacilities: facilities.length,
      inspectedFacilities: facilities.filter((facility) => facility.lastInspectionDate).length,
      pendingInspections: facilities.filter((facility) => !facility.lastInspectionDate).length,
      averageCleanlinessScore: Math.round(facilities.reduce((sum, facility) => sum + facility.cleanlinessScore, 0) / facilities.length)
    };
    sendJson(res, 200, metrics);
    return;
  }

  if (pathname === '/api/facilities') {
    if (req.method === 'GET') {
      sendJson(res, 200, facilities);
      return;
    }
  }

  const facilityMatch = pathname.match(/^\/api\/facilities\/(\d+)$/);
  if (facilityMatch) {
    const facilityId = Number(facilityMatch[1]);
    const facility = facilities.find((item) => item.id === facilityId);
    if (!facility) {
      sendJson(res, 404, { message: 'Facility not found' });
      return;
    }

    if (req.method === 'GET') {
      sendJson(res, 200, facility);
      return;
    }
  }

  const inspectionMatch = pathname.match(/^\/api\/facilities\/(\d+)\/inspections$/);
  if (inspectionMatch) {
    const facilityId = Number(inspectionMatch[1]);
    if (req.method === 'GET') {
      const facilityInspections = inspections.filter((item) => item.facilityId === facilityId);
      sendJson(res, 200, facilityInspections);
      return;
    }
  }

  if (pathname === '/api/inspections' && req.method === 'POST') {
    try {
      const payload = await parseBody(req);
      const { facilityId, inspectionDate, inspector, cleanlinessScore, odorScore, wasteLevel, remarks, status } = payload;
      const facility = facilities.find((item) => item.id === Number(facilityId));
      if (!facility) {
        sendJson(res, 404, { message: 'Facility not found' });
        return;
      }

      const date = new Date(`${inspectionDate}T00:00:00.000Z`);
      const dateIsValid = typeof inspectionDate === 'string'
        && !Number.isNaN(date.getTime())
        && date.toISOString().slice(0, 10) === inspectionDate
        && inspectionDate <= new Date().toISOString().slice(0, 10);
      const scoresAreValid = Number.isInteger(cleanlinessScore) && cleanlinessScore >= 0 && cleanlinessScore <= 100
        && Number.isInteger(odorScore) && odorScore >= 0 && odorScore <= 100;
      if (!Number.isInteger(Number(facilityId)) || typeof inspector !== 'string' || inspector.trim().length < 2
        || !dateIsValid || !scoresAreValid || !['Low', 'Moderate', 'High'].includes(wasteLevel)
        || !['Pass', 'Warning', 'Critical'].includes(status) || (remarks !== undefined && typeof remarks !== 'string')) {
        sendJson(res, 400, { message: 'Check the facility, date, inspector, scores, waste level, status and remarks.' });
        return;
      }

      const newInspection = {
        id: Math.max(0, ...inspections.map((item) => item.id)) + 1,
        facilityId: Number(facilityId),
        inspectionDate,
        inspector,
        cleanlinessScore,
        odorScore,
        wasteLevel,
        remarks: remarks || '',
        status
      };

      inspections.unshift(newInspection);
      facility.lastInspectionDate = inspectionDate;
      facility.cleanlinessScore = cleanlinessScore;
      facility.status = status === 'Critical' ? 'Critical' : status === 'Warning' ? 'Needs Review' : 'Operational';
      facility.riskLevel = facility.status === 'Critical' ? 'High' : facility.status === 'Needs Review' ? 'Medium' : 'Low';

      sendJson(res, 201, newInspection);
    } catch (error) {
      sendJson(res, 400, { message: error.message || 'Unable to process inspection' });
    }
    return;
  }

  sendJson(res, 404, { message: 'Endpoint not found' });
});

server.listen(PORT, () => {
  console.log(`Mock inspection API listening on http://localhost:${PORT}`);
});
