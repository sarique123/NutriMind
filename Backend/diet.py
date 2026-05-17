import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer

def scaling(dataframe):
    scaler = StandardScaler()
    prep_data = scaler.fit_transform(dataframe.iloc[:, 6:15].to_numpy())
    return prep_data, scaler

def nn_predictor(prep_data):
    neigh = NearestNeighbors(metric='cosine', algorithm='brute')
    neigh.fit(prep_data)
    return neigh

def build_pipeline(neigh, scaler, params):
    transformer = FunctionTransformer(neigh.kneighbors, kw_args=params)
    pipeline = Pipeline([('std_scaler', scaler), ('NN', transformer)])
    return pipeline

def extract_ingredient_filtered_data(dataframe, ingredients):
    if not ingredients:
        return dataframe
    regex_string = ''.join(map(lambda x: f'(?=.*{x})', ingredients))
    return dataframe[dataframe['RecipeIngredientParts'].str.contains(regex_string, regex=True, flags=re.IGNORECASE)]

def exclude_ingredient_filtered_data(dataframe, exclude_ingredients):
    if not exclude_ingredients:
        return dataframe
    regex_string = '|'.join(exclude_ingredients)
    return dataframe[~dataframe['RecipeIngredientParts'].str.contains(regex_string, regex=True, flags=re.IGNORECASE)]

def extract_quoted_strings(s):
    return re.findall(r'"([^"]*)"', s)

def apply_pipeline(pipeline, _input, extracted_data):
    _input = np.array(_input).reshape(1, -1)
    return extracted_data.iloc[pipeline.transform(_input)[0]]

def recommend(dataframe, ingredients=[], exclude_ingredients=[], is_non_veg=None, params={'n_neighbors': 5, 'return_distance': False}):
    extracted_data = dataframe.copy()

    if is_non_veg is not None:
        extracted_data = extracted_data[extracted_data['Is_Non_Veg'] == int(is_non_veg)]

    extracted_data = extract_ingredient_filtered_data(extracted_data, ingredients)
    extracted_data = exclude_ingredient_filtered_data(extracted_data, exclude_ingredients)

    if extracted_data.empty:
        return None  # no recipes after filtering

    prep_data, scaler = scaling(extracted_data)
    neigh = nn_predictor(prep_data)
    pipeline = build_pipeline(neigh, scaler, params)
    dummy_input = prep_data.mean(axis=0)  # use average nutrition as reference

    recommended_df = apply_pipeline(pipeline, dummy_input, extracted_data)

    # 🔥 Shuffle recommendations randomly
    recommended_df = recommended_df.sample(frac=1).reset_index(drop=True)

    # 🔥 Limit number of meals if fewer than requested
    n_meals = params['n_neighbors']
    if recommended_df.shape[0] < n_meals:
        recommended_df = recommended_df.head(recommended_df.shape[0])
    else:
        recommended_df = recommended_df.head(n_meals)

    return recommended_df


def output_recommended_recipes(dataframe):
    if dataframe is not None:
        output = dataframe.copy()
        output = output.to_dict("records")
        for recipe in output:
            recipe['RecipeIngredientParts'] = extract_quoted_strings(recipe['RecipeIngredientParts'])
            recipe['RecipeInstructions'] = extract_quoted_strings(recipe['RecipeInstructions'])
        return output
    return None

if __name__ == "__main__":
    dataset = pd.read_csv("food_data.csv")

    try:
        input("Enter age: ")
        input("Enter weight (kg): ")
        input("Enter height (cm): ")
        input("Enter gender (male/female): ")
        input("Enter activity level (sedentary, light, moderate, active, very active): ")

        ingredients = input("Enter preferred ingredients (comma separated): ").split(",")
        ingredients = [i.strip() for i in ingredients if i.strip()]
        meals = int(input("Enter number of meals to recommend: "))
        diet_pref = input("Dietary preference (veg/nonveg): ").strip().lower()
        is_non_veg = True if diet_pref == "nonveg" else False

        user_params = {'n_neighbors': meals, 'return_distance': False}

        rec_df = recommend(dataset, ingredients, is_non_veg, user_params)
        output = output_recommended_recipes(rec_df)

        if output:
            print("\nRecommended Meals:")
            for i, rec in enumerate(output, 1):
                print(f"\n{i}. {rec['Name']} - Ingredients: {rec['RecipeIngredientParts']}")
        else:
            print("No recommendations found. Try different inputs.")
    except Exception as e:
        print("Error:", e)
