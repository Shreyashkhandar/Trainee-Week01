const employee = {
  name: "Priya",
  department: "HR",
  salary: 45000,
};

console.log("Employee name:", employee.name);
console.log("Department:", employee["department"]);

employee.salary = 50000;
employee.location = "Chennai";

console.log("Updated employee:", employee);
