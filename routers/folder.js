const express = require("express");
const Folder = require("../models/Folder");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Folder
router.post("/", authMiddleware, async (req, res) => {
  try {
    const folder = new Folder({ userId: req.userId, name: req.body.name });
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: "Error creating folder" });
  }
});

// Get User Folders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.userId });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching folders" });
  }
});

module.exports = router;
