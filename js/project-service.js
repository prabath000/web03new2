import { db, firebaseConfig } from './firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const COLLECTION_NAME = 'projects';
const LOCAL_STORAGE_KEY = 'demo_projects';

export function isFirebaseConfigured() {
    // Check if the apiKey is not the default placeholder
    return firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "";
}

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
    try {
        if (!isFirebaseConfigured()) {
            console.warn("Firebase not configured. Using Local Storage Demo Mode.");
            
            // Check local storage first
            let projects = getLocalDemoData();
            if (projects) {
                return projects;
            }

            // If empty, load from JSON and save to local storage
            const response = await fetch('data/projects.json');
            projects = await response.json();
            saveLocalDemoData(projects);
            return projects;
        }

        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
             return [];
        }

        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting projects: ", error);
        // Fallback to local JSON on error
        const response = await fetch('data/projects.json');
        return await response.json();
    }
}

export async function createProject(projectData) {
    if (!isFirebaseConfigured()) {
        console.warn("Firebase not configured. Saving to Local Storage (Demo Mode).");
        const projects = await getProjects();
        const newProject = { 
            id: 'demo-' + Date.now(), 
            ...projectData,
            createdAt: new Date().toISOString() 
        };
        projects.unshift(newProject);
        saveLocalDemoData(projects);
        return newProject;
    }

    try {
        const now = Timestamp.now();
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...projectData,
            createdAt: now
        });
        console.log("Document written with ID: ", docRef.id);
        return { 
            id: docRef.id, 
            ...projectData,
            createdAt: now.toDate().toISOString()
        };
    } catch (e) {
        console.error("Error adding document: ", e);
        
        if (e.code === 'permission-denied') {
             alert("Error: Permission Denied.\n\nIt looks like your Firestore Database rules are blocking writes.\n\nPlease go to Firebase Console > Firestore Database > Rules and allow read/write access (or switch to Test Mode).");
        } else {
             alert("Error saving to database: " + e.message);
        }
        throw e;
    }
}

export async function deleteProject(id) {
    if (!isFirebaseConfigured()) {
        console.warn("Firebase not configured. Deleting from Local Storage (Demo Mode).");
        let projects = await getProjects();
        // Filter out the project. Handle both string and number IDs comparison safely.
        projects = projects.filter(p => p.id.toString() !== id.toString());
        saveLocalDemoData(projects);
        return true;
    }

    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        console.log("Document successfully deleted!");
        return true;
    } catch (e) {
        console.error("Error removing document: ", e);
        alert("Error deleting: " + e.message);
        throw e;
    }
}

// 4. SEED: Upload local JSON data to Firebase (Run this once)
export async function seedDatabase() {
    try {
        // 1. Fetch the JSON file
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        console.log(`Found ${projects.length} projects to upload...`);
        
        // 2. Upload each project
        let count = 0;
        for (const project of projects) {
            // Remove the ID (let Firebase generate a new one)
            const { id, ...projectData } = project;
            
            await addDoc(collection(db, COLLECTION_NAME), {
                ...projectData,
                createdAt: Timestamp.now()
            });
            count++;
            console.log(`Uploaded: ${project.title}`);
        }
        
        alert(`Successfully uploaded ${count} projects to Firebase!`);
        return true;
    } catch (error) {
        console.error("Error seeding database:", error);
        alert("Error uploading data: " + error.message);
    }
}
