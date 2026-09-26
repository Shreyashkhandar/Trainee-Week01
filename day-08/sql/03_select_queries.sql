USE employee_management;

-- Select all employees.
SELECT * FROM employees;

-- Select only useful columns.
SELECT id, name, email, position, salary FROM employees;

-- Select the department names available in the database.
SELECT id, name FROM departments;
