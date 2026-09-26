USE employee_management;

-- Highest salaries first.
SELECT name, salary
FROM employees
ORDER BY salary DESC;

-- Count employees and calculate average salary by department.
SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS average_salary
FROM employees
GROUP BY department_id;

-- Departments with at least two employees.
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) >= 2;

-- Employees earning more than the company average.
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
