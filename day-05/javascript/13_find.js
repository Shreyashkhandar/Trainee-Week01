const employees = [
  { id: 1, name: "Rahul", department: "IT", salary: 40000 },
  { id: 2, name: "Priya", department: "HR", salary: 50000 },
  { id: 3, name: "John", department: "IT", salary: 60000 },
];

const employee = employees.find((person) => person.name === "Priya");
console.log("Found employee:", employee);
