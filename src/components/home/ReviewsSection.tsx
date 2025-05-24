"use client";

import Image from 'next/image';
import { ScrollEffectSection } from '@/hooks/useScrollEffect';

const reviews = [
  {
    name: "Harsha Vardhan Kurri",
    role: "Client",
    quote: "Amazing platform! Helped me find the perfect architect for my dream house.",
    imageSrc: "https://placehold.co/230x230/77B5B0/FFFFFF?text=HV",
    aiHint: "professional portrait"
  },
  {
    name: "Sharath Chandra",
    role: "Architect",
    quote: "Intuitive interface and great exposure for professionals. Highly recommend!",
    imageSrc: "https://placehold.co/230x230/2E7DAF/FFFFFF?text=SC",
    aiHint: "architect smiling"
  },
  {
    name: "Nishant Shukla",
    role: "Aspiring Intern",
    quote: "Landed my first internship through this — truly a game-changer for students.",
    imageSrc: "https://placehold.co/230x230/A0A0A0/FFFFFF?text=NS",
    aiHint: "student enthusiastic"
  }
];

export default function ReviewsSection() {
  return (
    <ScrollEffectSection className="py-16">
      {() => (
        <div className="template-reviews-wrapper">
          <h2 className="template-section-title mb-12">What Our Users Say</h2>
          <div className="template-reviews-container">
            {reviews.map((review) => (
              <div key={review.name} className="template-review-card">
                <Image 
                  src={review.imageSrc} 
                  alt={review.name} 
                  width={120} 
                  height={120} 
                  className="rounded-full mx-auto"
                  data-ai-hint={review.aiHint}
                />
                <h3 className="mt-4 text-xl font-semibold">{review.name}</h3>
                <h6 className="text-primary font-medium">{review.role}</h6>
                <p className="text-muted-foreground mt-2"><em>"{review.quote}"</em></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ScrollEffectSection>
  );
}
