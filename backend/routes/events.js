const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const { createEvent, listEvents, getEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

// admin bisa tambah/edit/hapus
router.get("/", listEvents); // semua bisa lihat list
router.get("/:id", getEvent);
router.post("/", authorize(["admin"]), createEvent);
router.put("/:id", authorize(["admin"]), updateEvent);
router.delete("/:id", authorize(["admin"]), deleteEvent);

module.exports = router;
