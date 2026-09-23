import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Convert Yes/No into numbers
data["water_availability"] = data["water_availability"].map({
    "Yes": 1,
    "No": 0
})

# Features
feature_columns = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

X = data[feature_columns]
y = data["hygiene_risk"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Create model
model = DecisionTreeClassifier(
    random_state=42,
    max_depth=3
)

# Train model
model.fit(X_train, y_train)

# Create visualization
plt.figure(figsize=(18, 10))

plot_tree(
    model,
    feature_names=feature_columns,
    class_names=model.classes_,
    filled=True,
    rounded=True
)

plt.title("Decision Tree for Hygiene Risk Prediction")

# Save image
output_path = "day-04/models/decision_tree.png"

plt.savefig(
    output_path,
    dpi=150,
    bbox_inches="tight"
)

plt.show()

print("Decision Tree visualization saved to:")
print(output_path)