# Day 7 - Next.js + Node.js

## Overview

Day 7 turns the employee dashboard from the earlier training days into a full-stack application. The Next.js frontend uses the App Router, and a separate Node.js/Express API owns employee CRUD and JSON-file persistence.

## Objective

The goal was to connect a frontend to a REST API and understand how routes, controllers, services, models, middleware, validation, and error handling fit together.

## Next.js Concepts

- **App Router:** routes live under `nextjs-app/app`.
- **Pages and layouts:** `layout.tsx` supplies the shared document shell and each `page.tsx` is a route.
- **Dynamic routes:** `app/employees/[id]` displays one employee and `[id]/edit` edits one employee.
- **Server components:** the employee list, details, and edit pages fetch API data on the server.
- **Client components:** search, filtering, sorting, forms, confirmation, and delete actions use state and browser events.
- **Data fetching:** `services/employeeService.ts` is the single frontend API helper.
- **Loading and error states:** route-level `loading.tsx`, `error.tsx`, and `not-found.tsx` files provide user-facing states.
- **Environment variables:** `NEXT_PUBLIC_API_URL` configures the API base URL.

## Node.js / Express Concepts

Node.js runs the server-side JavaScript runtime and npm manages dependencies and scripts. Express provides routing and middleware. Controllers translate HTTP requests into service calls, while the service reads and writes `data/employees.json`. The model is a TypeScript interface.

The API also demonstrates JSON parsing, request logging, CORS, backend validation, centralized error responses, and a small bearer-token protected `/api/profile` route. This is a training example, not production authentication.

## Application

The application keeps the Day 5/6 employee-management idea: dashboard statistics, search, department filtering, sorting, employee details, create, edit, and delete.

## Routes

| Route | Purpose |
|---|---|
| `/` | Redirects to the employee dashboard |
| `/employees` | Lists employees with statistics and controls |
| `/employees/[id]` | Shows complete employee information |
| `/employees/create` | Creates an employee with a POST request |
| `/employees/[id]/edit` | Edits an employee with a PUT request |

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/employees` | Return all employees |
| GET | `/api/employees/:id` | Return one employee; `404` if missing |
| POST | `/api/employees` | Create an employee; validates all fields and returns `201` |
| PUT | `/api/employees/:id` | Replace an employee; `404` if missing |
| DELETE | `/api/employees/:id` | Delete an employee; `404` if missing |
| GET | `/api/profile` | Protected demo route; send `Authorization: Bearer <DEMO_TOKEN>` |

Successful responses use `{ success: true, data: ... }` where data applies. Errors use `{ success: false, message: "..." }`. Employee input requires name, email, department, position, location, a valid email, and a positive salary.

## Architecture

```text
Browser
  -> Next.js App Router
  -> employeeService
  -> Express REST API
  -> controller
  -> employee service
  -> data/employees.json
```

The backend is responsible for reading and writing the JSON file. No database is used in Day 7.

## Project Structure

```text
day-07/
├── README.md
├── nextjs-app/
│   ├── app/
│   │   ├── employees/
│   │   │   ├── [id]/
│   │   │   │   ├── edit/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── create/page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── services/employeeService.ts
│   ├── types/employee.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
└── node-api/
    ├── data/employees.json
    ├── src/
    │   ├── controllers/employeeController.ts
    │   ├── middleware/{auth,errorHandler,requestLogger}.ts
    │   ├── models/employee.ts
    │   ├── routes/employeeRoutes.ts
    │   ├── services/employeeService.ts
    │   ├── utils/{httpError,validation}.ts
    │   ├── app.ts
    │   └── server.ts
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── tsconfig.json
```

## Environment Variables

Copy `.env.example` to `.env` when local overrides are needed.

Frontend: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

Backend: `PORT=5000`, `CLIENT_ORIGIN=http://localhost:3000`, and `DEMO_TOKEN=day7-training-token`.

The `.env` and `.env.local` files are ignored by Git.

## Installation

```powershell
cd C:\Trainee-Week01\day-07\node-api
npm install

cd C:\Trainee-Week01\day-07\nextjs-app
npm install
```

## How to Run

Terminal 1:

```powershell
cd C:\Trainee-Week01\day-07\node-api
npm run dev
```

Terminal 2:

```powershell
cd C:\Trainee-Week01\day-07\nextjs-app
npm run dev
```

Open `http://localhost:3000`. The API health check is available at `http://localhost:5000/api/health`.

## API Testing

The endpoint test checklist for this assignment is: list, get one, get missing, valid POST, invalid POST, valid PUT, missing PUT, valid DELETE, and missing DELETE. Run these against the backend with a browser or PowerShell `Invoke-RestMethod` while the API is running. Results should be recorded here after running the commands locally.

## Challenges and Solutions

The API and frontend run on different ports, so CORS is configured for the local Next.js origin. The browser must not write the JSON file directly; the Express service performs all persistence.

## What I Learned

Today I learned how a Next.js frontend can communicate with a separate Express backend. I also understood why controllers and services are separated: the controller handles the HTTP request, while the service owns employee data operations.

## Future Improvements

- database integration on Day 8
- proper authentication and authorization
- pagination and stronger automated tests
- deployment configuration

## Verification

Build and endpoint results are recorded in the final task report after running them. Generated folders such as `node_modules`, `.next`, and `dist` are ignored.
