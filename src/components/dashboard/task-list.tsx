'use client';

import { TaskCard } from './task-card';
import type { Task } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Frown } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEditTask: (task: Task) => void;
  completionSuggestions: Map<string, string>;
}

export function TaskList({ tasks, loading, onEditTask, completionSuggestions }: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No tasks found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or creating a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          suggestionReason={completionSuggestions.get(task.id)}
        />
      ))}
    </div>
  );
}
