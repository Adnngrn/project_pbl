const mongoose = require('mongoose');
const dueSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    period: { type: String },
    status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
    proof: { type: String }, // path to uploaded file
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Due', dueSchema);