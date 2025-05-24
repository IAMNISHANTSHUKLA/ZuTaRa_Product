'use server';

/**
 * @fileOverview This file defines a Genkit flow for highlighting the most qualified freelancer candidates for a job posting.
 *
 * - highlightCandidates - A function that takes a job description and a list of candidate profiles, and returns a list of highlighted candidates.
 * - HighlightCandidatesInput - The input type for the highlightCandidates function.
 * - HighlightCandidatesOutput - The output type for the highlightCandidates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const CandidateProfileSchema = z.object({ // Define schema for candidate profile
  name: z.string().describe('The name of the candidate.'),
  skills: z.array(z.string()).describe('A list of skills the candidate possesses.'),
  experience: z.string().describe('A summary of the candidate\'s work experience.'),
  portfolio: z.string().describe('A link to the candidate\'s online portfolio.'),
  testimonials: z.array(z.string()).describe('A list of client testimonials for the candidate.'),
});

const HighlightCandidatesInputSchema = z.object({
  jobDescription: z.string().describe('The description of the job posting.'),
  candidates: z.array(CandidateProfileSchema).describe('A list of candidate profiles to evaluate.'),
});
export type HighlightCandidatesInput = z.infer<typeof HighlightCandidatesInputSchema>;

const HighlightCandidatesOutputSchema = z.array(
  z.object({
    candidateName: z.string().describe('The name of the candidate.'),
    highlightedReason: z.string().describe('The reason why this candidate is highlighted for the job.'),
  })
).describe('A list of candidate names and their highlighted reasons.');
export type HighlightCandidatesOutput = z.infer<typeof HighlightCandidatesOutputSchema>;


export async function highlightCandidates(input: HighlightCandidatesInput): Promise<HighlightCandidatesOutput> {
  return highlightCandidatesFlow(input);
}

const highlightCandidatesPrompt = ai.definePrompt({
  name: 'highlightCandidatesPrompt',
  input: {schema: HighlightCandidatesInputSchema},
  output: {schema: HighlightCandidatesOutputSchema},
  prompt: `You are an AI assistant designed to highlight the most qualified freelancer candidates for a given job posting.

  Given the following job description:
  {{jobDescription}}

  And the following list of candidate profiles:
  {{#each candidates}}
  Candidate Name: {{this.name}}
  Skills: {{this.skills}}
  Experience: {{this.experience}}
  Portfolio: {{this.portfolio}}
  Testimonials: {{this.testimonials}}
  {{/each}}

  Highlight the candidates that are most suitable for the job and provide a reason for each highlighted candidate.
  Return the results in a JSON array of objects, where each object has the candidateName and highlightedReason. Make sure the candidateName matches the name given in the input.
  `,
});

const highlightCandidatesFlow = ai.defineFlow(
  {
    name: 'highlightCandidatesFlow',
    inputSchema: HighlightCandidatesInputSchema,
    outputSchema: HighlightCandidatesOutputSchema,
  },
  async input => {
    const {output} = await highlightCandidatesPrompt(input);
    return output!;
  }
);
