import pandas as pd

file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"

data = pd.read_excel(file_path)

print("Invalid Values Check")
print("--------------------")

# Check score ranges
print("\nCleanliness scores outside 0-10:")
print(data[(data["cleanliness_score"] < 0) | (data["cleanliness_score"] > 10)])

print("\nOdor scores outside 0-10:")
print(data[(data["odor_score"] < 0) | (data["odor_score"] > 10)])

# Check negative values
numeric_columns = [
    "waste_level",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

for column in numeric_columns:
    invalid = data[data[column] < 0]

    print(f"\nNegative values in {column}: {len(invalid)}")