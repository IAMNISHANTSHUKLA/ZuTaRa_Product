"use client";

import Link from 'next/link';

const ideas = [
  "Website Development", "Logo Design", "SEO", 
  "Architecture & Interior Design", "Voice Over", "Social Media Marketing"
];

export default function IdeasSection() {
  return (
    <section className="py-16 bg-secondary/50 template-section">
      <div className="template-content w-full max-w-6xl mx-auto px-4 flex-col">
        <h2 className="template-section-title mb-10">Explore Popular Services</h2>
        <div className="template-ideas-flashcards-container">
          {ideas.map((idea) => (
            <Link 
              key={idea} 
              href={`/jobs?q=${encodeURIComponent(idea)}`} // Changed to search jobs
              className="template-idea-flashcard no-underline font-medium hover:shadow-lg"
            >
              {idea}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
