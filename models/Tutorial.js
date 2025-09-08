// backend/models/Tutorial.js
import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true }, // icon name (e.g. "FaHtml5")
  link: { type: String, required: true },
  sections: [
    {
      title: String,       // "Introduction"
      content: String,     // description/content
    }
  ]
});

export default mongoose.model("Tutorial", tutorialSchema);
