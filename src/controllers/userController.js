const db = require("../config/db");

exports.getUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
            [name, email, role]
        );
        res.json({ id: result.insertId, name, email, role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
