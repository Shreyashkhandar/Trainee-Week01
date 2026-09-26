USE employee_management;

-- INNER JOIN: employees that have a matching department.
SELECT e.name, e.position, d.name AS department
FROM employees AS e
INNER JOIN departments AS d ON d.id = e.department_id;

-- LEFT JOIN: include departments even if they have no employees.
SELECT d.name AS department, e.name AS employee
FROM departments AS d
LEFT JOIN employees AS e ON e.department_id = d.id
ORDER BY d.name, e.name;

-- Aggregate employees using the department relationship.
SELECT d.name AS department, COUNT(e.id) AS employee_count, AVG(e.salary) AS average_salary
FROM departments AS d
LEFT JOIN employees AS e ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;
