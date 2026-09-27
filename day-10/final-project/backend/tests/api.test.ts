import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { app } from '../src/app.js';
import { pool } from '../src/config/database.js';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface Facility {
  id: number;
  facilityCode: string;
  cleanlinessScore: number;
  lastInspectionDate: string | null;
}

interface Inspection {
  id: number;
  facilityId: number;
  status: string;
  cleanlinessScore: number;
}

interface Complaint {
  id: number;
  facilityId: number;
  status: string;
  priority: string;
}

let server: ReturnType<typeof app.listen>;
let apiUrl: string;

before(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  apiUrl = `http://127.0.0.1:${address.port}/api`;
});

after(async () => {
  if (server) await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await pool.end();
});

async function request<T>(path: string, init?: RequestInit): Promise<{ response: Response; body: ApiResponse<T> }> {
  const response = await fetch(`${apiUrl}${path}`, init);
  const body = await response.json() as ApiResponse<T>;
  return { response, body };
}

function jsonBody(value: unknown): RequestInit {
  return { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) };
}

test('health and unknown routes return their documented responses', async () => {
  const health = await request<{ status: string; database: string }>('/health');
  assert.equal(health.response.status, 200);
  assert.deepEqual(health.body.data, { status: 'ok', database: 'connected' });

  const root = await fetch(apiUrl.replace(/\/api$/, '/'));
  assert.equal(root.status, 404);
  assert.equal((await root.json() as ApiResponse<never>).message, 'API endpoint not found.');
});

test('seeded facilities, inspections, complaints, and metrics are available', async () => {
  const facilities = await request<Facility[]>('/facilities');
  assert.equal(facilities.response.status, 200);
  assert.ok(facilities.body.data?.some((facility) => facility.facilityCode === 'FAC-001'));

  const facility = await request<Facility>('/facilities/1');
  assert.equal(facility.response.status, 200);
  assert.equal(facility.body.data?.facilityCode, 'FAC-001');

  const inspections = await request<Inspection[]>('/inspections?facilityId=1');
  assert.equal(inspections.response.status, 200);
  assert.ok(inspections.body.data && inspections.body.data.length >= 2);

  const facilityInspections = await request<Inspection[]>('/facilities/1/inspections');
  assert.equal(facilityInspections.response.status, 200);
  assert.deepEqual(facilityInspections.body.data, inspections.body.data);

  const complaints = await request<Complaint[]>('/complaints?facilityId=1');
  assert.equal(complaints.response.status, 200);
  assert.ok(complaints.body.data?.some((complaint) => complaint.facilityId === 1));

  const metrics = await request<{ totalFacilities: number }>('/dashboard/metrics');
  assert.equal(metrics.response.status, 200);
  assert.equal(metrics.body.data?.totalFacilities, facilities.body.data?.length);
});

test('invalid inputs and filters return client errors without database writes', async () => {
  const invalidFacility = await request('/facilities', jsonBody({ name: '' }));
  assert.equal(invalidFacility.response.status, 400);

  const invalidId = await request('/facilities/not-an-id');
  assert.equal(invalidId.response.status, 400);

  const invalidFilter = await request('/facilities?status=Unknown');
  assert.equal(invalidFilter.response.status, 400);

  const malformedJson = await request('/facilities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{'
  });
  assert.equal(malformedJson.response.status, 400);
});

test('facility, inspection, and complaint create/update/delete routes work', async () => {
  let facilityId: number | undefined;
  try {
    const createdFacility = await request<Facility>('/facilities', jsonBody({
      name: 'API test facility',
      facilityCode: `TEST-${Date.now()}`,
      location: 'Test location',
      facilityType: 'Office',
      status: 'Active',
      cleanlinessScore: 50
    }));
    assert.equal(createdFacility.response.status, 201);
    assert.ok(createdFacility.body.data);
    facilityId = createdFacility.body.data.id;

    const updatedFacility = await request<Facility>(`/facilities/${facilityId}`, {
      ...jsonBody({
        name: 'Updated API test facility',
        facilityCode: createdFacility.body.data.facilityCode,
        location: 'Updated test location',
        facilityType: 'Office',
        status: 'Active',
        cleanlinessScore: 55
      }),
      method: 'PUT'
    });
    assert.equal(updatedFacility.response.status, 200);
    assert.equal(updatedFacility.body.data?.cleanlinessScore, 55);

    const createdInspection = await request<Inspection>('/inspections', jsonBody({
      facilityId,
      inspectorName: 'API Test Inspector',
      inspectionDate: new Date().toISOString().slice(0, 10),
      cleanlinessScore: 87,
      odorScore: 10,
      wasteLevel: 'Low',
      waterAvailability: true,
      remarks: 'Created by backend integration test.',
      status: 'Pending'
    }));
    assert.equal(createdInspection.response.status, 201);
    assert.ok(createdInspection.body.data);

    const updatedInspection = await request<Inspection>(`/inspections/${createdInspection.body.data.id}`, {
      ...jsonBody({
        facilityId,
        inspectorName: 'API Test Inspector',
        inspectionDate: new Date().toISOString().slice(0, 10),
        cleanlinessScore: 88,
        odorScore: 9,
        wasteLevel: 'Low',
        waterAvailability: true,
        remarks: 'Updated by backend integration test.',
        status: 'Completed'
      }),
      method: 'PUT'
    });
    assert.equal(updatedInspection.response.status, 200);
    assert.equal(updatedInspection.body.data?.cleanlinessScore, 88);

    const createdComplaint = await request<Complaint>('/complaints', jsonBody({
      facilityId,
      title: 'API test complaint',
      description: 'Created by backend integration test.',
      complaintType: 'Other',
      priority: 'Low',
      status: 'Open',
      reportedBy: 'API integration test'
    }));
    assert.equal(createdComplaint.response.status, 201);
    assert.ok(createdComplaint.body.data);

    const updatedComplaint = await request<Complaint>(`/complaints/${createdComplaint.body.data.id}`, {
      ...jsonBody({
        facilityId,
        title: 'Updated API test complaint',
        description: 'Updated by backend integration test.',
        complaintType: 'Other',
        priority: 'Medium',
        status: 'In Progress',
        reportedBy: 'API integration test'
      }),
      method: 'PUT'
    });
    assert.equal(updatedComplaint.response.status, 200);
    assert.equal(updatedComplaint.body.data?.status, 'In Progress');

    const deletedComplaint = await request(`/complaints/${createdComplaint.body.data.id}`, { method: 'DELETE' });
    assert.equal(deletedComplaint.response.status, 200);

    const deletedInspection = await request(`/inspections/${createdInspection.body.data.id}`, { method: 'DELETE' });
    assert.equal(deletedInspection.response.status, 200);

    const deletedFacility = await request(`/facilities/${facilityId}`, { method: 'DELETE' });
    assert.equal(deletedFacility.response.status, 200);
    facilityId = undefined;
  } finally {
    if (facilityId !== undefined) await fetch(`${apiUrl}/facilities/${facilityId}`, { method: 'DELETE' });
  }
});

test('default frontend origins pass CORS preflight and existing defaults remain allowed', async () => {
  for (const origin of [
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost:3001',
    'http://localhost:4201'
  ]) {
    const response = await fetch(`${apiUrl}/health`, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'GET'
      }
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), origin);
  }
});