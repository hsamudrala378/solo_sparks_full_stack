const express = require('express');
const Reward = require('../models/Reward');
const User = require('../models/User');
const UserReward = require('../models/UserReward');
const auth = require('../middleware/auth');

const router = express.Router();

// Seed rewards (optional)
router.post('/seed', async (req, res) => {
  await Reward.deleteMany();
  const rewards = await Reward.insertMany([
    { name: 'Profile Boost', cost: 50, type: 'boost', description: 'Boost visibility for 24h' },
    { name: 'Exclusive Prompt', cost: 30, type: 'prompt', description: 'Get a rare prompt' },
    { name: 'Secret Content', cost: 40, type: 'content', description: 'Unlock secret content' },
    { name: 'Mystery Token', cost: 100, type: 'token', description: 'Surprise reward' }
  ]);
  res.json(rewards);
});

// Get available rewards
router.get('/', async (req, res) => {
  const rewards = await Reward.find();
  res.json(rewards);
});

// Redeem reward
router.post('/:id/redeem', auth, async (req, res) => {
  const reward = await Reward.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!reward || !user) return res.status(404).json({ message: 'Reward/User not found' });

  if (user.sparkPoints < reward.cost) {
    return res.status(400).json({ message: 'Not enough points' });
  }

  user.sparkPoints -= reward.cost;
  await user.save();

  const redeemed = new UserReward({
    userId: user._id,
    rewardId: reward._id
  });
  await redeemed.save();

  res.json({ message: 'Reward redeemed!', reward });
});

module.exports = router;
