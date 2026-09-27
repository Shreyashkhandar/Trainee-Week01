# Facility Inspection Mock API

This folder contains the local REST-compatible mock API used by the Angular dashboard. It uses Node.js built-in modules and keeps data in memory; it is for training and local development, not a production service.

## Run

From the workspace root:

```powershell
node day-09/api-integration/server.js
```

The API base URL is `http://localhost:3000/api`. CORS is enabled for local Angular development. Restarting the server resets inspection changes.

## Endpoints

| Method | Path | Success | Purpose |
|---|---|---:|---|
| GET | `/api/dashboard` | 200 | Return dashboard metrics. |
| GET | `/api/facilities` | 200 | Return all facilities. |
| GET | `/api/facilities/:id` | 200 | Return one facility. |
| GET | `/api/facilities/:id/inspections` | 200 | Return a facility's inspection history (an empty array is valid). |
| POST | `/api/inspections` | 201 | Validate and create an inspection; update the facility's current summary. |

## Data Shapes

`GET /api/dashboard` returns:

```json
{
  "totalFacilities": 4,
  "inspectedFacilities": 3,
  "pendingInspections": 1,
  "averageCleanlinessScore": 81
}
```

Facility records contain `id`, `name`, `type`, `status`, `location`, `region`, `manager`, `cleanlinessScore`, `complaints`, `riskLevel`, `lastInspectionDate`, and `description`.

Inspection records contain `id`, `facilityId`, `inspectionDate`, `inspector`, `cleanlinessScore`, `odorScore`, `wasteLevel`, `remarks`, and `status`.

`POST /api/inspections` accepts JSON such as:

```json
{
  "facilityId": 1,
  "inspectionDate": "2026-09-27",
  "inspector": "A. Reviewer",
  "cleanlinessScore": 86,
  "odorScore": 15,
  "wasteLevel": "Moderate",
  "remarks": "Storage area needs a follow-up check.",
  "status": "Warning"
}
```

The `201` response is the created Inspection object, including its generated `id`.

## Errors

Errors use JSON with a `message` field. A facility lookup for an unknown ID returns `404` with `{"message":"Facility not found"}`. Invalid JSON, missing/invalid inspection fields, dates, or scores return `400` with a validation message. An unknown endpoint returns `404` with `{"message":"Endpoint not found"}`.

## Angular Client

`FacilityService` in `day-09/angular-app/src/app/facility.service.ts` calls these endpoints using Angular `HttpClient` and typed Observables. The Angular app displays friendly loading and error states when the API cannot be reached or a requested facility is missing.
