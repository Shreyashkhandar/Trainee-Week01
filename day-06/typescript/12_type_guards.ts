type Employee = {
  id: number;
  name: string;
};

function isEmployee(value: unknown): value is Employee {
  return typeof value === "object" && value !== null && "id" in value && "name" in value;
}

const data: unknown = { id: 5, name: "Riya" };

if (isEmployee(data)) {
  console.log("Employee found:", data.name);
} else {
  console.log("Not an employee object.");
}
