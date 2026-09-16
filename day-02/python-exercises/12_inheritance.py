# Parent class
class Employee:

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display(self):
        print("Name:", self.name)
        print("Salary:", self.salary)


# Child class
class Manager(Employee):

    def display_department(self):
        print("Department: Management")


# Create an object of Manager
manager = Manager("Shreyash", 40000)

# Use the parent class method
manager.display()

# Use the child class method
manager.display_department()