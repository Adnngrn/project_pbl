const Event = require('../models/Event');

const createEvent = async (req, res) => {
    const payload = { ...req.body, createdBy: req.user._id };
    const event = await Event.create(payload);
    res.status(201).json(event);
};

const listEvents = async (req, res) => {
    const events = await Event.find().populate('createdBy', 'name email');
    res.json(events);
};

const getEvent = async (req, res) => {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    res.json(ev);
};

const updateEvent = async (req, res) => {
    const ev = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ev);
};

const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
};

module.exports = { createEvent, listEvents, getEvent, updateEvent, deleteEvent };