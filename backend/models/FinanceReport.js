const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    type: { type: String, enum: ['income','expense'], required: true },
    description: String,
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('FinanceReport', reportSchema);