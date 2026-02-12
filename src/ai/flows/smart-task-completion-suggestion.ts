'use server';
/**
 * @fileOverview A Genkit flow for suggesting task completion based on task description and other ongoing tasks.
 *
 * - smartTaskCompletionSuggestion - A function that suggests whether a task should be marked as complete.
 * - SmartTaskCompletionSuggestionInput - The input type for the smartTaskCompletionSuggestion function.
 * - SmartTaskCompletionSuggestionOutput - The return type for the smartTaskCompletionSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskSchema = z.object({
  id: z.string().describe('The unique ID of the task.'),
  title: z.string().describe('The title of the task.'),
  description: z.string().optional().describe('The detailed description of the task.'),
  startDate: z.string().optional().describe('The start date of the task in YYYY-MM-DD format.'),
  endDate: z.string().optional().describe('The end date of the task in YYYY-MM-DD format.'),
  priority: z.enum(['low', 'medium', 'high']).optional().describe('The priority of the task.'),
  category: z.string().optional().describe('The category of the task.'),
  isComplete: z.boolean().default(false).describe('Whether the task is currently marked as complete.'),
});

const SmartTaskCompletionSuggestionInputSchema = z.object({
  currentTask: TaskSchema.describe('The task to evaluate for completion suggestion.'),
  allTasks: z.array(TaskSchema).describe('An array of all other tasks the user has, including completed and incomplete tasks, to provide context for the current task.'),
});
export type SmartTaskCompletionSuggestionInput = z.infer<typeof SmartTaskCompletionSuggestionInputSchema>;

const SmartTaskCompletionSuggestionOutputSchema = z.object({
  shouldMarkAsComplete: z.boolean().describe('True if the task should be marked as complete, false otherwise.'),
  reason: z.string().describe('A brief explanation of why the task should or should not be marked as complete, considering the context of other tasks.'),
});
export type SmartTaskCompletionSuggestionOutput = z.infer<typeof SmartTaskCompletionSuggestionOutputSchema>;

export async function smartTaskCompletionSuggestion(
  input: SmartTaskCompletionSuggestionInput
): Promise<SmartTaskCompletionSuggestionOutput> {
  return smartTaskCompletionSuggestionFlow(input);
}

const smartTaskCompletionSuggestionPrompt = ai.definePrompt({
  name: 'smartTaskCompletionSuggestionPrompt',
  input: {schema: SmartTaskCompletionSuggestionInputSchema},
  output: {schema: SmartTaskCompletionSuggestionOutputSchema},
  prompt: `You are an AI assistant tasked with suggesting whether a given 'currentTask' should be marked as complete. Evaluate the 'currentTask' considering its details (title, description, start date, end date, priority, category) and the context provided by 'allTasks'.

Your goal is to determine if the 'currentTask' appears to be finished or implicitly completed based on the information provided, and then suggest whether it should be marked as complete. Provide a brief reason for your suggestion.

Here is the current task to evaluate:
Title: {{{currentTask.title}}}
Description: {{{currentTask.description}}}
Start Date: {{{currentTask.startDate}}}
End Date: {{{currentTask.endDate}}}
Priority: {{{currentTask.priority}}}
Category: {{{currentTask.category}}}
Is Complete: {{{currentTask.isComplete}}}

Here are all other tasks for context:
{{#each allTasks}}
- Title: {{{this.title}}}{{#if this.description}} - Description: {{{this.description}}}{{/if}}{{#if this.startDate}} - Start Date: {{{this.startDate}}}{{/if}}{{#if this.endDate}} - End Date: {{{this.endDate}}}{{/if}}{{#if this.priority}} - Priority: {{{this.priority}}}{{/if}}{{#if this.category}} - Category: {{{this.category}}}{{/if}} - Is Complete: {{{this.isComplete}}}
{{/each}}

Based on this information, should the 'currentTask' be marked as complete?`,
});

const smartTaskCompletionSuggestionFlow = ai.defineFlow(
  {
    name: 'smartTaskCompletionSuggestionFlow',
    inputSchema: SmartTaskCompletionSuggestionInputSchema,
    outputSchema: SmartTaskCompletionSuggestionOutputSchema,
  },
  async (input) => {
    const {output} = await smartTaskCompletionSuggestionPrompt(input);
    return output!;
  }
);
