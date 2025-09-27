const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationProgram', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  proof: { type: String }, // path file bukti
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
