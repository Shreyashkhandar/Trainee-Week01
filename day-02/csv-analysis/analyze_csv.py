import csv


FILE_NAME = "employees.csv"


# Read CSV file
def read_csv():
    with open(FILE_NAME, "r", newline="") as file:
        return list(csv.DictReader(file))


# Count missing values
def missing_values(data):
    missing = {}

    for row in data:
        for column, value in row.items():
            if value == "":
                missing[column] = missing.get(column, 0) + 1

    return missing


# Find duplicate records
def find_duplicates(data):
    duplicates = []

    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            if data[i] == data[j]:
                duplicates.append(data[i])

    return duplicates


# Calculate salary statistics
def salary_statistics(data):
    salaries = []

    for row in data:
        if row["salary"] != "":
            salaries.append(float(row["salary"]))

    if not salaries:
        return

    average = sum(salaries) / len(salaries)

    print("\nSalary Statistics")
    print("-----------------")
    print("Average Salary:", average)
    print("Minimum Salary:", min(salaries))
    print("Maximum Salary:", max(salaries))


# Department-wise statistics
def department_statistics(data):
    departments = {}

    for row in data:
        department = row["department"]

        if department not in departments:
            departments[department] = 0

        departments[department] += 1

    print("\nDepartment-wise Statistics")
    print("--------------------------")

    for department, count in departments.items():
        print(department, ":", count)


# Main program
def main():
    try:
        data = read_csv()

        print("CSV Analysis")
        print("------------")

        # Record count
        print("Total Records:", len(data))

        # Missing values
        missing = missing_values(data)

        print("\nMissing Values")

        if missing:
            for column, count in missing.items():
                print(column, ":", count)
        else:
            print("No missing values.")

        # Duplicate records
        duplicates = find_duplicates(data)

        print("\nDuplicate Records:", len(duplicates))

        # Salary statistics
        salary_statistics(data)

        # Department statistics
        department_statistics(data)

    except FileNotFoundError:
        print("CSV file not found.")

    except Exception as error:
        print("Error:", error)


if __name__ == "__main__":
    main()