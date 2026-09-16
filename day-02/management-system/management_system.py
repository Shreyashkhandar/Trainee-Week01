import json

FILE_NAME = "employees.json"


# Load employees from JSON file
def load_employees():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        print("Error reading employee data.")
        return []


# Save employees to JSON file
def save_employees(employees):
    with open(FILE_NAME, "w") as file:
        json.dump(employees, file, indent=4)


# Add employee
def add_employee(employees):
    try:
        employee_id = int(input("Enter employee ID: "))

        for employee in employees:
            if employee["id"] == employee_id:
                print("Employee ID already exists.")
                return

        name = input("Enter employee name: ")
        department = input("Enter department: ")
        salary = float(input("Enter salary: "))

        employee = {
            "id": employee_id,
            "name": name,
            "department": department,
            "salary": salary
        }

        employees.append(employee)
        save_employees(employees)

        print("Employee added successfully.")

    except ValueError:
        print("Please enter valid ID and salary.")


# Update employee
def update_employee(employees):
    try:
        employee_id = int(input("Enter employee ID to update: "))

        for employee in employees:
            if employee["id"] == employee_id:
                employee["name"] = input("Enter new name: ")
                employee["department"] = input("Enter new department: ")
                employee["salary"] = float(input("Enter new salary: "))

                save_employees(employees)
                print("Employee updated successfully.")
                return

        print("Employee not found.")

    except ValueError:
        print("Please enter valid numbers.")


# Delete employee
def delete_employee(employees):
    try:
        employee_id = int(input("Enter employee ID to delete: "))

        for employee in employees:
            if employee["id"] == employee_id:
                employees.remove(employee)
                save_employees(employees)
                print("Employee deleted successfully.")
                return

        print("Employee not found.")

    except ValueError:
        print("Please enter a valid ID.")


# Search employee
def search_employee(employees):
    search_text = input("Enter employee name or department: ").lower()

    found = False

    for employee in employees:
        if (search_text in employee["name"].lower()
                or search_text in employee["department"].lower()):

            print(
                "ID:", employee["id"],
                "| Name:", employee["name"],
                "| Department:", employee["department"],
                "| Salary:", employee["salary"]
            )

            found = True

    if not found:
        print("No employee found.")


# Filter employees
def filter_employees(employees):
    department = input("Enter department: ").lower()

    found = False

    for employee in employees:
        if employee["department"].lower() == department:
            print(
                "ID:", employee["id"],
                "| Name:", employee["name"],
                "| Department:", employee["department"],
                "| Salary:", employee["salary"]
            )

            found = True

    if not found:
        print("No employees found in this department.")


# Sort employees
def sort_employees(employees):
    print("\nSort By")
    print("1. Name")
    print("2. Salary")

    choice = input("Enter choice: ")

    if choice == "1":
        sorted_employees = sorted(employees, key=lambda x: x["name"].lower())

    elif choice == "2":
        sorted_employees = sorted(employees, key=lambda x: x["salary"])

    else:
        print("Invalid choice.")
        return

    for employee in sorted_employees:
        print(
            "ID:", employee["id"],
            "| Name:", employee["name"],
            "| Department:", employee["department"],
            "| Salary:", employee["salary"]
        )


# Display statistics
def statistics(employees):
    if not employees:
        print("No employee data available.")
        return

    total_employees = len(employees)

    total_salary = sum(employee["salary"] for employee in employees)

    average_salary = total_salary / total_employees

    highest_salary = max(employee["salary"] for employee in employees)

    lowest_salary = min(employee["salary"] for employee in employees)

    departments = {}

    for employee in employees:
        department = employee["department"]

        if department in departments:
            departments[department] += 1
        else:
            departments[department] = 1

    print("\nEmployee Statistics")
    print("-------------------")
    print("Total Employees:", total_employees)
    print("Average Salary:", average_salary)
    print("Highest Salary:", highest_salary)
    print("Lowest Salary:", lowest_salary)

    print("\nEmployees by Department:")

    for department, count in departments.items():
        print(department, ":", count)


# List all employees
def list_employees(employees):
    if not employees:
        print("No employees available.")
        return

    print("\nEmployee List")
    print("-------------")

    for employee in employees:
        print(
            "ID:", employee["id"],
            "| Name:", employee["name"],
            "| Department:", employee["department"],
            "| Salary:", employee["salary"]
        )


# Main program
def main():
    employees = load_employees()

    while True:
        print("\n==============================")
        print("   Employee Management System")
        print("==============================")
        print("1. Add Employee")
        print("2. Update Employee")
        print("3. Delete Employee")
        print("4. Search Employee")
        print("5. Filter Employees")
        print("6. Sort Employees")
        print("7. Statistics")
        print("8. List Employees")
        print("9. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            add_employee(employees)

        elif choice == "2":
            update_employee(employees)

        elif choice == "3":
            delete_employee(employees)

        elif choice == "4":
            search_employee(employees)

        elif choice == "5":
            filter_employees(employees)

        elif choice == "6":
            sort_employees(employees)

        elif choice == "7":
            statistics(employees)

        elif choice == "8":
            list_employees(employees)

        elif choice == "9":
            print("Exiting program.")
            break

        else:
            print("Invalid choice. Please try again.")


# Start the program
if __name__ == "__main__":
    main()