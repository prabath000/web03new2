const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to local projects JSON file
const projectsFile = path.join(__dirname, '..', 'data', 'projects.json');

// Helper function to read projects
const readProjects = () => {
  if (fs.existsSync(projectsFile)) {
    try {
      const data = fs.readFileSync(projectsFile, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [];
};

// Helper function to save projects
const saveProjects = (projects) => {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
};

// GET /api/projects - Get all projects
router.get('/', (req, res) => {
  try {
    const projects = readProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects - Create a new project
router.post('/', (req, res) => {
  try {
    const { title, description, status, image, image2, image3, image4, image5, githubUrl } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    const projects = readProjects();
    
    const newProject = {
      id: Date.now().toString(),
      title,
      description: description || '',
      status: status || 'progress',
      image: image || '',
      image2: image2 || '',
      image3: image3 || '',
      image4: image4 || '',
      image5: image5 || '',
      githubUrl: githubUrl || '',
      createdAt: new Date().toISOString()
    };

    projects.unshift(newProject);
    saveProjects(projects);

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    let projects = readProjects();
    const filteredProjects = projects.filter(p => p.id !== id);

    if (projects.length === filteredProjects.length) {
      return res.status(404).json({ message: 'Project not found' });
    }

    saveProjects(filteredProjects);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
