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

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { user_id, doctor_id, appointment_date, updatedBy } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE appointments 
       SET user_id = ?, doctor_id = ?, appointment_date = ?, updatedDate = NOW(), updatedBy = ?
       WHERE id = ? AND isActive = 1`,
      [user_id, doctor_id, appointment_date, updatedBy, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found or inactive" });
    }

    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
