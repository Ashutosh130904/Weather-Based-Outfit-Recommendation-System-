from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load model and encoders
model = joblib.load("outfit_predictor.pkl")
label_encoder = joblib.load("outfit_label_encoder.pkl")
ordinal_encoder = joblib.load("outfit_feature_encoder.pkl")
feature_columns = joblib.load("feature_columns.pkl")

# Define column orders
categorical_columns = ['Weather', 'TimeOfDay', 'LocationType', 'Gender', 'AgeGroup']
numerical_columns = ['Temperature', 'Humidity', 'WindSpeed']
feature_order = numerical_columns + categorical_columns


@app.route('/predict', methods=['POST'])
def predict_outfit():
    try:
        data = request.get_json()

        # Validate presence of all fields
        missing_fields = [col for col in feature_order if col not in data]
        if missing_fields:
            return jsonify({'error': f'Missing fields: {missing_fields}'}), 400

        # Process numerical features
        try:
            numerical_vals = [float(data[col]) for col in numerical_columns]
        except ValueError:
            return jsonify({'error': 'Numerical fields must be valid numbers'}), 400

        # Process and encode categorical features
        cat_vals = [[data[col] for col in categorical_columns]]
        try:
            encoded_cat_vals = ordinal_encoder.transform(cat_vals)[0].tolist()
        except Exception:
            return jsonify({'error': 'Invalid categorical value encountered'}), 400

        # Final input
        final_input = numerical_vals + encoded_cat_vals
        input_array = np.array(final_input).reshape(1, -1)

        # Predict
        prediction = model.predict(input_array)
        predicted_outfit = label_encoder.inverse_transform(prediction)[0]

        return jsonify({
            'outfit': predicted_outfit
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
