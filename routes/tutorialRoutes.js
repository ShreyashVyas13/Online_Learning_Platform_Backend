// backend/routes/tutorialRoutes.js
// import express from "express";
// import Tutorial from "../models/Tutorial.js";

// const router = express.Router();

// // Get all tutorials
// router.get("/", async (req, res) => {
//   const tutorials = await Tutorial.find();
//   res.json(tutorials);
// });

// // Add new tutorial
// router.post("/", async (req, res) => {
//   const newTutorial = new Tutorial(req.body);
//   await newTutorial.save();
//   res.json(newTutorial);
// });

// // Delete tutorial
// router.delete("/:id", async (req, res) => {
//   await Tutorial.findByIdAndDelete(req.params.id);
//   res.json({ message: "Tutorial deleted" });
// });

// // Update tutorial
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Updating:", id);

//     const updated = await Tutorial.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updated) {
//       return res.status(404).json({ error: "Tutorial not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get tutorial by link
// router.get("/link/:link", async (req, res) => {
//   try {
//     const tutorial = await Tutorial.findOne({ link: `/tutorial/${req.params.link}` });
//     if (!tutorial) return res.status(404).json({ error: "Tutorial not found" });
//     res.json(tutorial);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// export default router;


import express from "express";
import Tutorial from "../models/Tutorial.js";

const router = express.Router();

// Get all tutorials
router.get("/", async (req, res) => {
  const tutorials = await Tutorial.find();
  res.json(tutorials);
});

// ➕ Get tutorial by ID (needed for Edit page)
router.get("/:id", async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tutorial by link
router.get("/link/:link", async (req, res) => {
  try {
    const tutorial = await Tutorial.findOne({
      link: `/tutorial/${req.params.link}`,
    });
    if (!tutorial) return res.status(404).json({ error: "Tutorial not found" });
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new tutorial
router.post("/", async (req, res) => {
  const newTutorial = new Tutorial(req.body);
  await newTutorial.save();
  res.json(newTutorial);
});

// Update tutorial
router.put("/:id", async (req, res) => {
  try {
    const updated = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete tutorial
router.delete("/:id", async (req, res) => {
  await Tutorial.findByIdAndDelete(req.params.id);
  res.json({ message: "Tutorial deleted" });
});

export default router;
