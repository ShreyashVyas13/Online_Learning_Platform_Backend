// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tutorialRoutes from "./routes/tutorialRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tutorialDB");

app.use("/api/tutorials", tutorialRoutes);
app.use("/api/blogs", blogRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));

app.use("/api/tutorials", tutorialRoutes);
// console.log("Updating:", `/tutorials/${id}`);
