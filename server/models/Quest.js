const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  reflectionSubmitted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Quest', questSchema);
