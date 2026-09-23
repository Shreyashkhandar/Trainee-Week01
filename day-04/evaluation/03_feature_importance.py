import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

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

# Train model
model = DecisionTreeClassifier(random_state=42)

model.fit(X_train, y_train)

# Get feature importance
importance = model.feature_importances_

# Create a table
feature_importance = pd.DataFrame({
    "Feature": feature_columns,
    "Importance": importance
})

# Sort from highest to lowest
feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print("Feature Importance")
print("==================")
print(feature_importance.to_string(index=False))
