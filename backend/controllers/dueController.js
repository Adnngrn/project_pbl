const multer = require('multer');
const path = require('path');
const Due = require('../models/Due');
const FinanceReport = require('../models/FinanceReport');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR || 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const submitDue = async (req, res) => {
// middleware multer sudah menaruh file di req.file
    const { amount, period } = req.body;
    const dueData = { user: req.user._id, amount: +amount, period };
    if (req.file) dueData.proof = req.file.path;
    const due = await Due.create(dueData);
    res.status(201).json(due);
};

const listDues = async (req, res) => {
// jika admin, tampil semua; jika member tampil miliknya
    if (req.user.role === 'admin' || req.user.role === 'treasurer') {
        const dues = await Due.find().populate('user', 'name email');
        return res.json(dues);
    }
    const dues = await Due.find({ user: req.user._id });
    res.json(dues);
};

const approveDue = async (req, res) => {
    const due = await Due.findById(req.params.id);
    if (!due) return res.status(404).json({ message: 'Not found' });
    due.status = req.body.status || 'approved';
    await due.save();
    // saat approve, tambahkan ke finance report sebagai income
    if (due.status === 'approved') {
        await FinanceReport.create({ type: 'income', description: `Dues from ${due.user}`, amount: due.amount, createdBy: req.user._id });
    }
    res.json(due);
};

const rejectDue = async (req, res) => {
    try {
        const due = await Due.findById(req.params.id);
        if (!due) return res.status(404).json({ message: 'Not found' });

        due.status = 'rejected';
        await due.save();

        res.json(due);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { upload, submitDue, listDues, approveDue, rejectDue };