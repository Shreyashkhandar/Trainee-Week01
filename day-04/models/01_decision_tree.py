import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Convert categorical values into numbers
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

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Create model
model = DecisionTreeClassifier(
    random_state=42
)

# Train model
model.fit(X_train, y_train)

print("Model Training Complete")
print("------------------------")
print("Training Records:", len(X_train))
print("Testing Records:", len(X_test))

print("\nClasses:")
print(model.classes_)