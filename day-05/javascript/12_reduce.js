const employees = [
  { id: 1, name: "Rahul", department: "IT", salary: 40000 },
  { id: 2, name: "Priya", department: "HR", salary: 50000 },
  { id: 3, name: "John", department: "IT", salary: 60000 },
];

const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
console.log("Total salary:", totalSalary);

const averageSalary = totalSalary / employees.length;
console.log("Average salary:", averageSalary);
