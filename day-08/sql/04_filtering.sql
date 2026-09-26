USE employee_management;

-- Employees earning more than 60000.
SELECT name, position, salary
FROM employees
WHERE salary > 60000;

-- Employees located in Bengaluru.
SELECT name, email, location
FROM employees
WHERE location = 'Bengaluru';

-- Search by part of a name or email.
SELECT name, email
FROM employees
WHERE name LIKE '%a%' OR email LIKE '%example.test%';
