const mongoose = require('mongoose');

const donationProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  targetAmount: { type: Number }, // opsional
  collectedAmount: { type: Number, default: 0 }, // akumulasi dari donasi yang approved
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DonationProgram', donationProgramSchema);
