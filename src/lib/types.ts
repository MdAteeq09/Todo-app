export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Task = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isComplete: boolean;
  startDate?: string; // ISO string format
  endDate?: string; // ISO string format
  priority: Priority;
  category?: string;
  createdAt?: number; // Unix timestamp
};

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};
