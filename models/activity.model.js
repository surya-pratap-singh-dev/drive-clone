const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { 
    type: String,  // Supabase user ID
    required: true,
    index: true
  },
  
  action: { 
    type: String,
    enum: ['upload', 'download', 'delete', 'share', 'rename', 'move', 'favorite'],
    required: true
  },
  
  file: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'File'
  },
  
  folder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Folder'
  },
  
  details: mongoose.Schema.Types.Mixed,  // Extra info about action
  
  ipAddress: String,
  userAgent: String
}, { 
  timestamps: true 
});

activitySchema.index({ userId: 1, createdAt: -1 });
activitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // Auto-delete after 90 days

module.exports = mongoose.model('Activity', activitySchema);
