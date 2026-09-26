const employees = [
  { id: 1, name: "Rahul", department: "IT", salary: 40000 },
  { id: 2, name: "Priya", department: "HR", salary: 50000 },
  { id: 3, name: "John", department: "IT", salary: 60000 },
  { id: 4, name: "Asha", department: "Marketing", salary: 35000 },
];

const itEmployees = employees.filter((employee) => employee.department === "IT");
console.log("IT employees:", itEmployees);
