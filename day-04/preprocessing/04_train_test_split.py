import pandas as pd
from sklearn.model_selection import train_test_split

file_path = "day-04/dataset/cleaned_facility_hygiene_dataset.xlsx"

data = pd.read_excel(file_path)

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

# Split dataset into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Original Dataset:")
print(X.shape)

print("\nTraining Data:")
print(X_train.shape)

print("\nTesting Data:")
print(X_test.shape)

print("\nTraining Target:")
print(y_train.shape)

print("\nTesting Target:")
print(y_test.shape)