const db = require("../config/db");

exports.getDoctors = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM doctors");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDoctor = async (req, res) => {
    const { name, specialization } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO doctors (name, specialization) VALUES (?, ?)",
            [name, specialization]
        );
        res.json({ id: result.insertId, name, specialization });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
