const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { list, getUser, approveUser, updateUser, deleteUser } = require('../controllers/userController');


router.use(auth);
router.get('/', roles(['admin']), list);
router.get('/:id', roles(['admin']), getUser);
router.put('/:id/approve', roles(['admin']), approveUser);
router.put('/:id', roles(['admin']), updateUser);
router.delete('/:id', roles(['admin']), deleteUser);


module.exports = router;