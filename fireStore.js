import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc
} from 'firebase/firestore';
import { db } from './firbaseConfig';

export const validateTask = (task) => {
    if (!task.title || task.title.trim() === '') {
        return { valid: false, message: 'Title is required' };
    }
    return { valid: true };
}

export const addTask = async (task) => {
    try {
        const validation = validateTask(task);
        if (!validation.valid) {
            return { success: false, error: validation.message };
        }

        console.log('Attempting to add task to Firestore:', task); // Debug log

        // Add document to Firestore
        const tasksRef = collection(db, 'tasks');
        const docRef = await addDoc(tasksRef, {
            ...task,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        console.log('Task added successfully with ID:', docRef.id); // Debug log
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding task to Firestore:', error); // Debug log
        return { 
            success: false, 
            error: error.message || 'Failed to add task to database'
        };
    }
}

export const getTasks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, tasks };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const updateTask = async (id, updatedTask) => {
    try {
        validateTask(updatedTask);
        const taskRef = doc(db, 'tasks', id);
        await updateDoc(taskRef, updatedTask);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const deleteTask = async (id) => {
    try {
        await deleteDoc(doc(db, 'tasks', id));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}