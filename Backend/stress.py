import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split
import tensorflow as tf

# Load the dataset
data = pd.read_csv('Student_Stress_Factors.csv', sep=',')
data.columns = ['Sleep_Quality', 'Headache_Frequency', 'Academic_Performance', 'Study_Load', 
                'Extracurricular_Activities', 'Stress_Level']

print(data.head())
print(data.shape)

# Define features and target variable
X = data.drop('Stress_Level', axis=1)  # Features
y = data['Stress_Level']  # Target variable

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Data scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save the scaler for later use
joblib.dump(scaler, 'scaler.pkl')

# Convert target variable to categorical
y_train = pd.get_dummies(y_train).values
y_test = pd.get_dummies(y_test).values

# Build the model
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(y_train.shape[1], activation='softmax')
])

# Compile the model
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
              loss='categorical_crossentropy', metrics=['accuracy'])

# Early stopping
early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)

# Train the model
model.fit(X_train, y_train, epochs=50, batch_size=8, validation_split=0.2, callbacks=[early_stopping])

# Evaluate the model
y_pred_prob = model.predict(X_test)
y_pred = np.argmax(y_pred_prob, axis=1)
y_test_labels = np.argmax(y_test, axis=1)

accuracy = accuracy_score(y_test_labels, y_pred)
confusion = confusion_matrix(y_test_labels, y_pred)

print("Accuracy:", accuracy)
print("Confusion Matrix:\n", confusion)

# Save the model properly
model.save('stress_model.keras')

print("✅ Model and scaler saved successfully!")
