const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { upload, submitDue, listDues, approveDue, rejectDue } = require('../controllers/dueController');


router.post('/', auth, upload.single('proof'), submitDue);
router.get('/', auth, listDues);
router.put('/:id/approve', auth, roles(['admin']), approveDue);
router.put('/:id/reject', auth, roles(['admin']), rejectDue);

module.exports = router;