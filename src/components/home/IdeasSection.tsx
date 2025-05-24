"use client";

import Link from 'next/link';
import { ScrollEffectSection } from '@/hooks/useScrollEffect';

const ideas = [
  "Website Development", "Logo Design", "SEO", 
  "Architecture & Interior Design", "Voice Over", "Social Media Marketing"
];

export default function IdeasSection() {
  return (
    <ScrollEffectSection className="py-16 bg-secondary/50">
      {() => (
        <div className="w-full max-w-6xl mx-auto px-4">
          <h2 className="template-section-title mb-10">Explore Popular Services</h2>
          <div className="template-ideas-flashcards-container">
            {ideas.map((idea) => (
              <Link 
                key={idea} 
                href={`/services?q=${encodeURIComponent(idea)}`} 
                className="template-idea-flashcard no-underline font-medium hover:shadow-lg"
              >
                {idea}
              </Link>
            ))}
          </div>
        </div>
      )}
    </ScrollEffectSection>
  );
}
