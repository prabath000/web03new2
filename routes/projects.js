const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects - Create a new project
router.post('/', async (req, res) => {
  try {
    const { title, description, status, image, image2, image3, image4, image5, githubUrl } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    const project = new Project({
      title,
      description,
      status: status || 'progress',
      image: image || '',
      image2: image2 || '',
      image3: image3 || '',
      image4: image4 || '',
      image5: image5 || '',
      githubUrl: githubUrl || ''
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;