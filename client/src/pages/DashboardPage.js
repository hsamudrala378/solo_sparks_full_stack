import React, { useEffect, useState } from 'react';
import { getQuests, generateQuest, completeQuest } from '../services/questService';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProgress, updateUserProfile } from '../services/userService';

export default function DashboardPage() {
    const [quests, setQuests] = useState([]);
    const [points, setPoints] = useState(0);
    const [mood, setMood] = useState('');


    useEffect(() => {
        async function load() {
            const q = await getQuests();
            const prog = await getProgress();
            setQuests(q);
            setPoints(prog.sparkPoints);
            setMood(prog.mood || '');

        }
        load();
    }, []);

    const handleGenerate = async () => {
        await generateQuest();
        const q = await getQuests();
        setQuests(q);
    };

    const handleComplete = async (id) => {
        console.log("📌 Completing quest with ID:", id);
        await completeQuest(id);
        const q = await getQuests();
        const prog = await getProgress();
        setQuests(q);
        setPoints(prog.sparkPoints);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-purple-700 mb-4">🎯 Your Solo Sparks Dashboard</h2>

                    <div className="flex justify-between items-center mb-4">
                        <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
                            ✨ Spark Points: {points}
                        </span>
                        <button
                            onClick={handleGenerate}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Generate New Quest
                        </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {quests.map((quest) => (
                            <div key={quest._id} className="bg-purple-50 p-4 rounded-xl shadow">
                                <h4 className="font-semibold text-lg text-purple-800">{quest.title}</h4>
                                <p className="text-sm text-gray-700 mt-1 mb-2">{quest.description}</p>
                                <p className="text-xs italic text-gray-500 mb-2">
                                    Status: {quest.completed ? '✅ Completed' : '⏳ In Progress'}
                                </p>
                                {!quest.completed && (
                                    <button
                                        onClick={() => handleComplete(quest._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Mark Complete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Link
                            to="/reflect"
                            className="text-blue-700 underline hover:text-blue-900"
                        >
                            ✍️ Submit a Reflection
                        </Link>
                        <Link
                            to="/rewards"
                            className="text-green-700 underline hover:text-green-900"
                        >
                            🎁 Visit Rewards Store
                        </Link>
                        <Link
                            to="/growth"
                            className="text-purple-700 underline hover:text-purple-900"
                        >
                            📈 View Mood Tracker
                        </Link>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-gray-700 mb-1">Update Mood:</label>
                        <select
                            value={mood}
                            onChange={async (e) => {
                                const newMood = e.target.value;
                                setMood(newMood);
                                await updateUserProfile({ mood: newMood });
                            }}
                            className="border px-3 py-2 rounded w-full sm:w-64"
                        >
                            <option value="">-- Select Mood --</option>
                            <option value="Happy">Happy</option>
                            <option value="Grateful">Grateful</option>
                            <option value="Reflective">Reflective</option>
                            <option value="Anxious">Anxious</option>
                            <option value="Sad">Sad</option>
                        </select>
                    </div>

                </div>
            </div>
        </>
    );
}
