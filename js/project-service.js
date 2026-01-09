/**
 * Project Service - Handles loading projects from JSON data
 */

export async function getProjects() {
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}
