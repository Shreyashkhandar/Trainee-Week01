# Day 9 — Angular + TypeScript + API Integration

## 1. Project Overview

This project is a facility inspection dashboard built with Angular and TypeScript. It displays inspection metrics and facility records, supports search and filters, and lets an inspector submit a new inspection. The app uses a small local REST-compatible mock API in `api-integration/`.

## 2. Objective

Practice Angular components, templates, data binding, routing, reactive forms, dependency injection, HttpClient, Observables, and basic RxJS while building a dashboard that could later be adapted for Ionic.

## 3. Problem Statement

Facility teams need one place to review cleanliness and inspection status, find a facility, review its inspection history, and record a new inspection with validated values.

## 4. Features

- Dashboard metrics for total, inspected, and pending facilities and average cleanliness.
- Facility search by name, location, or manager.
- Status and facility-type filters, plus sorting by name, cleanliness, or complaints.
- Facility details at `/facilities/:id`, including inspection history.
- Reactive inspection form with facility, date, inspector, cleanliness and odor scores, waste level, remarks, and status.
- Loading, empty, success, and API error states with a retry action on the dashboard.

## 5. Technology Stack

- Angular 18.2.14 with standalone components and Angular Router.
- TypeScript 5.5.4 and RxJS 7.8.
- Node.js built-in `http` module for the mock REST API; no Express or UI libraries.
- Jasmine, Karma, and headless Chrome for service tests.

## 6. Project Structure

```text
day-09/
├── angular-app/
│   ├── src/app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── dashboard.component.ts
│   │   ├── facility-detail.component.ts
│   │   ├── facility.service.ts
│   │   ├── facility.service.spec.ts
│   │   ├── inspection-form.component.ts
│   │   ├── inspection-history.component.ts
│   │   ├── metric-card.component.ts
│   │   └── models.ts
│   ├── src/styles.css
│   ├── package.json
│   └── README.md
├── api-integration/
│   ├── README.md
│   └── server.js
└── README.md
```

## 7. Architecture

The standalone root component provides the navigation shell and router outlet. The dashboard, facility detail, and inspection form are route-level components; metric cards and inspection history are reusable components. `FacilityService` owns HTTP requests, and `models.ts` defines the API data contracts. No route guard is needed because this training app has no authentication or restricted routes.

## 8. Data Flow

The dashboard requests metrics and facilities in parallel with `forkJoin`. Selecting a facility navigates to its route; the detail page loads the facility and inspection history. The reactive form validates its values locally, posts an `InspectionSubmission`, and the mock API updates its in-memory records and metrics.

## 9. Angular Concepts Demonstrated

- Standalone components and HTML templates.
- Property and event binding, `[(ngModel)]`, `*ngIf`, `*ngFor`, and `ngClass`.
- Built-in `date` pipe and dynamic property bindings.
- Dependency injection through `FacilityService` and `provideHttpClient()`.
- Router links, route parameters, query parameters, and route titles.
- Typed reactive forms and field-level validation messages.
- HttpClient Observables, `forkJoin`, `finalize`, and `take`.
- Loading, empty, API error, form validation, submission, and success states.

## 10. API Endpoints

The app uses `GET /api/dashboard`, `GET /api/facilities`, `GET /api/facilities/:id`, `GET /api/facilities/:id/inspections`, and `POST /api/inspections`. Request and response examples are documented in [api-integration/README.md](api-integration/README.md).

## 11. TypeScript Models

`models.ts` contains `Facility`, `Inspection`, `DashboardMetrics`, and `InspectionSubmission` interfaces, plus status and waste-level unions. The service methods return typed Observables rather than `any`.

## 12. Installation

Use Node.js 22 and npm. From PowerShell:

```powershell
cd C:\Trainee-Week01\day-09\angular-app
npm install
```

Dependencies were already present in this workspace; no additional UI or API packages were installed for this implementation.

## 13. Dependencies

Angular framework packages, Angular CLI/build tools, RxJS, TypeScript, zone.js, Jasmine, and Karma are listed in `angular-app/package.json` and locked in its package lock.

## 14. Environment Variables

No environment variables are required. The Angular service uses `http://localhost:3000/api`; the mock server listens on port `3000`.

## 15. How to Run

Start the local mock API in one terminal from the workspace root:

```powershell
node day-09/api-integration/server.js
```

Start Angular in another terminal:

```powershell
cd C:\Trainee-Week01\day-09\angular-app
npm start
```

Open `http://localhost:4200/`.

## 16. Testing

The following checks were run during implementation:

- `npm run build` succeeded. Angular reported component-style budget warnings for the dashboard and facility detail styles; there were no build errors.
- `npm test -- --watch=false --browsers=ChromeHeadless` passed all 3 `FacilityService` tests. Karma printed a ChromeHeadless shutdown warning after the passing result.
- Browser checks covered dashboard loading/retry, search, status/type filters, sorting, facility details, inspection history, required-field validation, valid inspection submission, and the not-found state.
- API checks covered metrics/list/detail responses, invalid inspection submission (`400`), and missing facility (`404`).

## 17. Challenges Faced

The initial screen components, mock API, and TypeScript models used different field names, and the starter root page was still in place. The project also had no spec files, so the configured Karma command had no test inputs.

## 18. Solutions

The model, service, form, and mock API now share one typed contract; routing and the app shell are connected; and focused service specs verify the API request paths and payload. An explicit TypeScript `rootDir` also clears the TypeScript 6 editor diagnostic while retaining a passing Angular build.

## 19. Limitations

This is a local mock REST API, not a production backend. Data is held in memory and resets when the server restarts. It has no authentication, database persistence, or deployment configuration. The API base URL is currently fixed in `FacilityService`.

## 20. Future Improvements

- Persist records in a database and move the mock API to a production-ready backend.
- Read the API base URL from environment configuration.
- Add authentication, server-side pagination, and automated browser tests.
- Adapt the reusable screens and navigation for Ionic mobile layouts.
