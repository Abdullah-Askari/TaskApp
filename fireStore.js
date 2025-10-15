import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
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
export const getTasks = (callback) => {
try {
const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
const unsubscribe = onSnapshot(q, (snapshot) => {
const tasks = snapshot.docs.map((docSnap) => ({
id: docSnap.id,
...docSnap.data(),
}));
callback(tasks);
});
return unsubscribe;
} catch (error) {
console.error('Error getting tasks:', error);
return () => {};
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