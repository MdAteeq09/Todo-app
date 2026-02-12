'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { TaskList } from '@/components/dashboard/task-list';
import { TaskFilters } from '@/components/dashboard/task-filters';
import { Header } from '@/components/dashboard/header';
import { TaskForm } from '@/components/dashboard/task-form';
import type { Task, Priority } from '@/lib/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getCompletionSuggestions } from '@/actions/tasks';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { tasks, loading } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [completionSuggestions, setCompletionSuggestions] = useState<Map<string, string>>(new Map());
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const { toast } = useToast();

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

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (statusFilter === 'all') return true;
        return statusFilter === 'completed' ? task.isComplete : !task.isComplete;
      })
      .filter(task => {
        if (priorityFilter === 'all') return true;
        return task.priority === priorityFilter;
      })
      .filter(task => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [tasks, statusFilter, priorityFilter, searchTerm]);
  
  const handleGetSuggestions = async () => {
    setIsSuggestionLoading(true);
    const result = await getCompletionSuggestions(tasks);
    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: result.error,
      });
    } else {
      const newSuggestions = new Map<string, string>();
      result.forEach(suggestion => {
        newSuggestions.set(suggestion.taskId, suggestion.reason);
      });
      setCompletionSuggestions(newSuggestions);
      if(result.length > 0) {
        toast({
          title: 'AI Suggestions Ready',
          description: `Found ${result.length} tasks you might be able to mark as complete.`,
        });
      } else {
        toast({
          title: 'AI Suggestions',
          description: 'Looks like all your tasks are up to date!',
        });
      }
    }
    setIsSuggestionLoading(false);
  };

  return (
    <div className="flex flex-col h-screen pb-16 md:pb-0">
      <Header
        onNewTask={() => {
          setEditingTask(null);
          setIsFormOpen(true);
        }}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Your Tasks</h1>
            <Button onClick={handleGetSuggestions} disabled={isSuggestionLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isSuggestionLoading ? 'Analyzing...' : 'AI Suggestions'}
            </Button>
          </div>
          <TaskFilters
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
          />
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onEditTask={handleEditTask}
            completionSuggestions={completionSuggestions}
          />
        </div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <TaskForm
            task={editingTask}
            onSuccess={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
