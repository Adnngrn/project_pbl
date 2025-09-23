const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { addReport, listReports, summary } = require('../controllers/financeController');


router.get('/', auth, roles(['admin','treasurer']), listReports);
router.post('/', auth, roles(['admin','treasurer']), addReport);
router.get('/summary', auth, roles(['admin','treasurer','member']), summary);


module.exports = router;