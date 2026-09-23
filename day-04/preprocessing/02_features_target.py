import pandas as pd

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Separate features and target
X = data.drop("hygiene_risk", axis=1)
y = data["hygiene_risk"]

print("Features (X):")
print(X.columns.tolist())

print("\nTarget (y):")
print(y.name)

print("\nFeature Shape:")
print(X.shape)

print("\nTarget Shape:")
print(y.shape)

print("\nTarget Values:")
print(y.value_counts())