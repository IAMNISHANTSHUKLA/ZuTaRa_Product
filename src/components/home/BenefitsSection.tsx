
"use client";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const benefits = [
  {
    title: "Architecture & Firms",
    description: "Showcase your work, experience, and design philosophy through detailed profiles built to impress. Attract clients, collaborate with peers, and grow your professional presence on Zutara.",
    href: "/signup?role=freelancer"
  },
  {
    title: "Clients",
    description: "Easily browse curated profiles on Zutara, view past projects, and connect with the right talent for your vision. Finding the perfect architect or design firm has never been this seamless.",
    href: "/signup?role=client"
  },
  {
    title: "Internships",
    description: "Kickstart your career with hands-on experience. Zutara connects students with top firms offering meaningful internships, helping you learn, grow, and make your mark.",
    href: "/jobs?q=internship" 
  }
];

export default function BenefitsSection() {
  const router = useRouter();
  return (
    <section className="bg-background py-16 template-section">
      <div className="template-content w-full max-w-6xl mx-auto px-4 flex-col">
        <h2 className="template-section-title mb-12">Benefits of Zutara</h2>
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
              readOnly 
              onClick={() => {
                router.push('/jobs');
              }}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
