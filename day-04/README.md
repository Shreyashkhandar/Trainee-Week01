# Day 4 – Machine Learning

Today I worked on the basic machine learning process using the cleaned facility hygiene dataset from Day 3.

The main goal was to train a model that can predict the hygiene risk of a facility as **Low, Medium, or High**.

## What I did

### 1. Prepared the dataset

I used the cleaned dataset containing 985 records.

The features used were:

* cleanliness_score
* odor_score
* waste_level
* water_availability
* footfall
* complaints
* hours_since_cleaning

The target column was:

* hygiene_risk

### 2. Converted Yes/No values

The `water_availability` column contained `Yes` and `No`.

Since the machine learning model needs numerical values, I converted them:

```text
Yes = 1
No = 0
```

### 3. Split the dataset

I divided the dataset into training and testing data.

```text
Total records = 985
Training data = 788
Testing data = 197
```

The training data is used to train the model, while the testing data is used to check how well the model performs on unseen data.

### 4. Trained a Decision Tree

I used:

```text
DecisionTreeClassifier
```

The model learns patterns from the training data and uses those patterns to predict the hygiene risk.

### 5. Made predictions

After training the model, I used the testing data to generate predictions.

The model predicts:

```text
Low
Medium
High
```

### 6. Evaluated the model

I checked the model using:

* Accuracy
* Confusion Matrix
* Classification Report

The classification report includes:

* Precision
* Recall
* F1-score
* Support

### 7. Checked feature importance

I also checked which features were important for the Decision Tree when making its predictions.

### 8. Visualized the Decision Tree

I created a visualization of the trained Decision Tree and saved it as:

```text
models/decision_tree.png
```

This makes it easier to understand how the model makes decisions.

### 9. Saved predictions

The model predictions were saved in:

```text
predictions/hygiene_risk_predictions.csv
```

This file contains the actual risk and predicted risk so they can be compared.

## Folder Structure

```text
day-04/
│
├── dataset/
│   └── cleaned_facility_hygiene_dataset.xlsx
│
├── preprocessing/
│   └── 04_train_test_split.py
│
├── models/
│   ├── 01_decision_tree.py
│   ├── 02_visualize_tree.py
│   └── decision_tree.png
│
├── evaluation/
│   ├── 01_model_evaluation.py
│   ├── 02_confusion_matrix.py
│   └── 03_feature_importance.py
│
├── predictions/
│   ├── 01_generate_predictions.py
│   ├── 02_compare_predictions.py
│   └── hygiene_risk_predictions.csv
│
└── reports/
    └── 01_model_summary.py
```

## Overall Process

```text
Cleaned Dataset
      ↓
Select Features
      ↓
Convert Yes/No to Numbers
      ↓
Split Training and Testing Data
      ↓
Train Decision Tree
      ↓
Make Predictions
      ↓
Evaluate Model
      ↓
Check Feature Importance
      ↓
Save Predictions
```

## What I learned

Through Day 4, I learned the basic machine learning workflow, how to prepare data for a model, split data into training and testing sets, train a Decision Tree, make predictions, and evaluate the results.
