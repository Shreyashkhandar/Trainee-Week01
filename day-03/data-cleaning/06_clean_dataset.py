import pandas as pd

file_path = "day-03/dataset/facility_hygiene_ml_dataset.xlsx"

data = pd.read_excel(file_path)

print("Original dataset:", data.shape)

# Remove duplicate rows
data = data.drop_duplicates()

# Remove rows with missing values
data = data.dropna()

# Remove invalid score values
data = data[
    (data["cleanliness_score"] >= 0) &
    (data["cleanliness_score"] <= 10) &
    (data["odor_score"] >= 0) &
    (data["odor_score"] <= 10)
]

# Remove negative values from numerical columns
numeric_columns = [
    "waste_level",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

for column in numeric_columns:
    data = data[data[column] >= 0]

print("Cleaned dataset:", data.shape)

# Save cleaned dataset
output_file = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data.to_excel(output_file, index=False)

print("\nCleaned dataset saved to:")
print(output_file)