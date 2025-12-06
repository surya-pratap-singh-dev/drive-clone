const express = require('express');
const router = express.Router();
const File = require('../models/files.model');
const Activity = require('../models/activity.model');

// Save file metadata
router.post('/save-file', async (req, res) => {
  try {
    const { fileName, fileUrl, filePath, fileSize, fileType, uploadedBy } = req.body;
    
    const newFile = new File({
      fileName,
      originalName: fileName,
      fileUrl,
      filePath,
      fileSize,
      fileType,
      uploadedBy
    });
    
    await newFile.save();
    
    // Log activity
    await Activity.create({
      userId: uploadedBy,
      action: 'upload',
      file: newFile._id
    });
    
    res.json({ success: true, file: newFile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user files
router.get('/user-files/:userId', async (req, res) => {
  try {
    const files = await File.find({ 
      uploadedBy: req.params.userId,
      isDeleted: false
    })
    .populate('folder', 'folderName')
    .sort({ createdAt: -1 });
    
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search files
router.get('/search', async (req, res) => {
  try {
    const { query, userId } = req.query;
    
    const files = await File.find({
      uploadedBy: userId,
      isDeleted: false,
      $text: { $search: query }
    }).sort({ score: { $meta: 'textScore' } });
    
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Track download
router.post('/download/:fileId', async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.fileId,
      { 
        $inc: { downloadCount: 1 },
        lastAccessed: new Date()
      },
      { new: true }
    );
    
    // Log activity
    await Activity.create({
      userId: req.body.userId,
      action: 'download',
      file: req.params.fileId
    });
    
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Soft delete
router.delete('/delete/:fileId', async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.fileId,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Toggle favorite
router.post('/favorite/:fileId', async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    file.isFavorite = !file.isFavorite;
    await file.save();
    
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
