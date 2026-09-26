class Employee {
  name: string;
  department: string;

  constructor(name: string, department: string) {
    this.name = name;
    this.department = department;
  }

  getDetails(): string {
    return `${this.name} works in ${this.department}`;
  }
}

const employee = new Employee("Amit", "IT");
console.log(employee.getDetails());
