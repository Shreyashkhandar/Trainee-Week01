# Smart Facility Management Dashboard

## Purpose

A local facility-operations dashboard for reviewing facilities, inspection records, and complaints. The Next.js interface uses a REST API backed by MySQL. A separate Angular summary page consumes the same API.

## Architecture

- `frontend/` is the main React and Next.js application. It calls the backend from the browser.
- `backend/` is a TypeScript and Express API. It validates requests and reads/writes the MySQL database.
- `database/schema.sql` creates the database and its facilities, inspections, and complaints tables. `database/seed.sql` inserts or refreshes the sample records.
- `frontend/angular-module/` is a separate Angular application. It reads dashboard metrics and a facility list from the API.
- `ml/` is not integrated or required by this implementation. It contains only a README explaining that it is retained for the submission structure.

The backend listens on port `5001`. The Next.js app defaults to `http://localhost:3000`; the Angular app defaults to `http://localhost:4200`.

## Technologies

- Node.js, npm, TypeScript, Express 5, and `mysql2`
- React 19 and Next.js 16
- Angular 19
- MySQL or MariaDB

## Database Setup

Start MySQL, open a terminal in this directory, and run the SQL files from the MySQL client:

```text
mysql -u root -p
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

The schema creates the `facility_management` database and three related tables. The seed script is safe to rerun for its fixed sample IDs. The verified sample data contains 12 facilities, 24 inspections, and 12 complaints.

## Configuration

Copy `backend/.env.example` to `backend/.env` and set local database values. Do not commit credentials. The backend supports `PORT`, `CLIENT_ORIGINS`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, and `DATABASE_PASSWORD`.

`CLIENT_ORIGINS` accepts a comma-separated list. The backend always permits `http://localhost:3000`, `http://localhost:4200`, and the prior defaults `http://localhost:3001` and `http://localhost:4201`; configured origins are added to those defaults.

The Next.js API client uses `NEXT_PUBLIC_API_URL` when set and otherwise uses `http://localhost:5001/api`. The Angular module currently calls `http://localhost:5001/api` directly.

## Run Locally

Run each application in a separate terminal after database setup.

Backend:

```bash
cd backend
npm install
npm run dev
```

The backend is available at `http://localhost:5001`. For a production build, run `npm run build` and then `npm start` from `backend/`.

Next.js frontend:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. For a production build, run `npm run build` and then `npm start` from `frontend/`.

Angular module:

```bash
cd frontend/angular-module
npm install
npm run start
```

Open `http://localhost:4200`. `npm run build` creates the production bundle. This page displays dashboard metrics and up to six facilities.

## API Endpoints

Successful API responses use `{ "success": true, "data": ... }`; errors include a message.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Database-backed health check |
| `GET` | `/api/dashboard/metrics` | Dashboard totals and average cleanliness |
| `GET` | `/api/facilities` | List facilities; supports `search`, `status`, `type`, and `sort` filters |
| `GET` | `/api/facilities/:id` | Facility detail |
| `POST` | `/api/facilities` | Create a facility |
| `PUT` | `/api/facilities/:id` | Update a facility |
| `DELETE` | `/api/facilities/:id` | Delete a facility and its related records |
| `GET` | `/api/inspections` | List inspections; supports `facilityId` and `status` filters |
| `GET` | `/api/inspections/:id` | Inspection detail |
| `POST` | `/api/inspections` | Create an inspection |
| `PUT` | `/api/inspections/:id` | Update an inspection |
| `DELETE` | `/api/inspections/:id` | Delete an inspection |
| `GET` | `/api/facilities/:facilityId/inspections` | List inspections for one facility |
| `GET` | `/api/complaints` | List complaints; supports `search`, `priority`, `status`, and `facilityId` filters |
| `GET` | `/api/complaints/:id` | Complaint detail |
| `POST` | `/api/complaints` | Create a complaint |
| `PUT` | `/api/complaints/:id` | Update a complaint |
| `DELETE` | `/api/complaints/:id` | Delete a complaint |

## Testing and Builds

Run from `backend/`:

```bash
npm run build
npm test
```

The backend tests exercise health and unknown routes, seeded reads and dashboard metrics, validation errors, CORS preflight, and facility/inspection/complaint create-update-delete flows. They require the local database and seeded records. The Angular module has its own `npm run build`; the Next.js frontend has its own `npm run build` from `frontend/`.

## Known Limitations

- This is a local demo and has no authentication, authorization, or role management.
- The Angular app is a small read-only summary page, not a second full management interface.
- The ML folder is not part of the running application.
- The Angular dependency installation reported 30 npm audit findings (2 low, 14 moderate, 13 high, and 1 critical); they have not been investigated or remediated here.
- Production deployment, monitoring, backups, and operational alerting are not configured.
