from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib

# Import recipe recommendation functions
from diet import recommend, output_recommended_recipes

# Load the trained stress prediction model and scaler
try:
    model = tf.keras.models.load_model('stress_model.keras')
    scaler = joblib.load('scaler.pkl')
except Exception as e:
    raise RuntimeError(f"Error loading model or scaler: {str(e)}")

# Load food dataset
try:
    food_data = pd.read_csv("food_data.csv")
except Exception as e:
    raise RuntimeError(f"Error loading food dataset: {str(e)}")

# Define FastAPI app
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Input models ---
class StressPredictionInput(BaseModel):
    Sleep_Quality: float
    Headache_Frequency: float
    Academic_Performance: float
    Study_Load: float
    Extracurricular_Activities: float

def input_frame_call(input_data: StressPredictionInput) -> str:
    weights = np.array([-2, 2, -1, 2, -1])
    features = np.array([
        input_data.Sleep_Quality,
        input_data.Headache_Frequency,
        input_data.Academic_Performance,
        input_data.Study_Load,
        input_data.Extracurricular_Activities
    ])
    
    score = np.dot(weights, features)  # Matrix dot product

    thresholds = [
        (-np.inf, -3, "Low"),
        (-3, 1, "Medium"),
        (1, 4, "High"),
        (4, 7, "Very High"),
        (7, np.inf, "Extreme")
    ]
    
    for lower, upper, label in thresholds:
        if lower < score <= upper:
            return label

    return "Unknown"

class RecipeRecommendationInput(BaseModel):
    ingredients: list[str] = []
    exclude: list[str] = []
    is_non_veg: bool | None = None
    n_meals: int = 5

# --- Mappings ---
feature_names = [
    'Sleep_Quality',
    'Headache_Frequency',
    'Academic_Performance',
    'Study_Load',
    'Extracurricular_Activities'
]

stress_levels = {
    0: 'Low',
    1: 'Medium',
    2: 'High',
    3: 'Very High',
    4: 'Extreme'
}

# --- Routes ---
@app.post("/predict-stress-level/")
async def predict_stress_level(input_data: StressPredictionInput):
    try:
        user_inputs = [
            input_data.Sleep_Quality,
            input_data.Headache_Frequency,
            input_data.Academic_Performance,
            input_data.Study_Load,
            input_data.Extracurricular_Activities
        ]
        input_df = pd.DataFrame([user_inputs], columns=feature_names)
        predicted_stress_level = input_frame_call(input_data)
        scaled_input = scaler.transform(input_df)
        prediction = model.predict(scaled_input)
        predicted_class = np.argmax(prediction, axis=1)[0]
        preditced_stress_level = stress_levels.get(predicted_class, "Unknown")
        return {"predicted_stress_level": predicted_stress_level}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/recommend-recipes/")
async def recommend_recipes(input_data: RecipeRecommendationInput):
    try:
        user_params = {'n_neighbors': input_data.n_meals, 'return_distance': False}
        rec_df = recommend(
            food_data,
            ingredients=input_data.ingredients,
            exclude_ingredients=input_data.exclude,
            is_non_veg=input_data.is_non_veg,
            params=user_params
        )
        output = output_recommended_recipes(rec_df)
        if output:
            return {"recommended_recipes": output}
        else:
            raise HTTPException(status_code=404, detail="No recommendations found for the given criteria.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation failed: {str(e)}")
