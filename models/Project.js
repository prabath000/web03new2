const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['uploaded', 'progress', 'verification'],
    default: 'progress'
  },
  image: {
    type: String
  },
  image2: {
    type: String
  },
  image3: {
    type: String
  },
  image4: {
    type: String
  },
  image5: {
    type: String
  },
  githubUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);