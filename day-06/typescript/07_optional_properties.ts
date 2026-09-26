interface Employee {
  id: number;
  name: string;
  email?: string;
}

const employee1: Employee = {
  id: 1,
  name: "Rahul",
};

const employee2: Employee = {
  id: 2,
  name: "Priya",
  email: "priya@example.com",
};

console.log("Employee 1:", employee1);
console.log("Employee 2:", employee2);
