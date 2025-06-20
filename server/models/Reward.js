const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ['boost', 'content', 'prompt', 'token'], default: 'content' }
});

module.exports = mongoose.model('Reward', rewardSchema);
