USE employee_management;

INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('HR'),
    ('Finance'),
    ('Marketing'),
    ('Sales');

INSERT INTO employees (name, email, department_id, position, salary, location) VALUES
    ('Aarav Mehta', 'aarav.mehta@example.test', 1, 'Frontend Developer', 65000.00, 'Bengaluru'),
    ('Diya Nair', 'diya.nair@example.test', 1, 'Backend Developer', 72000.00, 'Hyderabad'),
    ('Kabir Shah', 'kabir.shah@example.test', 2, 'HR Executive', 52000.00, 'Pune'),
    ('Ishita Rao', 'ishita.rao@example.test', 3, 'Financial Analyst', 68000.00, 'Delhi'),
    ('Rohan Das', 'rohan.das@example.test', 3, 'Accountant', 59000.00, 'Kolkata'),
    ('Meera Iyer', 'meera.iyer@example.test', 4, 'Marketing Specialist', 61000.00, 'Mumbai'),
    ('Vivek Joshi', 'vivek.joshi@example.test', 5, 'Sales Executive', 56000.00, 'Chennai'),
    ('Anika Sen', 'anika.sen@example.test', 1, 'QA Engineer', 60000.00, 'Kochi'),
    ('Neel Kapoor', 'neel.kapoor@example.test', 5, 'Sales Manager', 78000.00, 'Jaipur'),
    ('Tara Menon', 'tara.menon@example.test', 4, 'Content Strategist', 57000.00, 'Bengaluru');
