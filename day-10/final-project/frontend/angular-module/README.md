# Angular Facility Inspection Summary

This Angular module is a lightweight, API-connected page for facility operations monitoring.

## Purpose
It connects to the same backend API used by the Next.js dashboard and presents a concise view of facilities with key operational metrics.

## Run locally
```bash
cd day-10/final-project/frontend/angular-module
npm install
ng serve --port 4200
```

Then open:
`http://localhost:4200`

## API integration
The Angular service calls:
- `GET /api/facilities`
- `GET /api/dashboard/metrics`

## Notes
This is a separate Angular application to satisfy the assignment requirement for an Angular module/page and keep the main React/Next.js dashboard independent.
