const firstNames = ["Amit", "Neha"];
const lastNames = ["Sharma", "Patel"];

const allNames = [...firstNames, ...lastNames];
console.log("Combined names:", allNames);

const employeeProfile = {
  name: "Riya",
  role: "Developer",
};

const employeeDetails = {
  ...employeeProfile,
  department: "IT",
  salary: 60000,
};

console.log("Employee details:", employeeDetails);

function printValues(...values) {
  console.log("Rest parameters:", values);
}

printValues("one", "two", "three");
