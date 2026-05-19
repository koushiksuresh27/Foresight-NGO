import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib


dataset_filename = 'donor_data.csv'

try:
    df = pd.read_csv(dataset_filename)
except FileNotFoundError:
    
    dataset_filename = 'donor_churn_dataset.csv'
    df = pd.read_csv(dataset_filename)


features = [
    'donation_frequency',
    'average_donation',
    'days_since_last_donation',
    'campaign_engagement_score',
    'total_donations'
]

X = df[features]

y = df['churn'].map({'Yes': 1, 'No': 0})

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.4f}")

model_filename = 'donor_churn_model.pkl'
joblib.dump(model, model_filename)
print(f"Model successfully saved as {model_filename}")
