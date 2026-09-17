import pandas as pd

file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"

data = pd.read_excel(file_path)

print("Missing values before cleaning:")
print(data.isnull().sum())

# Remove rows that contain missing values
cleaned_data = data.dropna()

print("\nMissing values after cleaning:")
print(cleaned_data.isnull().sum())

print("\nOriginal rows:", len(data))
print("Rows after cleaning:", len(cleaned_data))
