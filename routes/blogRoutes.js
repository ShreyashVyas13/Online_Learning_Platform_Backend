// // routes/blogRoutes.js
// import express from "express";
// import Blog from "../models/Blog.js";

// const router = express.Router();

// // ✅ Get all blogs
// router.get("/", async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Add a new blog (admin panel will call this)
// router.post("/", async (req, res) => {
//   const { title, desc, category, author, date, image } = req.body;
//   try {
//     const blog = new Blog({ title, desc, category, author, date, image });
//     await blog.save();
//     res.status(201).json(blog);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Get a single blog by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Update a blog
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Delete a blog
// router.delete("/:id", async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.json({ message: "Blog deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// ✅ Add blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to add blog" });
  }
});

// ✅ Update blog
router.put("/:id", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// ✅ Delete blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// Get single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});


export default router;