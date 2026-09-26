const employees = [
  { id: 1, name: "Rahul", department: "IT", salary: 40000 },
  { id: 2, name: "Priya", department: "HR", salary: 50000 },
  { id: 3, name: "John", department: "IT", salary: 60000 },
];

const hasHighSalary = employees.some((employee) => employee.salary > 55000);
console.log("Has any employee with salary above 55000?", hasHighSalary);

const allHaveSalaryAbove30000 = employees.every((employee) => employee.salary > 30000);
console.log("Are all employees earning above 30000?", allHaveSalaryAbove30000);
