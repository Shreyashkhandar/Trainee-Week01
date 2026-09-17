import pandas as pd

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

print("KEY INSIGHTS")
print("============")

# Insight 1: Facility type with highest complaints
complaints_by_type = data.groupby("facility_type")["complaints"].mean()
highest_complaints = complaints_by_type.idxmax()
highest_complaints_value = complaints_by_type.max()

print("\nInsight 1:")
print(
    f"{highest_complaints} has the highest average number "
    f"of complaints: {highest_complaints_value:.2f}"
)

# Insight 2: Location with lowest cleanliness
cleanliness_by_location = data.groupby("location")["cleanliness_score"].mean()
lowest_cleanliness = cleanliness_by_location.idxmin()
lowest_cleanliness_value = cleanliness_by_location.min()

print("\nInsight 2:")
print(
    f"{lowest_cleanliness} has the lowest average cleanliness "
    f"score: {lowest_cleanliness_value:.2f}"
)

# Insight 3: Location with highest complaints
complaints_by_location = data.groupby("location")["complaints"].mean()
highest_complaint_location = complaints_by_location.idxmax()
highest_complaint_location_value = complaints_by_location.max()

print("\nInsight 3:")
print(
    f"{highest_complaint_location} has the highest average "
    f"complaints: {highest_complaint_location_value:.2f}"
)