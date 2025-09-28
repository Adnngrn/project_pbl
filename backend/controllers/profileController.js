const User = require('../models/User');
const bcrypt = require('bcrypt');

// GET /profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /profile
const updateProfile = async (req, res) => {
  try {
    const { name, handphone, address, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, handphone, address, gender },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /profile/password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password lama salah' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword
};
