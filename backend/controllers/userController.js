const User = require('../models/User');

const list = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

const approveUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'active';
    await user.save();
    res.json({ message: 'User approved' });
};

const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
};

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
};

const updateUserStatus = async (req, res) => {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({ message: 'Status tidak valid' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    await user.save();

    res.json({ message: `Status updated to ${status}` });
};


module.exports = { list, getUser, approveUser, updateUser, deleteUser, updateUserStatus };