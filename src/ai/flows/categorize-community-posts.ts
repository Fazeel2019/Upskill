// src/ai/flows/categorize-community-posts.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to categorize community posts into predefined categories (STEM, Healthcare, Public Health).
 *
 * - categorizePost - An async function that takes a post's text content and returns its category.
 * - CategorizePostInput - The input type for the categorizePost function, representing the post's content.
 * - CategorizePostOutput - The output type, indicating the categorized category.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizePostInputSchema = z.object({
  postContent: z.string().describe('The text content of the community post.'),
});
export type CategorizePostInput = z.infer<typeof CategorizePostInputSchema>;

const CategorizePostOutputSchema = z.object({
  category: z
    .enum(['STEM', 'Healthcare', 'Public Health'])
    .describe('The category the post belongs to.'),
});
export type CategorizePostOutput = z.infer<typeof CategorizePostOutputSchema>;

export async function categorizePost(input: CategorizePostInput): Promise<CategorizePostOutput> {
  return categorizePostFlow(input);
}

const categorizePostPrompt = ai.definePrompt({
  name: 'categorizePostPrompt',
  input: {schema: CategorizePostInputSchema},
  output: {schema: CategorizePostOutputSchema},
  prompt: `You are a community content categorization expert.
  Your goal is to categorize user-generated community posts into one of the following categories: STEM, Healthcare, or Public Health.
  Given the following post content, determine the most appropriate category.

  Post Content: {{{postContent}}}

  Respond ONLY with the category name.  Do not include any other explanation.
  `,
});

const categorizePostFlow = ai.defineFlow(
  {
    name: 'categorizePostFlow',
    inputSchema: CategorizePostInputSchema,
    outputSchema: CategorizePostOutputSchema,
  },
  async input => {
    const {output} = await categorizePostPrompt(input);
    return output!;
  }
);
