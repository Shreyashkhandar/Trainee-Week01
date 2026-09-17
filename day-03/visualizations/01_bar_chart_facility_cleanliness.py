import pandas as pd
import matplotlib.pyplot as plt

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Calculate average cleanliness by facility type
cleanliness = data.groupby("facility_type")["cleanliness_score"].mean()

# Create bar chart
plt.figure(figsize=(10, 6))

cleanliness.plot(kind="bar")

plt.title("Average Cleanliness Score by Facility Type")
plt.xlabel("Facility Type")
plt.ylabel("Average Cleanliness Score")
plt.xticks(rotation=45)
plt.tight_layout()

# Save chart
plt.savefig(
    "day-03/visualizations/01_average_cleanliness_by_facility.png"
)

plt.show()