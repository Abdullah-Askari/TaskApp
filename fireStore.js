import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { db } from './firbaseConfig';

export const validateTask = (task) => {
  if (!task.title || task.title.trim() === '') {
    return { valid: false, message: 'Title is required' };
  }
  return { valid: true };
};

export const addTask = async (task) => {
  try {
    const validation = validateTask(task);
    if (!validation.valid) {
      return { success: false, error: validation.message };
    }

    const tasksRef = collection(db, 'tasks');
    const docRef = await addDoc(tasksRef, {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to add task to database',
    };
  }
};

export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasks = [];
    querySnapshot.forEach((docSnap) => {
      tasks.push({ id: docSnap.id, ...docSnap.data() });
    });
    return { success: true, tasks };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const validation = validateTask(updatedTask);
    if (!validation.valid) {
      return { success: false, error: validation.message };
    }

    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, {
      ...updatedTask,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteTask = async (id) => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const searchTasks = async (searchTerm) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasks = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        tasks.push({ id: docSnap.id, ...data });
      }
    });
    return { success: true, tasks };
  } catch (error) {
    return { success: false, error: error.message };
  }
};