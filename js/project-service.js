import { db, firebaseConfig } from './firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const COLLECTION_NAME = 'projects';
const LOCAL_STORAGE_KEY = 'demo_projects';

export function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "AIzaSyBtY_74ZZWTCd5wKmt39nIUC00kvv13Ta8";
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
        alert("Error saving to database: " + e.message);
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
