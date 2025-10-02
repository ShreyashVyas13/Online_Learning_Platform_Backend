import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Save inquiry form data
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    res.status(201).json({ message: "Inquiry saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: Get all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});


export default router;