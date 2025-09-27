const path = require('path');
const multer = require('multer');
const Donation = require('../models/Donation');
const DonationProgram = require('../models/DonationProgram');

// === multer setup untuk bukti upload ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR || 'uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ==================== PROGRAM ====================

// Admin buat program donasi
const createProgram = async (req, res) => {
  try {
    const { title, description, targetAmount } = req.body;
    const program = await DonationProgram.create({
      title,
      description,
      targetAmount,
    });
    res.status(201).json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Semua user lihat daftar program
const listPrograms = async (req, res) => {
  try {
    const programs = await DonationProgram.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Detail program + daftar donasi approved & pending
const getProgramDetail = async (req, res) => {
  try {
    const program = await DonationProgram.findById(req.params.id).lean();
    if (!program) return res.status(404).json({ message: 'Program not found' });

    // Ambil semua donasi terkait program ini (hanya approved & pending)
    const donations = await Donation.find({
      program: program._id,
      status: { $in: ['approved', 'pending'] },
    })
      .populate('user', 'name email')
      .lean();

    const approved = donations
      .filter(d => d.status === 'approved')
      .map(d => ({
        _id: d._id,
        name: d.user.name,
        email: d.user.email,
        amount: d.amount,
        date: d.createdAt,
        status: d.status,
        proof: d.proof // ✅ Tambahkan ini
      }));

    const pending = donations
      .filter(d => d.status === 'pending')
      .map(d => ({
        _id: d._id,
        name: d.user.name,
        email: d.user.email,
        amount: d.amount,
        date: d.createdAt,
        status: d.status,
        proof: d.proof // ✅ Tambahkan ini
      }));


    // Gabungkan dan kirim
    res.json({
      ...program,
      approvedDonations: approved,
      pendingDonations: pending,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Program
const updateProgram = async (req, res) => {
  try {
    const program = await DonationProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Program
const deleteProgram = async (req, res) => {
  try {
    const program = await DonationProgram.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ==================== DONASI ====================

// Member submit donasi
const submitDonation = async (req, res) => {
  try {
    const { programId, amount } = req.body;

    const program = await DonationProgram.findById(programId);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    if (program.status === 'closed')
      return res.status(400).json({ message: 'Program sudah ditutup' });

    const donationData = {
      program: programId,
      user: req.user._id,
      amount: +amount,
    };

    if (req.file) {
      donationData.proof = req.file.filename; // hanya simpan "1758870329925.png"
    }



    const donation = await Donation.create(donationData);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: lihat semua donasi, Member: lihat donasi sendiri
const listDonations = async (req, res) => {
  try {
    let donations;
    if (req.user.role === 'admin') {
      donations = await Donation.find()
        .populate('user', 'name email')
        .populate('program', 'title');
    } else {
      donations = await Donation.find({ user: req.user._id }).populate(
        'program',
        'title'
      );
    }
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin approve donasi
const approveDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('program');
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.status = 'approved';
    await donation.save();

    donation.program.collectedAmount += donation.amount;
    await donation.program.save();

    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin reject donasi
const rejectDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.status = 'rejected';
    await donation.save();

    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  upload,
  createProgram,
  listPrograms,
  getProgramDetail,
  submitDonation,
  listDonations,
  approveDonation,
  rejectDonation,
  updateProgram,
  deleteProgram
};
