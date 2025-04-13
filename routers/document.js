const express = require("express");
const Document = require("../models/Document");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Document
router.post("/", authMiddleware, async (req, res) => {
  try {
    const document = new Document({
      userId: req.userId,
      folderId: req.body.folderId,
      title: req.body.title,
      content: req.body.content || "",
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating document" });
  }
});

// Get Documents in Folder
router.get("/:folderId", authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({
      userId: req.userId,
      folderId: req.params.folderId,
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { content, diagram } = req.body;
    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      { content, diagram },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(updatedDoc);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/content/:id", authMiddleware, async (req, res) => {
  try {
    const document = await Document.findOne({
      userId: req.userId,
      _id: req.params.id,
    });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});
module.exports = router;
