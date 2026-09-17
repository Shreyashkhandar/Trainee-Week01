import pandas as pd

file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"

data = pd.read_excel(file_path)

# Find duplicate rows
duplicates = data[data.duplicated()]

print("Number of duplicate records:", len(duplicates))

print("\nDuplicate records:")
print(duplicates)

# Remove duplicates
cleaned_data = data.drop_duplicates()

print("\nRows before removing duplicates:", len(data))
print("Rows after removing duplicates:", len(cleaned_data))