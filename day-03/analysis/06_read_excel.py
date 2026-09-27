import pandas as pd

file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"

data = pd.read_excel(file_path)

print("Dataset Information")
print("-------------------")

print("\nShape:")
print(data.shape)

print("\nColumns:")
print(data.columns.tolist())

print("\nData Types:")
print(data.dtypes)

print("\nFirst 5 Rows:")
print(data.head())

print("\nLast 5 Rows:")
print(data.tail())

print("\nBasic Statistics:")
print(data.describe())