import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from './config';
import type { Task } from '@/lib/types';

export const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
  if (!db) {
    return Promise.reject(new Error('Firestore is not initialized.'));
  }
  const tasksCollection = collection(db, 'tasks');
  return addDoc(tasksCollection, {
    ...taskData,
    createdAt: serverTimestamp(),
  });
};

export const updateTask = (taskId: string, updates: Partial<Task>) => {
  if (!db) {
    return Promise.reject(new Error('Firestore is not initialized.'));
  }
  const taskDoc = doc(db, 'tasks', taskId);
  return updateDoc(taskDoc, updates);
};

export const deleteTask = (taskId: string) => {
  if (!db) {
    return Promise.reject(new Error('Firestore is not initialized.'));
  }
  const taskDoc = doc(db, 'tasks', taskId);
  return deleteDoc(taskDoc);
};

export const getTasks = (userId: string) => {
    if (!db) {
        return Promise.reject(new Error('Firestore is not initialized.'));
    }
    const tasksCollection = collection(db, 'tasks');
    const q = query(tasksCollection, where("userId", "==", userId));
    return getDocs(q);
}
