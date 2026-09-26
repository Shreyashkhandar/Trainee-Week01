const employees = [
  { id: 1, name: "Rahul", department: "IT", salary: 40000 },
  { id: 2, name: "Priya", department: "HR", salary: 50000 },
  { id: 3, name: "John", department: "IT", salary: 60000 },
];

const salaryWithBonus = employees.map((employee) => ({
  ...employee,
  salary: employee.salary + 5000,
}));

console.log("Updated salaries:", salaryWithBonus);
