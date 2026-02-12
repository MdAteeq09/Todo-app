'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { TaskList } from '@/components/dashboard/task-list';
import { TaskForm } from '@/components/dashboard/task-form';
import type { Task } from '@/lib/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function AllTasksPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const tasksQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'tasks'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);
  
  const { data: tasks, isLoading: loading } = useCollection<Task>(tasksQuery);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  useEffect(() => {
    const handleOpenDialog = () => {
      setEditingTask(null);
      setIsFormOpen(true);
    };
    window.addEventListener('open-new-task-dialog', handleOpenDialog);
    return () => window.removeEventListener('open-new-task-dialog', handleOpenDialog);
  }, []);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };
  
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">All Tasks</h1>
          </div>
          <TaskList
            tasks={tasks || []}
            loading={loading}
            onEditTask={handleEditTask}
            completionSuggestions={new Map()}
          />
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[425px]">
            <TaskForm
                task={editingTask}
                onSuccess={() => setIsFormOpen(false)}
            />
            </DialogContent>
        </Dialog>
    </main>
  );
}
