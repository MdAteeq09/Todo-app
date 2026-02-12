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

const tasksCollection = collection(db, 'tasks');

export const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
  return addDoc(tasksCollection, {
    ...taskData,
    createdAt: Date.now(),
  });
};

export const updateTask = (taskId: string, updates: Partial<Task>) => {
  const taskDoc = doc(db, 'tasks', taskId);
  return updateDoc(taskDoc, updates);
};

export const deleteTask = (taskId: string) => {
  const taskDoc = doc(db, 'tasks', taskId);
  return deleteDoc(taskDoc);
};

export const getTasks = (userId: string) => {
    const q = query(tasksCollection, where("userId", "==", userId));
    return getDocs(q);
}
