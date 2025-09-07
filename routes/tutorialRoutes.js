// backend/routes/tutorialRoutes.js
import express from "express";
import Tutorial from "../models/Tutorial.js";

const router = express.Router();

// Get all tutorials
router.get("/", async (req, res) => {
  const tutorials = await Tutorial.find();
  res.json(tutorials);
});

// Add new tutorial
router.post("/", async (req, res) => {
  const newTutorial = new Tutorial(req.body);
  await newTutorial.save();
  res.json(newTutorial);
});

// Delete tutorial
router.delete("/:id", async (req, res) => {
  await Tutorial.findByIdAndDelete(req.params.id);
  res.json({ message: "Tutorial deleted" });
});

// Update tutorial
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating:", id);

    const updated = await Tutorial.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Tutorial not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
