"use client";

import Link from 'next/link';
import { ScrollEffectSection } from '@/hooks/useScrollEffect';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const benefits = [
  {
    title: "Architecture & Firms",
    description: "Showcase your work, experience, and design philosophy through detailed profiles built to impress. Attract clients, collaborate with peers, and grow your professional presence.",
    href: "/auth/signup?role=freelancer" // Example link
  },
  {
    title: "Clients",
    description: "Easily browse curated profiles, view past projects, and connect with the right talent for your vision. Finding the perfect architect or design firm has never been this seamless.",
    href: "/auth/signup?role=client" // Example link
  },
  {
    title: "Internships",
    description: "Kickstart your career with hands-on experience. Our platform connects students with top firms offering meaningful internships, helping you learn, grow, and make your mark.",
    href: "/jobs?type=internship" // Example link
  }
];

export default function BenefitsSection() {
  return (
    <ScrollEffectSection className="bg-background py-16">
      {() => (
        <div className="w-full max-w-6xl mx-auto px-4">
          <h2 className="template-section-title mb-12">Benefits of ArchConnect</h2>
          <div className="template-flashcards-container">
            {benefits.map((benefit) => (
              <Link key={benefit.title} href={benefit.href} className="template-flashcard no-underline group">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </Link>
            ))}
          </div>

          <div className="template-search-container mt-16">
            <div className="relative w-full max-w-xl">
              <Input 
                type="text" 
                className="template-search-bar h-12 pl-12 pr-4 text-base" 
                placeholder="Search for Services (e.g., Residential Design, 3D Modeling)" 
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </ScrollEffectSection>
  );
}
