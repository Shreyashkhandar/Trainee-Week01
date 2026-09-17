import pandas as pd

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

print("Dataset Statistics")
print("------------------")

numeric_columns = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

print("\nDescriptive Statistics:")
print(data[numeric_columns].describe())

print("\nAverage Values:")
for column in numeric_columns:
    print(f"{column}: {data[column].mean():.2f}")

print("\nFacility Type Counts:")
print(data["facility_type"].value_counts())

print("\nLocation Counts:")
print(data["location"].value_counts())

print("\nHygiene Risk Distribution:")
print(data["hygiene_risk"].value_counts())
