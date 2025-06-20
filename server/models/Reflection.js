const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
  text: { type: String },
  imageUrl: { type: String },
  audioUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reflection', reflectionSchema);
