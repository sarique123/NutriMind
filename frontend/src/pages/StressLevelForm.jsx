import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

// Main component for the stress level prediction form
const StressLevelForm = () => {
  // State hooks for form inputs
  const [sleepQuality, setSleepQuality] = useState('1');
  const [headacheFrequency, setHeadacheFrequency] = useState('1');
  const [academicPerformance, setAcademicPerformance] = useState('1');
  const [studyLoad, setStudyLoad] = useState('1');
  const [extracurricularActivities, setExtracurricularActivities] = useState('1');

  // State hooks for prediction results, loading status, and errors
  const [predictedStressLevel, setPredictedStressLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // for navigating to the next page

  // --- Helper Functions ---

  // Determines the Tailwind CSS color class based on the stress level
  const getStressLevelColor = (level) => {
    const numLevel = parseFloat(level);
    if (isNaN(numLevel)) return 'text-gray-600'; // Default color if level is not a number
    if (numLevel < 3) return 'text-green-600';  // Low stress
    if (numLevel < 6) return 'text-yellow-600'; // Moderate stress
    return 'text-red-600';                      // High stress
  };

  // Provides a descriptive text based on the stress level
  const getStressLevelDescription = (level) => {
    const numLevel = parseFloat(level);
    if (isNaN(numLevel)) return 'Could not determine stress level.';
    if (numLevel < 3) return 'Low stress - Keep up the good work!';
    if (numLevel < 6) return 'Moderate stress - Consider some relaxation techniques.';
    return 'High stress - Please consider seeking support.';
  };

  // Descriptions for each input field, used potentially for tooltips or help text
  const fieldDescriptions = {
    sleepQuality: 'Rate your sleep quality from 1 (poor) to 5 (excellent)',
    headacheFrequency: 'Rate headache frequency from 1 to 5',
    academicPerformance: 'Rate your academic performance from 1 (poor) to 5 (excellent)',
    studyLoad: 'Rate your study load from 1 (light) to 5 (very heavy)',
    extracurricular: 'Rate your extracurricular involvement from 1 (none) to 5 (extensive)'
  };

  // --- API Call Handler ---

  // Handles the form submission and API call
  const handlePredict = async () => {
    setIsLoading(true); // Set loading state to true
    setError(''); // Clear previous errors
    setPredictedStressLevel(null); // Clear previous prediction

    // Prepare the data payload for the API
    const formData = {
      Sleep_Quality: parseInt(sleepQuality),
      Headache_Frequency: parseInt(headacheFrequency),
      Academic_Performance: parseInt(academicPerformance),
      Study_Load: parseInt(studyLoad),
      Extracurricular_Activities: parseInt(extracurricularActivities),
    };

    // Log the data being sent to the API for debugging
    console.log('Sending data to API:', formData);

    try {
      // Make the POST request to the prediction API endpoint
      const response = await axios.post('http://127.0.0.1:8000/predict-stress-level/', formData);

      // Log the raw API response for debugging
      console.log('API Response:', response);

      // --- IMPORTANT: Adjust this based on your actual API response structure ---
      // Check if the response and data exist
      if (response && response.data !== null && response.data !== undefined) {
        // Attempt to extract the prediction. Common keys might be 'prediction', 'predicted_stress_level', etc.
        // Modify 'predicted_stress_level' if your API uses a different key.
        const predictionValue = response.data.predicted_stress_level ?? response.data.prediction ?? response.data;

        // Check if a valid prediction value was extracted
        if (predictionValue !== null && predictionValue !== undefined) {
          // Convert the prediction to a string and update the state
          setPredictedStressLevel(predictionValue.toString());
          console.log('Prediction successful:', predictionValue);
        } else {
          // Throw an error if the expected data structure is not found
          throw new Error('Prediction key not found in API response data.');
        }
      } else {
        // Throw an error if the response or data is invalid
        throw new Error('Invalid or empty response data from API');
      }

      setIsLoading(false); // Set loading state to false on success
    } catch (error) {
      // Log the error details to the console
      console.error('Error predicting stress level:', error);

      // Construct a user-friendly error message
      let errorMessage = 'Failed to predict stress level. ';
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        errorMessage += `Server error: ${error.response.status}. ${error.response.data?.message || error.response.data || ''}`;
      } else if (error.request) {
        // Request was made but no response received (network error, server down)
        errorMessage += 'No response from server. Please check API endpoint and network connection.';
      } else {
        // Other errors (e.g., setup issues, issues in the 'try' block before the request)
        errorMessage += error.message || 'An unknown error occurred.';
      }
      setError(errorMessage); // Update the error state

      setIsLoading(false); // Set loading state to false on error

      // --- Mock Prediction Fallback (Optional) ---
      // Set to true to enable mock prediction when the API call fails
      const useMockFallback = true;

      if (useMockFallback) {
        console.warn('API call failed. Using mock prediction as fallback.');
        // Simple weighted calculation for mock prediction
        const mockPrediction = Math.round(
          (10 - formData.Sleep_Quality) * 0.3 +
          formData.Headache_Frequency * 0.2 +
          (10 - formData.Academic_Performance) * 0.2 +
          formData.Study_Load * 0.15 +
          formData.Extracurricular_Activities * 0.15
        );
        // Ensure mock prediction is within the 0-10 range
        const clampedMockPrediction = Math.min(10, Math.max(0, mockPrediction));
        setPredictedStressLevel(clampedMockPrediction.toString());
        // Append a note to the error message indicating mock data is used
        setError(errorMessage + ' (Displaying mock prediction instead)');
      }
    }
  };

  // --- Reusable Input Field Component ---
  const InputField = ({ label, value, onChange, id, description }) => (
    <div className="mb-4">
      {/* Label and current value display */}
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
          {value || '0'}/5 {/* Display current value */}
        </span>
      </div>
      {/* Slider and Number Input */}
      <div className="flex items-center gap-3">
        {/* Range Slider */}
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)} // Update state on slider change
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" // Added accent color
        />
        {/* Number Input Box */}
        <input
          type="number"
          min="1"
          max="5"
          step="1"
          value={value}
          // Update state on number input change, ensuring value stays within 0-10
          onChange={(e) => {
            const numValue = parseInt(e.target.value);
            // Handle empty input or invalid numbers gracefully
            const validatedValue = isNaN(numValue) ? '0' : Math.min(10, Math.max(0, numValue)).toString();
            onChange(validatedValue);
          }}
          className="w-16 p-1.5 text-sm border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500" // Improved styling
        />
      </div>
      {/* Description Text */}
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );

  // --- Main JSX Render ---
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-10 font-sans"> {/* Using Inter font via Tailwind's default sans-serif */}
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Stress Level Prediction
        </h2>

        {/* Form Fields Area */}
        <div className="space-y-4">
          {/* Render each input field using the reusable component */}
          <InputField
            label="Sleep Quality"
            value={sleepQuality}
            onChange={setSleepQuality}
            id="sleep-quality"
            description={fieldDescriptions.sleepQuality}
          />
          <InputField
            label="Headache Frequency"
            value={headacheFrequency}
            onChange={setHeadacheFrequency}
            id="headache-frequency"
            description={fieldDescriptions.headacheFrequency}
          />
          <InputField
            label="Academic Performance"
            value={academicPerformance}
            onChange={setAcademicPerformance}
            id="academic-performance"
            description={fieldDescriptions.academicPerformance}
          />
          <InputField
            label="Study Load"
            value={studyLoad}
            onChange={setStudyLoad}
            id="study-load"
            description={fieldDescriptions.studyLoad}
          />
          <InputField
            label="Extracurricular Activities"
            value={extracurricularActivities}
            onChange={setExtracurricularActivities}
            id="extracurricular-activities"
            description={fieldDescriptions.extracurricular}
          />

          {/* Submit Button */}
          <div className="mt-8"> {/* Increased top margin */}
            <button
              onClick={handlePredict}
              className={`w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Improved styling and disabled state
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                'Predict Stress Level'
              )}
            </button>
          </div>
        </div>

        {/* Error Display Area */}
        {error && !predictedStressLevel && ( // Only show error if there's no prediction (even mock)
          <div className="mt-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Prediction Result Area (Actual API Result) */}
        {/* Show this block only if prediction exists AND there was no error during the API call */}
        {predictedStressLevel && !error && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis Results</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-700">Predicted Stress Level:</span>
              <span className={`text-xl font-bold ${getStressLevelColor(predictedStressLevel)}`}>
                {predictedStressLevel}
              </span>
            </div>
            {/* <p className={`text-sm font-medium ${getStressLevelColor(predictedStressLevel)}`}>
            {getStressLevelDescription(predictedStressLevel)}
          </p> */}
            <div className="mt-3 text-xs text-gray-500">
              <p>Disclaimer: This prediction is based on the provided inputs and the model's analysis. If you are concerned about your stress levels, please consult a healthcare professional.</p>
            </div>
          </div>
        )}

        {/* Next Button */}
        {predictedStressLevel && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate('/next-page')} 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              Next
            </button>
          </div>
        )}

        {/* Prediction Result Area (Mock Fallback Result) */}
        {/* Show this block only if prediction exists AND there WAS an error (meaning it's a mock result) */}
        {predictedStressLevel && error && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Analysis Results (Mock)</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-yellow-700">Estimated Stress Level:</span>
              <span className={`text-xl font-bold ${getStressLevelColor(predictedStressLevel)}`}>
                {predictedStressLevel}
              </span>
            </div>
            {/* <p className={`text-sm font-medium ${getStressLevelColor(predictedStressLevel)}`}>
             {getStressLevelDescription(predictedStressLevel)}
           </p> */}
            <div className="mt-3 text-xs text-yellow-600">
              <p><strong>Note:</strong> The prediction service could not be reached. This is an estimated result based on a fallback calculation.</p>
              <p className="mt-1"><strong>Original Error:</strong> {error.replace(' (Displaying mock prediction instead)', '')}</p> {/* Show the original error */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StressLevelForm; // Export the component for use in other parts of the application
