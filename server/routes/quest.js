const express = require('express');
const Quest = require('../models/Quest');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { generateRandomQuest } = require('../utils/questEngine');

const router = express.Router();

// 🟢 Get all quests for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const quests = await Quest.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(quests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quests' });
  }
});

// 🟡 Generate a new personalized quest
router.post('/generate', auth, async (req, res) => {
  try {
    const newQuestData = generateRandomQuest();
    const newQuest = new Quest({
      userId: req.user.id,
      ...newQuestData
    });
    await newQuest.save();
    res.json(newQuest);
  } catch (err) {
    res.status(500).json({ message: 'Quest generation failed' });
  }
});

// 🔵 Mark quest as completed and award spark points
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest || quest.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Quest not found or unauthorized' });
    }

    // If already completed, prevent duplicate points
    if (quest.completed) {
      return res.status(400).json({ message: 'Quest already completed' });
    }

    // Mark as complete
    quest.completed = true;
    await quest.save();

    // Award Spark Points to user
    const user = await User.findById(req.user.id);
    const pointsEarned = quest.type === 'weekly' ? 20 : 10;
    user.sparkPoints += pointsEarned;
    await user.save();

    res.json({
      message: 'Quest marked as completed and points awarded!',
      pointsEarned,
      totalPoints: user.sparkPoints
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
router.post('/:id/complete', auth, async (req, res) => {
  const quest = await Quest.findOne({ _id: req.params.id, userId: req.user.id });
  if (!quest) return res.status(400).json({ message: 'Quest not found or unauthorized' });

  quest.completed = true;
  await quest.save();

  const user = await User.findById(req.user.id);
  user.sparkPoints += 10;
  await user.save();

  res.json({ message: 'Quest marked as complete' });
});


module.exports = router;
