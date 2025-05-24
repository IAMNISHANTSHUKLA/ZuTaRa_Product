import { config } from 'dotenv';
config();

import '@/ai/flows/job-matcher.ts';
import '@/ai/flows/candidate-highlighter.ts';
import '@/ai/flows/job-post-generator.ts';