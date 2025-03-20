const express = require("express");
const db = require("../config");

const router = express.Router();

// Get Equipment Status
router.get("/", (req, res) => {
    db.query("SELECT * FROM equipment", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update Equipment Status
router.put("/:id", (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE equipment SET status = ? WHERE id = ?";

    db.query(sql, [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Equipment updated successfully" });
    });
});

module.exports = router;
