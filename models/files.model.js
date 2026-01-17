const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  // Basic info i.e., info about filename original file if has been replaced file url  path of file 
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  filePath: { type: String, required: true },
  
  // File details i.e, it stores the file size and the type of file which has beeen uploaded that is image video or textt
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  mimeType: String,
  
  // Ownership i.e, who owns the drive account user info
  uploadedBy: { type: String, required: true, index: true }, // Supabase user ID
  
  // Organization
  folder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Folder',
    default: null 
  },
  tags: [{ type: String, lowercase: true }],
  
  // Sharing & permissions i.e, this allows user to share the file access to other people and permission to read, edit or chnage the ownership 
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
  
  // User preferences i.e., this stores the info about users favorite or important file using is favotire and starred function
  isFavorite: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  color: String,
  
  // Activity tracking i.e., to keep track of how many files is downloaded etc.
  downloadCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  lastAccessed: Date,
  lastModified: Date,
  
  // Metadata i.e., it stores extra info for file
  description: String,
  version: { type: Number, default: 1 },
  
  // Soft delete i.e; instead of removing file from db we mark it as deleted so it can be restored
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,
  
  // Thumbnail for images/videos for preview
  thumbnailUrl: String
}, { 
  timestamps: true  // createdAt, updatedAt 
});

// Indexes for performance for searching and filtering
fileSchema.index({ uploadedBy: 1, isDeleted: 1 });
fileSchema.index({ folder: 1 });
fileSchema.index({ createdAt: -1 });
fileSchema.index({ fileName: 'text', tags: 'text', description: 'text' });

module.exports = mongoose.model('File', fileSchema);
