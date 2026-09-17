import pandas as pd

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Convert inspection date to datetime
data["inspection_date"] = pd.to_datetime(data["inspection_date"])

# Create cleanliness category
data["cleanliness_category"] = pd.cut(
    data["cleanliness_score"],
    bins=[0, 4, 7, 10],
    labels=["Poor", "Average", "Good"],
    include_lowest=True
)

# Create complaint category
data["complaint_level"] = pd.cut(
    data["complaints"],
    bins=[-1, 3, 6, float("inf")],
    labels=["Low", "Medium", "High"]
)

print("Data Transformation")
print("-------------------")

print("\nFirst 10 transformed records:")
print(data[
    [
        "facility_id",
        "cleanliness_score",
        "cleanliness_category",
        "complaints",
        "complaint_level"
    ]
].head(10))

print("\nCleanliness Category:")
print(data["cleanliness_category"].value_counts())

print("\nComplaint Level:")
print(data["complaint_level"].value_counts())