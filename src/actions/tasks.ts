'use server';

import { smartTaskPrioritizationSuggestion } from '@/ai/flows/smart-task-prioritization-suggestion';
import { smartTaskCompletionSuggestion } from '@/ai/flows/smart-task-completion-suggestion';
import type { Task, Priority } from '@/lib/types';

export async function getPrioritySuggestion(title: string, description: string): Promise<{ suggestedPriority: Priority, reasoning: string} | { error: string }> {
  if (!title && !description) {
    return { error: 'Title or description is required to suggest a priority.' };
  }
  try {
    const result = await smartTaskPrioritizationSuggestion({ title, description });
    return {
      suggestedPriority: result.suggestedPriority.toLowerCase() as Priority,
      reasoning: result.reasoning,
    };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get priority suggestion.' };
  }
}

export async function getCompletionSuggestions(tasks: Task[]): Promise<{ taskId: string; reason: string }[] | { error: string }> {
  try {
    const suggestions = await Promise.all(
      tasks
        .filter(task => !task.isComplete)
        .map(async (task) => {
          const result = await smartTaskCompletionSuggestion({ currentTask: task, allTasks: tasks });
          if (result.shouldMarkAsComplete) {
            return { taskId: task.id, reason: result.reason };
          }
          return null;
        })
    );
    return suggestions.filter(Boolean) as { taskId: string, reason: string }[];
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get completion suggestions.' };
  }
}
