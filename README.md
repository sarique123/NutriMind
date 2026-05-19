
# 🧠 Lifestyle Recommender for College Students

> An intelligent health and productivity assistant tailored for college students using AI and the MERN stack.

---

## 📌 Project Overview

This project provides **personalized lifestyle recommendations** to college students by analyzing:
- 📸 Mess menu images (processed with OCR)
- 📋 Self-reported lifestyle data (sleep, exercise, screen time, etc.)
- 🍲 Nutritional information of food items

Using AI and a modern web stack, it simplifies healthy living for students.

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend:
- Node.js + Express.js
- MongoDB Atlas
- Tesseract.js (OCR)
- Python (ML model for recommendations, connected via API)

---

## 🧩 Features

- 🖼️ Upload mess menu image to extract food items (OCR)
- 🧾 Fill in lifestyle details: sleep, exercise, mood, etc.
- 🧠 AI model suggests lifestyle improvements
- 📊 Nutritional mapping of extracted food
- 🌈 Clean, responsive, and modern UI

---



## ⚙️ How It Works

### 1. Upload Menu Image:
Students upload a photo of the mess menu.

### 2. OCR Text Extraction:
`Tesseract.js` extracts food item names from the image.

### 3. Lifestyle Form:
Users fill daily lifestyle inputs (sleep, screen time, mood, etc.).

### 4. Feature Engineering:
Food items are matched to nutrition data; lifestyle metrics are normalized.

### 5. AI Model Recommendation:
Model gives suggestions like:
- "Increase sleep time"
- "Reduce screen time"
- "Avoid oily food tonight"
- "Add 30 min walk"

---

## ✅ Results

- 🧾 OCR Accuracy: ~85% in clear, well-lit mess menu images
- 🧠 Recommendations: Generated based on lifestyle and food inputs
- 📊 Dataset created from real student patterns

---

## 🔍 Data Sources

- [Dartmouth StudentLife Dataset](https://studentlife.cs.dartmouth.edu/dataset.html)
- [Kaggle: Student Lifestyle Dataset](https://www.kaggle.com/datasets/adaziialerite/student-lifestyle)
- [Kaggle: Daily Lifestyle Analysis](https://www.kaggle.com/code/steve1215rogg/data-analysis-on-student-s-daily-lifestyle)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sarique123/NutriMind.git
cd NutriMind
```

### 2. Start Backend

```bash
cd Backend
npm install
npm start
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 Future Scope

- Mobile app integration
- Notification/reminder system
- Smart watch or wearable device support
- Gamified experience with rewards

---

