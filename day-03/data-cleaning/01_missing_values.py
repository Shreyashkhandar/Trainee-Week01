import pandas as pd

# Read the dataset
file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"
data = pd.read_excel(file_path)

# Check missing values
missing_values = data.isnull().sum()

print("Missing Values")
print("--------------")
print(missing_values)