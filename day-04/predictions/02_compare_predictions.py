import pandas as pd

file_path = "day-04/predictions/hygiene_risk_predictions.csv"

data = pd.read_csv(file_path)

# Compare actual and predicted values
data["Correct"] = (
    data["Actual_Risk"] == data["Predicted_Risk"]
)

correct = data["Correct"].sum()
incorrect = len(data) - correct

accuracy = (correct / len(data)) * 100

print("Prediction Comparison")
print("=====================")

print("Total Predictions:", len(data))
print("Correct Predictions:", correct)
print("Incorrect Predictions:", incorrect)

print(f"\nPrediction Accuracy: {accuracy:.2f}%")

print("\nPrediction Details")
print("------------------")
print(
    data[
        [
            "Actual_Risk",
            "Predicted_Risk",
            "Correct"
        ]
    ].head(20)
)