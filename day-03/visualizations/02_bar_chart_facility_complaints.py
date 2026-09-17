import pandas as pd
import matplotlib.pyplot as plt

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Calculate average complaints by facility type
complaints = data.groupby("facility_type")["complaints"].mean()

# Create bar chart
plt.figure(figsize=(10, 6))

complaints.plot(kind="bar")

plt.title("Average Complaints by Facility Type")
plt.xlabel("Facility Type")
plt.ylabel("Average Complaints")
plt.xticks(rotation=45)
plt.tight_layout()

# Save chart
plt.savefig(
    "day-03/visualizations/02_average_complaints_by_facility.png"
)

plt.show()