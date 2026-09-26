USE employee_management;

-- Aggregate values for the whole employees table.
SELECT COUNT(*) AS total_employees,
       ROUND(AVG(salary), 2) AS average_salary,
       MIN(salary) AS minimum_salary,
       MAX(salary) AS maximum_salary,
       SUM(salary) AS total_salary
FROM employees;

-- Aggregate by department.
SELECT d.name AS department,
       COUNT(e.id) AS employee_count,
       ROUND(AVG(e.salary), 2) AS average_salary,
       MIN(e.salary) AS minimum_salary,
       MAX(e.salary) AS maximum_salary,
       SUM(e.salary) AS total_salary
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY total_salary DESC;

-- Subquery: employees whose salary is above the department average.
SELECT e.name, e.position, e.salary, d.name AS department
FROM employees e
INNER JOIN departments d ON d.id = e.department_id
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department_id = e.department_id
);

-- Subquery: departments with more than one employee.
SELECT d.name AS department
FROM departments d
WHERE (
    SELECT COUNT(*)
    FROM employees e
    WHERE e.department_id = d.id
) > 1;
