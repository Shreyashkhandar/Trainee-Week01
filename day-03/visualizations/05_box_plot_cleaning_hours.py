import pandas as pd
import matplotlib.pyplot as plt

file_path = "day-03/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

plt.figure(figsize=(8, 6))

plt.boxplot(data["hours_since_cleaning"])

plt.title("Distribution of Hours Since Cleaning")
plt.ylabel("Hours Since Cleaning")

plt.tight_layout()

plt.savefig(
    "day-03/visualizations/05_hours_since_cleaning_boxplot.png"
)

plt.show()