# Create a dictionary for an employee
employee = {
    "id": 101,
    "name": "Shreyash",
    "department": "IT",
    "salary": 30000
}

# Print the complete dictionary
print("Employee:", employee)

# Access individual values
print("Name:", employee["name"])
print("Department:", employee["department"])
print("Salary:", employee["salary"])

# Update salary
employee["salary"] = 35000

print("Updated Salary:", employee["salary"])

# Add a new value
employee["city"] = "Nagpur"

print("Updated Employee:", employee)
