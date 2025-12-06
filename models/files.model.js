const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  // Basic info
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  filePath: { type: String, required: true },
  
  // File details
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  mimeType: String,
  
  // Ownership
  uploadedBy: { type: String, required: true, index: true }, // Supabase user ID
  
  // Organization
  folder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Folder',
    default: null 
  },
  tags: [{ type: String, lowercase: true }],
  
  // Sharing & permissions
  sharedWith: [{
    userId: String,
    permission: { 
      type: String, 
      enum: ['view', 'edit', 'owner'],
      default: 'view'
    },
    sharedAt: { type: Date, default: Date.now }
  }],
  isPublic: { type: Boolean, default: false },
  publicLink: String,
  
  // User preferences
  isFavorite: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  color: String,
  
  // Activity tracking
  downloadCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  lastAccessed: Date,
  lastModified: Date,
  
  // Metadata
  description: String,
  version: { type: Number, default: 1 },
  
  // Soft delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,
  
  // Thumbnail for images/videos
  thumbnailUrl: String
}, { 
  timestamps: true  // createdAt, updatedAt
});

// Indexes for performance
fileSchema.index({ uploadedBy: 1, isDeleted: 1 });
fileSchema.index({ folder: 1 });
fileSchema.index({ createdAt: -1 });
fileSchema.index({ fileName: 'text', tags: 'text', description: 'text' });

module.exports = mongoose.model('File', fileSchema);
