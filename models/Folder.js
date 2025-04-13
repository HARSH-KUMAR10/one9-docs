const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  diagrams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diagram" }],
});

module.exports = mongoose.model("Folder", FolderSchema);
