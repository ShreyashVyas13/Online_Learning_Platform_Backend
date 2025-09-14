// // models/Blog.js
// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     desc: { type: String, required: true },
//     category: { type: String, required: true },
//     author: { type: String, required: true },
//     date: { type: String, required: true },
//     image: { type: String, required: true }, // store file path or URL
//   },
//   { timestamps: true }
// );

// const Blog = mongoose.model("Blog", blogSchema);
// export default Blog;

// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     desc: { type: String, required: true },
//     category: { type: String, required: true },
//     author: { type: String, required: true },
//     date: { type: String, required: true },
//     image: { type: String, required: true }, // store filename
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Blog", blogSchema);

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true }, // store filename
    content: String,       // main content (HTML)
    extra: String,         // extra details
    tags: [String],        // array of tags
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
