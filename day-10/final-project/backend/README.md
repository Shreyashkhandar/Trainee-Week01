# Smart Facility Management API

This backend provides the REST API for the Smart Facility Management Dashboard. It exposes facility, inspection, complaint, and dashboard metric endpoints, and it stores data in MySQL.

## Stack
- Node.js
- Express
- TypeScript
- MySQL

## Features
- Facility CRUD endpoints
- Inspection CRUD endpoints and facility-specific inspection lookup
- Complaint CRUD endpoints
- Dashboard metrics for operation oversight
- Centralized validation and error handling

## Environment setup
Create a `.env` file based on `.env.example` with the MySQL connection values used in your local setup.

## Run locally
```bash
cd day-10/final-project/backend
npm install
npm run dev
```

The API runs on `http://localhost:5001` by default.

## API overview
- `GET /api/health`
- `GET /api/dashboard/metrics`
- `GET /api/facilities`
- `GET /api/facilities/:id`
- `POST /api/facilities`
- `PUT /api/facilities/:id`
- `DELETE /api/facilities/:id`
- `GET /api/inspections`
- `GET /api/inspections/:id`
- `GET /api/facilities/:facilityId/inspections`
- `POST /api/inspections`
- `PUT /api/inspections/:id`
- `DELETE /api/inspections/:id`
- `GET /api/complaints`
- `GET /api/complaints/:id`
- `POST /api/complaints`
- `PUT /api/complaints/:id`
- `DELETE /api/complaints/:id`

## Testing
```bash
cd day-10/final-project/backend
npm test
```
