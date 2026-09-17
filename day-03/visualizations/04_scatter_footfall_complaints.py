import pandas as pd
import matplotlib.pyplot as plt

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

plt.figure(figsize=(10, 6))

plt.scatter(
    data["footfall"],
    data["complaints"]
)

plt.title("Footfall vs Complaints")
plt.xlabel("Footfall")
plt.ylabel("Number of Complaints")

plt.tight_layout()

plt.savefig(
    "day-03/visualizations/04_footfall_vs_complaints.png"
)

plt.show()