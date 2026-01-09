const LOCAL_STORAGE_KEY = 'demo_projects';

// Helper to get local demo data
function getLocalDemoData() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

// Helper to save local demo data
function saveLocalDemoData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export async function getProjects() {
    // Always use local storage (Demo Mode)
    let projects = getLocalDemoData();
    
    if (projects) {
        return projects;
    }

    // If empty, load from JSON and save to local storage
    try {
        const response = await fetch('data/projects.json');
        projects = await response.json();
        saveLocalDemoData(projects);
        return projects;
    } catch (jsonError) {
        console.error("Error loading local JSON:", jsonError);
        return [];
    }
}

export async function createProject(projectData) {
    // Always use local storage (Demo Mode)
    const projects = await getProjects();
    const newProject = {
        id: 'demo-' + Date.now(),
        ...projectData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    };
    projects.unshift(newProject);
    saveLocalDemoData(projects);
    return newProject;
}

export async function deleteProject(id) {
    // Always use local storage (Demo Mode)
    let projects = await getProjects();
    const idString = id.toString();
    projects = projects.filter(p => (p._id || p.id).toString() !== idString);
    saveLocalDemoData(projects);
    return true;
}

// Seed database with local JSON data
export async function seedDatabase() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        // Save to local storage
        saveLocalDemoData(projects);
        
        alert(`Successfully loaded ${projects.length} projects!`);
        return true;
    } catch (error) {
        console.error("Error seeding data:", error);
        alert("Error loading data: " + error.message);
    }
}

// Always return false since we're using demo mode
export function isFirebaseConfigured() {
    return false;
}

// Fetch GitHub repository's last updated date
export async function getGithubLastUpdated(githubUrl) {
    if (!githubUrl) return null;
    
    try {
        // Extract owner and repo from URL
        const urlParts = githubUrl.replace('https://github.com/', '').replace('.git', '').split('/');
        if (urlParts.length < 2) return null;
        
        const owner = urlParts[0];
        const repo = urlParts[1];
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) return null;
        
        const data = await response.json();
        return data.updated_at;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return null;
    }
}
