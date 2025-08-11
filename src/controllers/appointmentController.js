const db = require("../config/db");

exports.getAppointments = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM appointments WHERE isActive = 1");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAppointment = async (req, res) => {
    const { user_id, doctor_id, appointment_date } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO appointments (user_id, doctor_id, appointment_date, createdBy) VALUES (?, ?, ?, ?)",
            [user_id, doctor_id, appointment_date, "system"]
        );
        res.json({ id: result.insertId, user_id, doctor_id, appointment_date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.softDeleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            "UPDATE appointments SET isActive = 0, deletedDate = NOW(), deletedBy = ? WHERE id = ?",
            ["system", id]
        );
        res.json({ message: "Appointment soft deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
