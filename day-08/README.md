# Day 8 - SQL and Laravel Employee Management API

## Objective

The goal of Day 8 was to build a simple employee management system using SQL and Laravel. The project connects a MariaDB database to a Laravel REST API, stores departments and employees in separate tables, and allows CRUD operations with validation, middleware protection, and database-backed queries.

## What I Learned

- how to design a relational database with departments and employees
- how to use SQL DDL, DML, filtering, grouping, join, update, delete, aggregate, and subquery statements
- how to generate a real Laravel project and configure it for MySQL
- how to create Eloquent models, migrations, seeders, controllers, routes, and middleware
- how to test a REST API and verify database results from the CLI

## 1. SQL

The SQL section covers:

- CREATE: create the `employee_management` database and tables
- INSERT: add departments and employees
- SELECT: fetch useful columns and rows
- WHERE: filter by conditions and comparisons
- ORDER BY: sort by salary and other fields
- GROUP BY: count and summarize employees by department
- HAVING: filter grouped results
- JOIN: use inner and left joins for department relationships
- UPDATE: modify employee data
- DELETE: remove temporary or invalid records
- aggregate functions: COUNT, AVG, MIN, MAX, SUM
- subqueries: compare salary values against group-level averages

## 2. Database Design

The system uses two related tables:

```text
departments
    id
    name
    created_at
    updated_at

employees
    id
    name
    email
    department_id
    position
    salary
    location
    created_at
    updated_at
```

The relationship is one-to-many:

```text
departments 1 --- * employees
```

The `employees.department_id` column references `departments.id` to keep the employee-to-department relationship consistent.

## 3. Laravel

The final application is a real Laravel project located at `day-08/laravel-api`.

It includes:

- Laravel project structure (`app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `storage/`)
- routes for the API in `routes/api.php`
- `EmployeeController` for CRUD logic
- `Employee` and `Department` models with Eloquent relationships
- migrations to create the database schema
- seeders to insert sample data
- middleware to protect write actions with an API key
- validation using Laravel request rules

## 4. Employee API

The API endpoints implemented are:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/employees` | List employees and optionally filter by `department` or `search` |
| GET | `/api/employees/{employee}` | Get one employee with department details |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/{employee}` | Update an employee |
| DELETE | `/api/employees/{employee}` | Delete an employee |

## 5. Validation

The API validates:

- `name` is required and must be a string
- `email` is required, valid, and unique
- `department_id` is required and must exist in `departments`
- `position` is required and must be a string
- `salary` is required, numeric, and non-negative
- `location` is required and must be a string

Validation errors return HTTP 422 with JSON error details.

## 6. Authentication / API Key

The API uses a simple demo key middleware.

Expected header:

```text
X-API-Key: day8-demo-key
```

This key is enforced for POST, PUT, and DELETE requests. GET requests remain public.

## 7. Database Configuration

The Laravel app is configured to use XAMPP MariaDB:

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_management
DB_USERNAME=root
DB_PASSWORD=
```

The XAMPP MySQL client and server were verified from `C:\xampp\mysql\bin\mysql.exe` and the `employee_management` database was created successfully.

## 8. How to Run

From the project folder:

```powershell
cd C:\Trainee-Week01\day-08\laravel-api
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Then open:

```text
http://127.0.0.1:8000/api/employees
```

## 9. Testing

I verified the application with:

```powershell
cd C:\Trainee-Week01\day-08\laravel-api
php artisan test
```

Actual result:

```text
Tests:    12 passed (24 assertions)
```

## 10. Problems Faced

- Composer was not available in PATH, so Laravel could not be created immediately.
- The fix was to install Composer using the XAMPP PHP runtime and generate the project from there.
- The database did not exist yet, so I created `employee_management` in MariaDB.
- Laravel initially failed during the first test because the creation test used a hardcoded department ID instead of creating a real department record. The fix was to create the department before posting the employee.
- The `php artisan serve` manual endpoint checks required the app to be started and the database to be seeded before testing live requests.

## 11. Final Status

Completed and verified.

The project was built and checked using the actual environment tools. Laravel was created in `day-08/laravel-api`, the database was created in MariaDB, the migrations and seeders ran successfully, the API passed the feature tests, and the live endpoints were exercised.
