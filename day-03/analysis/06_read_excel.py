import pandas as pd

# Excel file location
file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"

# Read the Excel file
data = pd.read_excel(file_path)

# Display the first 5 rows
print("First 5 rows:")
print(data.head())

# Display column names
print("\nColumns:")
print(data.columns.tolist())

# Display dataset shape
print("\nDataset Shape:")
print(data.shape)