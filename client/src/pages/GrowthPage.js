import React, { useEffect, useState } from 'react';
import { getProgress } from '../services/userService';
import Navbar from '../components/Navbar';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const moodScale = {
  Happy: 5,
  Grateful: 4,
  Reflective: 3,
  Anxious: 2,
  Sad: 1
};

export default function GrowthPage() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    async function fetchMood() {
      const data = await fetch('http://localhost:5000/api/user/progress', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTRlNzM2Mjk0NzU0NjNjMDIwNzgzNiIsImlhdCI6MTc1MDM5NDc1NiwiZXhwIjoxNzUwNDgxMTU2fQ.lPGGRN3mEZFnnHmXIY9kpECWGLwViO9HxcOcXmGHj-w`
        }
      }).then((res) => res.json());

      const sorted = (data.moodHistory || []).sort((a, b) => new Date(a.date) - new Date(b.date));
      const mapped = sorted.map((m) => ({
        ...m,
        score: moodScale[m.mood] || 0
      }));
      setMoodData(mapped);
    }

    fetchMood();
  }, []);

  const chartData = {
    labels: moodData.map((m) => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Over Time',
        data: moodData.map((m) => m.score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
      }
    ]
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">📈 Emotional Growth Tracker</h2>
          <p className="text-sm text-gray-500 mb-6">Mood scores (1 = Sad → 5 = Happy)</p>

          {moodData.length > 0 && chartData.datasets[0].data.some((v) => v > 0) ? (
            <div className="bg-white p-4 rounded-lg border">
              <Line data={chartData} />
            </div>
          ) : (
            <p className="text-center text-gray-600">⚠️ Still no mood data! Try updating your mood from the dashboard.</p>
          )}
        </div>
      </div>
    </>
  );
}
