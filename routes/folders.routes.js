const express = require('express');
const router = express.Router();
const Folder = require('../models/folder.model');

// Create folder
router.post('/create', async (req, res) => {
  try {
    const { folderName, parentFolder, owner } = req.body;
    
    const newFolder = new Folder({
      folderName,
      parentFolder: parentFolder || null,
      owner
    });
    
    await newFolder.save();
    res.json({ success: true, folder: newFolder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user folders
router.get('/user-folders/:userId', async (req, res) => {
  try {
    const folders = await Folder.find({
      owner: req.params.userId,
      isDeleted: false
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, folders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
