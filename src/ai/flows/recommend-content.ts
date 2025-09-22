
'use server';

/**
 * @fileOverview Defines a Genkit flow for generating personalized content recommendations.
 * 
 * - recommendContent: An async function that provides content recommendations based on user's professional title.
 * - RecommendContentInput: The input type, containing the user's title and available resources.
 * - RecommendContentOutput: The output type, containing an array of recommendations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resource } from '@/lib/data';

const RecommendContentInputSchema = z.object({
  userTitle: z.string().describe('The professional title of the user.'),
  availableResources: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
  })).describe("A list of available learning resources.")
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

export const RecommendationSchema = z.object({
  type: z.enum(['Learning', 'Community', 'Event']).describe('The type of content being recommended.'),
  title: z.string().describe('The title of the recommended item.'),
  reason: z.string().describe('A brief explanation of why this is recommended for the user.'),
  link: z.string().optional().describe('A direct link to the recommended content.'),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: { schema: RecommendContentInputSchema },
  output: { schema: RecommendContentOutputSchema },
  prompt: `
    You are an AI career advisor for a professional community platform.
    Your goal is to provide two highly relevant recommendations to a user based on their professional title.
    The user's title is: {{{userTitle}}}.
    
    Here are the available learning resources:
    {{#each availableResources}}
    - ID: {{id}}, Title: "{{title}}", Category: {{category}}, Description: "{{description}}"
    {{/each}}
    
    Based on the user's title, please provide two recommendations:
    1.  **Learning Recommendation**: Select the *most* relevant learning resource from the list provided. Explain why it's a good fit for someone with their title. Provide a link using the format '/learning#{{id}}'.
    2.  **Community Engagement Recommendation**: Suggest a specific, engaging question the user could post in the community to share their expertise and connect with others. The question should be directly related to their professional role. For example, for a 'Clinical Research Coordinator', you might suggest: "What are the most effective patient recruitment strategies you've used in your recent clinical trials?".
    
    Structure your response according to the output schema.
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
