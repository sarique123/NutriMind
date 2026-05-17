import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib

# Load the trained model
model = tf.keras.models.load_model('stress_model.keras')

# Load the scaler used during training
scaler = joblib.load('scaler.pkl')

# Define the feature names
feature_names = [
    'Sleep_Quality',
    'Headache_Frequency',
    'Academic_Performance',
    'Study_Load',
    'Extracurricular_Activities'
]

# Prompt the user for input values
print("Please provide the following inputs:")
user_inputs = []
for feature in feature_names:
    value = float(input(f"{feature.replace('_', ' ')}: "))
    user_inputs.append(value)

# Create a DataFrame to match scaler's expected input
input_df = pd.DataFrame([user_inputs], columns=feature_names)

# Scale the input data
scaled_input = scaler.transform(input_df)

# Predict the stress level
prediction = model.predict(scaled_input)
predicted_class = np.argmax(prediction, axis=1)[0]

# Corrected stress level mapping
stress_levels = {
    0: 'Low',
    1: 'Medium',
    2: 'High',
    3: 'Very High',
    4: 'Extreme'
}
predicted_stress_level = stress_levels.get(predicted_class, "Unknown")

print(f"\nPredicted Stress Level: {predicted_stress_level}")
