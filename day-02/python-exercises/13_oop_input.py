# Create an Employee class
class Employee:

    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    def display(self):
        print("\nEmployee Details")
        print("Name:", self.name)
        print("Department:", self.department)
        print("Salary:", self.salary)


# Take employee details from the user
name = input("Enter employee name: ")
department = input("Enter department: ")
salary = float(input("Enter salary: "))

# Create an employee object
employee = Employee(name, department, salary)

# Display employee details
employee.display()