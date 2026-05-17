import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const RecommendationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activity: '',
    ingredients: '',
    exclude: '',
    meals: 1,
    diet: 'veg',
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const dataToSend = {
      ...formData,
      ingredients: formData.ingredients
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== ''),
      exclude: formData.exclude
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== ''),
      is_non_veg: formData.diet === 'nonveg',
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/recommend-recipes/', dataToSend);
      console.log(response);
      setRecommendations(response.data.recommended_recipes);
      if (onSubmit) onSubmit(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Personalized Recipe Recommendations</h1>
          <p className="text-white">Fill in your details to get customized recipe suggestions based on your profile and preferences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Your Profile</h2>
              
              <div className="space-y-4">
                {/* Personal Information */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Activity Level</label>
                  <select 
                    name="activity" 
                    value={formData.activity} 
                    onChange={handleChange} 
                    className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very active">Very Active</option>
                  </select>
                </div>
                
                {/* Dietary Preferences */}
                <div className="pt-2 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Dietary Preferences</h3>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Preferred Ingredients</label>
                    <input
                      type="text"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleChange}
                      placeholder="e.g. chicken, rice, spinach"
                      className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate ingredients with commas</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Ingredients to exclude</label>
                    <input
                      type="text"
                      name="exclude"
                      value={formData.exclude}
                      onChange={handleChange}
                      placeholder="e.g. onion, egg, meat"
                      className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate ingredients with commas</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Number of Meals</label>
                      <input
                        type="number"
                        name="meals"
                        value={formData.meals}
                        onChange={handleChange}
                        className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={1}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Diet Type</label>
                      <select 
                        name="diet" 
                        value={formData.diet} 
                        onChange={handleChange} 
                        className="w-full border text-gray-950 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="veg">Vegetarian</option>
                        <option value="nonveg">Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-6 bg-orange-800 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Get Recommendations"}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Recipe Recommendations</h2>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600">Finding the perfect recipes for you...</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {recommendations.map((recipe) => (
                    <div key={recipe.RecipeId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800">{recipe.Name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {recipe.Calories} kcal
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Prep: {recipe.PrepTime} min
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Cook: {recipe.CookTime} min
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Total: {recipe.TotalTime} min
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Ingredients</h4>
                          <div className="flex flex-wrap gap-2">
                            {recipe.RecipeIngredientParts.map((ingredient, idx) => (
                              <span key={idx} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-normal text-gray-600">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Instructions</h4>
                          <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            {recipe.RecipeInstructions.map((instruction, index) => (
                              <li key={index} className="text-sm">{instruction}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="mt-4 text-gray-600">No recommendations yet. Fill in your details to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationForm;