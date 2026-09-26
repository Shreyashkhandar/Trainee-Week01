# Day 6 - TypeScript and React

## Overview

For Day 6, I learned the basic ideas behind TypeScript and then used those ideas to build a React + TypeScript version of the Employee Dashboard from Day 5. This helped me understand how type safety makes JavaScript easier to manage in bigger projects.

## TypeScript

I practiced these TypeScript ideas:

- primitive types
- arrays
- objects
- interfaces
- type aliases
- union types
- enums
- optional properties
- functions
- classes
- generics
- type narrowing
- type guards

These examples were kept simple so the purpose of each feature was easy to understand.

## React

I also used React with TypeScript to build the employee dashboard. The app uses:

- components
- JSX
- props
- state
- events
- forms
- lists
- conditional rendering
- useState
- useEffect
- component composition
- API/data loading

The dashboard is a real example of how these ideas work together.

## Practical Assignment

I converted the Day 5 JavaScript Employee Dashboard into a React + TypeScript Employee Management Dashboard. The app loads employee data, lets the user search, filter, sort, view details, add, edit, delete employees, and updates the summary statistics automatically.

## Features

- employee listing
- search
- filter
- sort
- details
- add
- edit
- delete
- statistics
- validation

## Technologies Used

- TypeScript
- React
- Vite
- HTML/CSS
- Fetch API
- localStorage

## Project Structure

```text
day-06/
├── README.md
├── typescript/
│   ├── 01_primitive_types.ts
│   ├── 02_arrays_objects.ts
│   ├── 03_interfaces.ts
│   ├── 04_type_aliases.ts
│   ├── 05_union_types.ts
│   ├── 06_enums.ts
│   ├── 07_optional_properties.ts
│   ├── 08_functions.ts
│   ├── 09_classes.ts
│   ├── 10_generics.ts
│   ├── 11_type_narrowing.ts
│   └── 12_type_guards.ts
├── react-app/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── public/
│   │   └── employees.json
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── styles.css
│       ├── types/
│       │   └── Employee.ts
│       ├── data/
│       │   └── employeeData.ts
│       ├── hooks/
│       │   └── useEmployeeData.ts
│       ├── components/
│       │   ├── DashboardStats.tsx
│       │   ├── EmployeeTable.tsx
│       │   ├── EmployeeForm.tsx
│       │   ├── EmployeeDetails.tsx
│       │   └── SearchBar.tsx
│       └── pages/
│           └── EmployeeDashboard.tsx
└── README.md
```

## How to Run

For the TypeScript exercises, use a TypeScript runner such as `ts-node` if it is available, or compile the files with `tsc`.

For the React app:

```bash
cd day-06/react-app
npm install
npm run dev
```

## What I Learned

Today I learned how TypeScript adds type safety to JavaScript and how React breaks an application into reusable components. I also learned that state, props, and events help connect the UI to real data in a clean way.

## Challenges Faced

- I had to make sure the React app was created in a new folder without touching the earlier days.
- I needed to keep the files simple and readable instead of overcomplicating them.

## Future Improvements

- connect to a real backend API
- database persistence
- authentication
- pagination
