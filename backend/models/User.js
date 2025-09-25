const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    handphone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
    gender: { type: String, enum: ['male', 'female'], required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);