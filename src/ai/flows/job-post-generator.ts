'use server';

/**
 * @fileOverview An AI agent for drafting job posts.
 *
 * - generateJobPost - A function that generates a job post draft from a project description.
 * - JobPostGeneratorInput - The input type for the generateJobPost function.
 * - JobPostGeneratorOutput - The return type for the generateJobPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobPostGeneratorInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A brief description of the project for which a job posting is needed.'),
});
export type JobPostGeneratorInput = z.infer<typeof JobPostGeneratorInputSchema>;

const JobPostGeneratorOutputSchema = z.object({
  jobTitle: z.string().describe('A suitable title for the job posting.'),
  jobDescription: z.string().describe('A detailed description of the job, including responsibilities and requirements.'),
  requiredSkills: z.string().describe('A list of skills required for the job.'),
  budget: z.string().describe('The budget or salary range for the job.'),
  deadline: z.string().describe('The deadline for the project or job completion.'),
});
export type JobPostGeneratorOutput = z.infer<typeof JobPostGeneratorOutputSchema>;

export async function generateJobPost(input: JobPostGeneratorInput): Promise<JobPostGeneratorOutput> {
  return generateJobPostFlow(input);
}

const jobPostDraftingPrompt = ai.definePrompt({
  name: 'jobPostDraftingPrompt',
  input: {schema: JobPostGeneratorInputSchema},
  output: {schema: JobPostGeneratorOutputSchema},
  prompt: `You are an AI assistant specialized in drafting job postings. Based on the project description provided, generate a detailed job posting draft, including a job title, a comprehensive job description, required skills, budget, and deadline.

Project Description: {{{projectDescription}}}

Ensure the job posting is clear, concise, and attractive to potential candidates. Focus on highlighting the key aspects of the project and the benefits of the position.

Output the job posting in the following JSON format:
{
  "jobTitle": "",
  "jobDescription": "",
  "requiredSkills": "",
  "budget": "",
  "deadline": ""
}
`,
});

const generateJobPostFlow = ai.defineFlow(
  {
    name: 'generateJobPostFlow',
    inputSchema: JobPostGeneratorInputSchema,
    outputSchema: JobPostGeneratorOutputSchema,
  },
  async input => {
    const {output} = await jobPostDraftingPrompt(input);
    return output!;
  }
);
