import {
  collection,
  doc,
  serverTimestamp,
  type Firestore,
  type User,
} from 'firebase/firestore';
import type { Task } from '@/lib/types';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase';

export const createUserProfile = (db: Firestore, user: User) => {
  const userProfileRef = doc(db, 'users', user.uid);
  const profileData = {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  setDocumentNonBlocking(userProfileRef, profileData, {});
};

export const createTask = (db: Firestore, taskData: Omit<Task, 'id' | 'createdAt'>) => {
  if (!taskData.userId) {
    console.error("User ID is missing, cannot create task.");
    return Promise.reject(new Error("User ID is missing."));
  }
  const tasksCollection = collection(db, 'users', taskData.userId, 'tasks');
  return addDocumentNonBlocking(tasksCollection, {
    ...taskData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateTask = (db: Firestore, userId: string, taskId: string, updates: Partial<Task>) => {
  const taskDoc = doc(db, 'users', userId, 'tasks', taskId);
  return updateDocumentNonBlocking(taskDoc, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTask = (db: Firestore, userId: string, taskId: string) => {
  const taskDoc = doc(db, 'users', userId, 'tasks', taskId);
  return deleteDocumentNonBlocking(taskDoc);
};
