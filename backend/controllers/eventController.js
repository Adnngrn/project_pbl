const Event = require('../models/Event');

// tambah event baru
const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, status, category } = req.body;

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      status,
      category,
      createdBy: req.user._id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// list semua event, bisa filter pakai query ?category=sosial
const listEvents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const events = await Event.find(filter).populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// detail event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update event
const updateEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, status, category } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, startDate, endDate, status, category },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// hapus event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEvent, listEvents, getEvent, updateEvent, deleteEvent };
