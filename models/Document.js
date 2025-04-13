const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, default: "" }, // Markdown content
});

module.exports = mongoose.model("Document", DocumentSchema);
