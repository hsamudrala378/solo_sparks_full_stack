const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const cloudinary = require('../utils/cloudinary');
const Reflection = require('../models/Reflection');
const Quest = require('../models/Quest');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/:questId', auth, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]), async (req, res) => {
  try {
    const { questId } = req.params;

    // ✅ Safely read body values
    const text = req.body?.text || '';
    let imageUrl = '';
    let audioUrl = '';

    // ✅ Handle image upload
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: 'solo_sparks/images'
      });
      imageUrl = result.secure_url;
    }

    // ✅ Handle audio upload
    if (req.files?.audio) {
      const result = await cloudinary.uploader.upload(req.files.audio[0].path, {
        resource_type: 'video',
        folder: 'solo_sparks/audio'
      });
      audioUrl = result.secure_url;
    }

    const reflection = new Reflection({
      userId: req.user.id,
      questId,
      text,
      imageUrl,
      audioUrl
    });

    await reflection.save();

    const quest = await Quest.findById(questId);
    quest.reflectionSubmitted = true;
    await quest.save();

    res.json({ message: 'Reflection submitted successfully', reflection });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});


module.exports = router;
