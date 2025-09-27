const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const {
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
} = require('../controllers/donationController');

// === Program Donasi ===
router.post('/program', authorize(['admin']), createProgram);
router.put('/program/:id', authorize(['admin']), updateProgram);
router.delete('/program/:id', authorize(['admin']), deleteProgram);
router.get('/program', listPrograms); // publik bisa lihat semua program
router.get('/program/:id', getProgramDetail); // detail program + donasi approved

// === Donasi ===
router.post('/', authorize(['member']), upload.single('proof'), submitDonation);
router.get('/', authorize(['admin', 'member']), listDonations);
router.put('/:id/approve', authorize(['admin']), approveDonation);
router.put('/:id/reject', authorize(['admin']), rejectDonation);

module.exports = router;
