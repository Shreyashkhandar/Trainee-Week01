import pandas as pd

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Facilities with low cleanliness
low_cleanliness = data[data["cleanliness_score"] < 5]

print("Facilities with cleanliness score below 5:")
print(low_cleanliness[
    ["facility_id", "location", "facility_type", "cleanliness_score"]
])

# Facilities with high complaints
high_complaints = data[data["complaints"] > 5]

print("\nFacilities with more than 5 complaints:")
print(high_complaints[
    ["facility_id", "location", "complaints"]
])

# Facilities with high footfall
high_footfall = data[data["footfall"] > 500]

print("\nFacilities with footfall above 500:")
print(high_footfall[
    ["facility_id", "location", "footfall"]
])

# High hygiene risk
high_risk = data[
    data["hygiene_risk"].isin(["High", "Critical"])
]

print("\nHigh/Critical hygiene risk facilities:")
print(high_risk[
    ["facility_id", "location", "hygiene_risk"]
])