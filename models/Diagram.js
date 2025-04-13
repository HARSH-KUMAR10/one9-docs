const mongoose = require("mongoose");

const DiagramSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
  title: { type: String, required: true },
  data: { type: Object, required: true }, // JSON format of diagram
});

module.exports = mongoose.model("Diagram", DiagramSchema);
