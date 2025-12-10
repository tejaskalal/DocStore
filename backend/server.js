import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

import upload from "./upload.js";
import Document from "./models/document.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("DocStore backend is running...");
});

app.post("/documents/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { documentName, documentType, description } = req.body;

    const doc = await Document.create({
      documentName,
      documentType,
      description,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
    });

    res.json({
      message: "PDF uploaded successfully",
      document: doc,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/documents", async (req, res, next) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

app.get("/documents/:id", async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    res.download(path.resolve(doc.path), doc.originalName);
  } catch (err) {
    next(err);
  }
});

app.delete("/documents/:id", async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    fs.unlink(doc.path, (err) => {
      if (err) console.log("File delete error:", err);
    });

    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({ error: "Only PDF files are allowed" });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File size exceeds 10MB" });
  }

  return res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
