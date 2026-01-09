const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'progress'
  },
  image: {
    type: String,
    default: ''
  },
  image2: {
    type: String,
    default: ''
  },
  image3: {
    type: String,
    default: ''
  },
  image4: {
    type: String,
    default: ''
  },
  image5: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
