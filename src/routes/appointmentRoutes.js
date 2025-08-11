const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/", appointmentController.getAppointments);
router.post("/", appointmentController.createAppointment);
router.put("/soft-delete/:id", appointmentController.softDeleteAppointment);

module.exports = router;
