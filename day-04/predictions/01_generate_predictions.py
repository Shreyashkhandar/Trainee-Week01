import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

# Convert Yes/No into numerical values
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

# Generate predictions
y_pred = model.predict(X_test)

# Create prediction results
results = X_test.copy()

results["Actual_Risk"] = y_test.values
results["Predicted_Risk"] = y_pred

# Save predictions
output_path = "day-04/predictions/hygiene_risk_predictions.csv"

results.to_csv(output_path, index=False)

print("Predictions Generated")
print("---------------------")

print("Number of Predictions:", len(results))

print("\nFirst 10 Predictions:")
print(results[[
    "Actual_Risk",
    "Predicted_Risk"
]].head(10))

print("\nPredictions saved to:")
print(output_path)