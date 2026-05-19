import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
# Update the filename here if your dataset is named differently
dataset_filename = 'donor_data.csv'

try:
    df = pd.read_csv(dataset_filename)
except FileNotFoundError:
    # Fallback to the generated dataset from the previous step
    dataset_filename = 'donor_churn_dataset.csv'
    df = pd.read_csv(dataset_filename)

# Define features and target variable
features = [
    'donation_frequency',
    'average_donation',
    'days_since_last_donation',
    'campaign_engagement_score',
    'total_donations'
]

X = df[features]

# Encode churn column: 'Yes' -> 1, 'No' -> 0
y = df['churn'].map({'Yes': 1, 'No': 0})

# Split the dataset into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Calculate and print the accuracy score
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.4f}")

# Save the model using joblib
model_filename = 'donor_churn_model.pkl'
joblib.dump(model, model_filename)
print(f"Model successfully saved as {model_filename}")
