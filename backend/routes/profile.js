const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/profileController');

router.use(auth); // hanya perlu login

router.get('/', getProfile);
router.patch('/', updateProfile);
router.patch('/password', changePassword);

module.exports = router;
