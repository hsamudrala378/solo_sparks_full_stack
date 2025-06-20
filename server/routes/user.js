const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();
const Quest = require('../models/Quest');
const Reflection = require('../models/Reflection');

// GET current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE mood, personality, needs
router.put('/profile', auth, async (req, res) => {
    try {
        const { mood, personalityTraits, emotionalNeeds } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (mood) {
            user.mood = mood;

            // ✅ Safely push mood to history
            if (!Array.isArray(user.moodHistory)) {
                user.moodHistory = [];
            }
            user.moodHistory.push({ mood, date: new Date() });
        }

        if (personalityTraits) user.personalityTraits = personalityTraits;
        if (emotionalNeeds) user.emotionalNeeds = emotionalNeeds;

        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Add temporary patch route
router.post('/add-points', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    user.sparkPoints += 100;
    await user.save();
    res.json({ message: 'Points added', sparkPoints: user.sparkPoints });
});

router.get('/progress', auth, async (req, res) => {
    try {
        const userId = req.user.id;

        const totalQuests = await Quest.countDocuments({ userId });
        const completedQuests = await Quest.countDocuments({ userId, completed: true });
        const reflections = await Reflection.countDocuments({ userId });

        const user = await User.findById(userId); // ✅ No select() this time — get full user

        console.log("🚀 moodHistory from DB:", user.moodHistory); // ✅ Log it!

        res.json({
            totalQuests,
            completedQuests,
            reflections,
            sparkPoints: user.sparkPoints || 0,
            moodHistory: user.moodHistory || []
        });
    } catch (err) {
        console.error('❌ Error in /user/progress:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
