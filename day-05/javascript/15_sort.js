const employees = [
  { id: 1, name: "Rahul", salary: 40000 },
  { id: 2, name: "Priya", salary: 70000 },
  { id: 3, name: "John", salary: 55000 },
];

const sortedBySalary = [...employees].sort((a, b) => a.salary - b.salary);
console.log("Sorted by salary ascending:", sortedBySalary);

const sortedByName = [...employees].sort((a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:", sortedByName);
