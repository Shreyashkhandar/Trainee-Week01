import pandas as pd

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

print("Dataset Shape:")
print(data.shape)

print("\nColumns:")
print(data.columns.tolist())

print("\nTarget Variable:")
print(data["hygiene_risk"].value_counts())

print("\nFirst 5 Rows:")
print(data.head())