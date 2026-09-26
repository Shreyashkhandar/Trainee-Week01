USE employee_management;

-- Update one employee's salary. Always use a specific WHERE clause.
UPDATE employees
SET salary = 67000.00
WHERE email = 'aarav.mehta@example.test';

-- Verify the update.
SELECT name, salary
FROM employees
WHERE email = 'aarav.mehta@example.test';

-- Delete a learning-only record by its unique email.
INSERT INTO employees (name, email, department_id, position, salary, location)
VALUES ('Temporary Record', 'temporary.record@example.test', 2, 'Intern', 30000.00, 'Pune');

DELETE FROM employees
WHERE email = 'temporary.record@example.test';

-- Verify that the temporary record was deleted.
SELECT *
FROM employees
WHERE email = 'temporary.record@example.test';
