const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { createEvent, listEvents, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController');


// public list
router.get('/', listEvents);
router.get('/:id', getEvent);


// authenticated actions
router.post('/', auth, roles(['admin']), createEvent);
router.put('/:id', auth, roles(['admin']), updateEvent);
router.delete('/:id', auth, roles(['admin']), deleteEvent);


module.exports = router;