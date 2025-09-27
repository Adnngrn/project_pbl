// routes/users.js
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const {
  list,
  getUser,
  approveUser,
  updateUser,
  deleteUser,
  updateUserStatus
} = require('../controllers/userController');

// Semua route di bawah ini hanya untuk role "admin"
router.use(authorize(['admin']));

// Routes
router.get('/', list);
router.get('/:id', getUser);
router.put('/:id/approve', approveUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/status', updateUserStatus);


module.exports = router;
