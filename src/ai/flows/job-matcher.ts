'use server';

/**
 * @fileOverview AI-powered job matching flow for freelancers.
 *
 * - matchFreelancerWithJobs - A function that matches freelancers with relevant job postings.
 * - MatchFreelancerWithJobsInput - The input type for the matchFreelancerWithJobs function.
 * - MatchFreelancerWithJobsOutput - The return type for the matchFreelancerWithJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchFreelancerWithJobsInputSchema = z.object({
  freelancerProfile: z
    .string()
    .describe('The profile of the freelancer, including skills and experience.'),
  jobPostings: z
    .string()
    .describe('A list of job postings, including project descriptions and required skills.'),
});
export type MatchFreelancerWithJobsInput = z.infer<typeof MatchFreelancerWithJobsInputSchema>;

const MatchFreelancerWithJobsOutputSchema = z.object({
  matchedJobs: z
    .string()
    .describe('A list of job postings that are most relevant to the freelancer.'),
});
export type MatchFreelancerWithJobsOutput = z.infer<typeof MatchFreelancerWithJobsOutputSchema>;

export async function matchFreelancerWithJobs(input: MatchFreelancerWithJobsInput): Promise<MatchFreelancerWithJobsOutput> {
  return matchFreelancerWithJobsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchFreelancerWithJobsPrompt',
  input: {schema: MatchFreelancerWithJobsInputSchema},
  output: {schema: MatchFreelancerWithJobsOutputSchema},
  prompt: `You are an AI job matching expert. Given a freelancer profile and a list of job postings, determine which jobs are the best match for the freelancer.\n\nFreelancer Profile: {{{freelancerProfile}}}\n\nJob Postings: {{{jobPostings}}}\n\nBased on the freelancer's profile and the job postings, identify the jobs that are most relevant to the freelancer. Return the matched jobs in a JSON format.`,  
});

const matchFreelancerWithJobsFlow = ai.defineFlow(
  {
    name: 'matchFreelancerWithJobsFlow',
    inputSchema: MatchFreelancerWithJobsInputSchema,
    outputSchema: MatchFreelancerWithJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
