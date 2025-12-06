const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  folderName: { 
    type: String, 
    required: true 
  },
  
  // Hierarchy
  parentFolder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Folder',
    default: null  // null = root folder
  },
  
  // Ownership
  owner: { 
    type: String,  // Supabase user ID
    required: true,
    index: true
  },
  
  // Sharing
  sharedWith: [{
    userId: String,
    permission: { 
      type: String, 
      enum: ['view', 'edit'],
      default: 'view'
    }
  }],
  isPublic: { type: Boolean, default: false },
  
  // UI customization
  color: String,
  icon: String,
  
  // Soft delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}, { 
  timestamps: true 
});

folderSchema.index({ owner: 1, isDeleted: 1 });
folderSchema.index({ parentFolder: 1 });

module.exports = mongoose.model('Folder', folderSchema);
