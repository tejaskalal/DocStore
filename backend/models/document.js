import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentName: { type: String, required: true },
  documentType: { type: String, required: true },
  description: { type: String },

  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  size: { type: Number, required: true },
  path: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Document", documentSchema);
