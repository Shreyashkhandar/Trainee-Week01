import pandas as pd
import matplotlib.pyplot as plt

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

plt.figure(figsize=(10, 6))

plt.hist(
    data["cleanliness_score"],
    bins=10,
    edgecolor="black"
)

plt.title("Distribution of Cleanliness Scores")
plt.xlabel("Cleanliness Score")
plt.ylabel("Number of Facilities")

plt.tight_layout()

plt.savefig(
    "day-03/visualizations/03_cleanliness_score_histogram.png"
)

plt.show()