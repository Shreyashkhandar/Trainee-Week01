import pandas as pd

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Features used for prediction
feature_columns = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

X = data[feature_columns]
y = data["hygiene_risk"]

print("Selected Features:")
print(X.columns.tolist())

print("\nFeature Data:")
print(X.head())

print("\nTarget:")
print(y.head())

print("\nFeature Shape:")
print(X.shape)

print("\nTarget Shape:")
print(y.shape)