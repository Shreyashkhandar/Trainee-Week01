# Create a class
class Employee:

    # Constructor
    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    # Function to display employee details
    def display(self):
        print("Name:", self.name)
        print("Department:", self.department)
        print("Salary:", self.salary)


# Create an employee object
employee1 = Employee("Shreyash", "IT", 30000)

# Display employee details
employee1.display()