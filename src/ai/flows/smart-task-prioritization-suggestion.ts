'use server';
/**
 * @fileOverview A Genkit flow for suggesting task prioritizations based on title and description.
 *
 * - smartTaskPrioritizationSuggestion - A function that handles the task prioritization suggestion process.
 * - SmartTaskPrioritizationSuggestionInput - The input type for the smartTaskPrioritizationSuggestion function.
 * - SmartTaskPrioritizationSuggestionOutput - The return type for the smartTaskPrioritizationSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartTaskPrioritizationSuggestionInputSchema = z.object({
  title: z.string().describe('The title of the task.'),
  description: z.string().describe('The detailed description of the task.'),
});
export type SmartTaskPrioritizationSuggestionInput = z.infer<
  typeof SmartTaskPrioritizationSuggestionInputSchema
>;

const SmartTaskPrioritizationSuggestionOutputSchema = z.object({
  suggestedPriority: z
    .enum(['Low', 'Medium', 'High', 'Urgent'])
    .describe('The suggested priority for the task (Low, Medium, High, or Urgent).'),
  reasoning: z.string().describe('Explanation for the suggested priority.'),
});
export type SmartTaskPrioritizationSuggestionOutput = z.infer<
  typeof SmartTaskPrioritizationSuggestionOutputSchema
>;

export async function smartTaskPrioritizationSuggestion(
  input: SmartTaskPrioritizationSuggestionInput
): Promise<SmartTaskPrioritizationSuggestionOutput> {
  return smartTaskPrioritizationSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTaskPrioritizationSuggestionPrompt',
  input: {schema: SmartTaskPrioritizationSuggestionInputSchema},
  output: {schema: SmartTaskPrioritizationSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to help users prioritize their tasks. Your goal is to analyze the task's title and description to determine its importance, urgency, and overall relevance. Based on this analysis, you will suggest a priority level: 'Low', 'Medium', 'High', or 'Urgent'. You must also provide a brief reasoning for your suggested priority.

Here is the task information:

Title: {{{title}}}
Description: {{{description}}}

Consider the following guidelines for prioritization:
- 'Urgent': Implies immediate action, critical deadlines, or high impact if not completed swiftly.
- 'High': Important tasks with clear deadlines or significant impact, requiring prompt attention but not necessarily immediate.
- 'Medium': Tasks that are important but less time-sensitive, or have moderate impact.
- 'Low': Tasks that are less critical, can be deferred, or have minimal impact.

Please provide your suggested priority and reasoning.`,
});

const smartTaskPrioritizationSuggestionFlow = ai.defineFlow(
  {
    name: 'smartTaskPrioritizationSuggestionFlow',
    inputSchema: SmartTaskPrioritizationSuggestionInputSchema,
    outputSchema: SmartTaskPrioritizationSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
