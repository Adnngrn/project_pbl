const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const register = async (req, res) => {
  try {
    const { name, handphone, email, password, gender, address } = req.body;

    // cek email sudah ada
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already used' });

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // simpan user baru
    const user = await User.create({
      name,
      handphone,
      email,
      password: hashed,
      gender,
      address,
      status: 'pending' // default, tunggu approval admin
    });

    return res.status(201).json({
      message: 'Registered. Waiting admin approval',
      userId: user._id
    });
  } catch (err) {
    // tangani error duplicate email
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    return res.status(500).json({ message: err.message });
  }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        if (user.status !== 'active') return res.status(403).json({ message: 'Account not active' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });
        return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports = { register, login };