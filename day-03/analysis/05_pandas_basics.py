import pandas as pd

# Create a Pandas Series
numbers = pd.Series([10, 20, 30, 40, 50])

print("Series:")
print(numbers)

# Create a DataFrame
data = {
    "Name": ["Rahul", "Priya", "Amit"],
    "Department": ["IT", "HR", "IT"],
    "Salary": [40000, 30000, 35000]
}

employees = pd.DataFrame(data)

print("\nDataFrame:")
print(employees)