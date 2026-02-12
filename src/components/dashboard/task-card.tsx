'use client';

import { format, parseISO } from 'date-fns';
import { MoreHorizontal, Calendar, Flag, Tag, Trash2, Edit, Check, Lightbulb } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import type { Task, Priority } from '@/lib/types';
import { cn } from '@/lib/utils';
import { updateTask, deleteTask } from '@/lib/firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFirestore, useUser } from '@/firebase';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  suggestionReason?: string;
}

const priorityStyles: Record<Priority, string> = {
  urgent: 'bg-red-500 text-white',
  high: 'bg-yellow-500 text-black',
  medium: 'bg-blue-500 text-white',
  low: 'bg-green-500 text-white',
};

export function TaskCard({ task, onEdit, suggestionReason }: TaskCardProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const handleToggleComplete = () => {
    if (!user) return;
    updateTask(firestore, user.uid, task.id, { isComplete: !task.isComplete });
    toast({
      title: `Task ${task.isComplete ? 're-opened' : 'completed!'}`,
      description: `"${task.title}" has been updated.`,
    });
  };

  const handleDelete = () => {
    if (!user) return;
    deleteTask(firestore, user.uid, task.id);
    toast({
      title: 'Task deleted',
      description: `"${task.title}" has been successfully deleted.`,
    });
  };

  return (
    <Card className={cn('transition-all hover:shadow-md', task.isComplete && 'bg-muted/50')}>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.isComplete}
            onCheckedChange={handleToggleComplete}
            className="h-5 w-5"
          />
        </div>
        <div className="flex-1">
          <p
            className={cn(
              'font-medium text-base',
              task.isComplete && 'line-through text-muted-foreground'
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
            {(task.startDate || task.endDate) && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {task.startDate ? format(parseISO(task.startDate), 'MMM d') : '...'}
                  {' - '}
                  {task.endDate ? format(parseISO(task.endDate), 'MMM d, yyyy') : '...'}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Flag className="h-3 w-3" />
              <Badge variant="outline" className={cn('capitalize', priorityStyles[task.priority])}>
                {task.priority}
              </Badge>
            </div>
            {task.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span>{task.category}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
            {suggestionReason && !task.isComplete && (
               <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500 hover:text-yellow-600" onClick={handleToggleComplete}>
                            <Lightbulb className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="max-w-xs">AI Suggestion: {suggestionReason}</p>
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your task
                        "{task.title}".
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
