const express = require("express");
const QRCode = require("qrcode");
const db = require("../config");

const router = express.Router();

// Generate QR Code
router.get("/generate-qr", async (req, res) => {
    const qrData = JSON.stringify({ timestamp: new Date().toISOString() });
    const qrImage = await QRCode.toDataURL(qrData);
    res.json({ qrImage });
});

// Mark Attendance
router.post("/mark-attendance", async (req, res) => {
    const { studentId } = req.body;
    const sql = "INSERT INTO attendance (student_id) VALUES (?)";

    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Attendance marked successfully" });
    });
});

module.exports = router;
