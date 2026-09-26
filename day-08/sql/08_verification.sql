USE employee_management;

SHOW TABLES;
SELECT COUNT(*) AS department_count FROM departments;
SELECT COUNT(*) AS employee_count FROM employees;

-- Confirm the foreign-key relationship and sample records.
SELECT e.id, e.name, d.name AS department, e.position, e.salary
FROM employees AS e
JOIN departments AS d ON d.id = e.department_id
ORDER BY e.id;
