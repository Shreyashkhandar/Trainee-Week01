# Day 5 - JavaScript

## Overview

Day 5 focused on modern JavaScript, asynchronous programming, and APIs. I practiced core JavaScript concepts, worked with array methods, learned about closures and the event loop, and built a simple employee dashboard that loads JSON and supports CRUD-style operations in the browser.

## What I Learned

- variables
- functions
- arrays
- objects
- array methods
- scope
- closures
- callbacks
- promises
- async/await
- modules
- error handling
- JSON
- Fetch API
- REST concepts

## Practical Assignment

I built an Employee Dashboard using plain HTML, CSS, and JavaScript. It loads employee data from a local JSON file, lets the user search and filter employees, sort by name or salary, view employee details, add a new employee, edit an existing employee, and delete an employee.

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

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- JSON
- localStorage

## Project Structure

```text
day-05/
├── README.md
├── javascript/
│   ├── package.json
│   ├── 01_variables.js
│   ├── 02_data_types.js
│   ├── 03_functions.js
│   ├── 04_arrow_functions.js
│   ├── 05_arrays.js
│   ├── 06_objects.js
│   ├── 07_destructuring.js
│   ├── 08_spread_rest.js
│   ├── 09_template_literals.js
│   ├── 10_map.js
│   ├── 11_filter.js
│   ├── 12_reduce.js
│   ├── 13_find.js
│   ├── 14_some_every.js
│   ├── 15_sort.js
│   ├── 16_scope.js
│   ├── 17_closures.js
│   ├── 18_hoisting.js
│   ├── 19_callbacks.js
│   ├── 20_promises.js
│   ├── 21_async_await.js
│   ├── 22_event_loop.js
│   ├── 23_modules/
│   │   ├── 23_modules.js
│   │   └── math.js
│   ├── 24_error_handling.js
│   ├── 25_json.js
│   ├── 26_fetch_get.js
│   ├── 27_fetch_post.js
│   ├── 28_fetch_put.js
│   └── 29_fetch_delete.js
├── employee-dashboard/
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   └── data/
│       └── employees.json
└── README.md
```

> A small `package.json` was added inside the JavaScript folder so Node can run ES modules correctly.

## How to Run JavaScript Exercises

Open a terminal in the project root and run files like this:

```bash
node day-05/javascript/01_variables.js
node day-05/javascript/10_map.js
node day-05/javascript/23_modules/23_modules.js
```

## How to Run Employee Dashboard

Because `fetch()` does not work reliably when opening the HTML file directly from the file system, I used a local HTTP server.

From the project root, run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/day-05/employee-dashboard/
```

The dashboard loads employees from `employees.json` and saves updates to browser `localStorage` so changes stay after refresh. The original JSON file is not modified in the browser.

## Challenges Faced

- Some browser-only JavaScript features, such as `fetch()`, do not work properly from a local file path.
- The dashboard needed to clearly separate local JSON loading from actual API examples.
- Search, filter, sort, and edit actions had to stay in sync with the employee data.

## Solutions

- I used a local Python HTTP server to test the dashboard correctly.
- I kept the dashboard logic in small reusable functions and updated the DOM in one render flow.
- I used `localStorage` to keep the user changes after refresh without modifying the source JSON file.

## Future Improvements

- backend REST API
- database persistence
- authentication
- pagination
- better validation
