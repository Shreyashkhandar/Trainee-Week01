import pandas as pd

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

print("Analysis by Facility Type")
print("-------------------------")

# Average scores by facility type
facility_analysis = data.groupby("facility_type").agg(
    average_cleanliness=("cleanliness_score", "mean"),
    average_odor=("odor_score", "mean"),
    average_waste=("waste_level", "mean"),
    average_footfall=("footfall", "mean"),
    average_complaints=("complaints", "mean"),
    average_hours_since_cleaning=("hours_since_cleaning", "mean")
)

print("\nAverage values by facility type:")
print(facility_analysis.round(2))

# Number of facilities by type
print("\nNumber of facilities by type:")
print(data["facility_type"].value_counts())

# Average cleanliness by location
print("\nAverage cleanliness by location:")
location_cleanliness = data.groupby("location")["cleanliness_score"].mean()

print(location_cleanliness.round(2))

# Average complaints by location
print("\nAverage complaints by location:")
location_complaints = data.groupby("location")["complaints"].mean()

print(location_complaints.round(2))
