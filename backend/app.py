from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import traceback

app = Flask(__name__)
# Allow CORS for all domains to prevent frontend connection issues
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the trained model
MODEL_PATH = 'donor_churn_model.pkl'
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
else:
    model = None
    print(f"Warning: {MODEL_PATH} not found. Ensure the model is trained.")

# Load dataset for statistics
DATA_PATH = 'donor_churn_dataset.csv'
if not os.path.exists(DATA_PATH):
    DATA_PATH = 'donor_data.csv'

try:
    if os.path.exists(DATA_PATH):
        df = pd.read_csv(DATA_PATH)
    elif os.path.exists('../' + DATA_PATH):
        df = pd.read_csv('../' + DATA_PATH)
    else:
        df = pd.DataFrame()
except Exception as e:
    df = pd.DataFrame()
    print(f"Warning: Could not load dataset for stats: {e}")

@app.route("/")
def home():
    return "Backend Working"

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        print("Error: Model not loaded")
        return jsonify({'error': 'Model not loaded on server'}), 500
        
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        
        # Extract features and format as a Pandas DataFrame
        # scikit-learn models trained with DataFrames expect DataFrames for prediction
        feature_dict = {
            'donation_frequency': [data['donation_frequency']],
            'average_donation': [data['average_donation']],
            'days_since_last_donation': [data['days_since_last_donation']],
            'campaign_engagement_score': [data['campaign_engagement_score']],
            'total_donations': [data['total_donations']]
        }
        
        features_df = pd.DataFrame(feature_dict)
        
        # Predict class (1 = Yes/Churn, 0 = No/Safe)
        prediction_encoded = model.predict(features_df)[0]
        prediction = 'Likely to Churn' if prediction_encoded == 1 else 'Not Likely to Churn'
        
        # Get confidence score (probability of the predicted class)
        probabilities = model.predict_proba(features_df)[0]
        confidence_score = int(round(float(max(probabilities)) * 100))
        
        response_data = {
            'prediction': prediction,
            'confidence_score': confidence_score
        }
        
        print(f"Sending response: {response_data}")
        return jsonify(response_data)
        
    except KeyError as e:
        error_msg = f'Missing required feature: {str(e)}'
        print(f"Error: {error_msg}")
        return jsonify({'error': error_msg}), 400
    except Exception as e:
        print("Prediction error:")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 400

@app.route('/stats', methods=['GET'])
def stats():
    try:
        if df.empty:
            return jsonify({
                'total_donors': 0,
                'churn_risk_percentage': 0,
                'active_donors': 0,
                'message': 'Dataset not found to compute stats'
            })
            
        total_donors = len(df)
        
        # Calculate churn risk percentage based on the target column ('Yes')
        churned_donors = len(df[df['churn'] == 'Yes'])
        churn_risk_percentage = (churned_donors / total_donors) * 100 if total_donors > 0 else 0
        
        active_donors = total_donors - churned_donors
        
        return jsonify({
            'total_donors': int(total_donors),
            'churn_risk_percentage': round(churn_risk_percentage, 2),
            'active_donors': int(active_donors)
        })
    except Exception as e:
        print("Stats error:")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Moved to the bottom to ensure all routes are registered before running
    app.run(debug=True, port=5000)
