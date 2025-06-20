import React, { useEffect, useState } from 'react';
import { getAllRewards, redeemReward } from '../services/rewardService';
import { getProgress } from '../services/userService';
import Navbar from '../components/Navbar';

export default function RewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function loadData() {
      const rewardList = await getAllRewards();
      const progress = await getProgress();
      setRewards(rewardList);
      setPoints(progress.sparkPoints);
    }
    loadData();
  }, []);

  const handleRedeem = async (id, cost) => {
    if (points < cost) {
      alert('Not enough Spark Points');
      return;
    }
    await redeemReward(id);
    alert('Reward redeemed!');
    window.location.reload(); // Refresh page to update points
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🎁 Rewards Store</h2>
          <p className="text-lg text-gray-600 mb-6">You have <span className="font-semibold text-green-800">{points}</span> Spark Points</p>

          <div className="grid gap-6 md:grid-cols-2">
            {rewards.map(r => (
              <div key={r._id} className="bg-green-100 p-4 rounded-xl shadow-md">
                <h4 className="text-xl font-semibold text-green-800">{r.name}</h4>
                <p className="text-sm text-gray-700 my-2">{r.description}</p>
                <p className="text-sm text-green-600 font-bold mb-2">Cost: {r.cost} points</p>
                <button
                  onClick={() => handleRedeem(r._id, r.cost)}
                  className="bg-green-700 hover:bg-green-800 text-white text-sm px-3 py-2 rounded"
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
