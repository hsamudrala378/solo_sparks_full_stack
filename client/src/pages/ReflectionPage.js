import React, { useState, useEffect } from 'react';
import { getQuests } from '../services/questService';
import { submitReflection } from '../services/reflectionService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ReflectionPage() {
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuests() {
      const q = await getQuests();
      const completed = q.filter((q) => q.completed && !q.reflectionSubmitted);
      setQuests(completed);
    }
    loadQuests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);
    if (audio) formData.append('audio', audio);

    await submitReflection(selectedQuest, formData);
    alert('Reflection submitted!');
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">📝 Submit Your Reflection</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold">
              Choose Completed Quest:
              <select
                required
                value={selectedQuest}
                onChange={(e) => setSelectedQuest(e.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="">-- Select --</option>
                {quests.map((q) => (
                  <option key={q._id} value={q._id}>{q.description}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="font-semibold">Text Reflection:</span>
              <textarea
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            <label className="block">
              <span className="font-semibold">Upload Image:</span>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="mt-1" />
            </label>

            <label className="block">
              <span className="font-semibold">Upload Audio:</span>
              <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} className="mt-1" />
            </label>

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
            >
              Submit Reflection
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
