import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

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

# Create and train model
model = DecisionTreeClassifier(random_state=42)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

# Confusion Matrix
cm = confusion_matrix(
    y_test,
    y_pred,
    labels=["High", "Medium", "Low"]
)

# Feature Importance
importance = pd.DataFrame({
    "Feature": feature_columns,
    "Importance": model.feature_importances_
})

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print("DAY 4 - MACHINE LEARNING MODEL SUMMARY")
print("=======================================")

print("\nDataset")
print("-------")
print("Total Records:", len(data))
print("Features:", len(feature_columns))
print("Training Records:", len(X_train))
print("Testing Records:", len(X_test))

print("\nModel")
print("-----")
print("Algorithm: Decision Tree Classifier")

print("\nAccuracy")
print("--------")
print(f"{accuracy * 100:.2f}%")

print("\nConfusion Matrix")
print("----------------")
print(cm)

print("\nFeature Importance")
print("------------------")
print(importance.to_string(index=False))

print("\nClassification Report")
print("---------------------")
print(
    classification_report(
        y_test,
        y_pred,
        labels=["High", "Medium", "Low"]
    )
)