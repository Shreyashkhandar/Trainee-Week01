type Department = "IT" | "HR" | "Finance";

type Employee = {
  id: number;
  name: string;
  department: Department;
};

const employee: Employee = {
  id: 2,
  name: "Nisha",
  department: "IT",
};

console.log("Employee:", employee);
