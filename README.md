# 🌟 MoodSpark

**MoodSpark** is a full-stack emotional wellness tracker that gamifies personal growth. Users complete quests, submit reflections (text/image/audio), earn Spark Points, and track their emotional journey using a dynamic mood chart.

You can access the link :  https://solo-sparks-full-stack.vercel.app/register 

---

## 🛠 Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React, React Router, Tailwind CSS |
| Backend   | Node.js, Express, JWT Auth    |
| Database  | MongoDB + Mongoose            |
| Charting  | Chart.js via react-chartjs-2  |
| Uploads   | Multer for image/audio        |
| Deploy    | Vercel (frontend) + Render (backend)

---

## 📸 Features

- ✅ User Authentication (JWT)
- ✅ Daily Quest Generator
- ✅ Spark Points System
- ✅ Submit Reflections (text, image, audio)
- ✅ View Mood Over Time (Chart.js)
- ✅ Rewards Store for Redeeming Points
- ✅ Fully Responsive UI (Tailwind CSS)

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/moodspark.git
cd moodspark
### 2. Install client & server dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
### 3. Set up environment variables
Create a .env file in /server:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
🧪 Running the App Locally
bash
Copy
Edit
# Start backend
cd server
node server.js

# Start frontend
cd ../client
npm start
