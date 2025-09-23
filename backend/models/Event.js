const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['upcoming','ongoing','finished'], default: 'upcoming' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Event', eventSchema);