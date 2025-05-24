"use client";

import Image from 'next/image';
import { ScrollEffectSection } from '@/hooks/useScrollEffect';

export default function HeroSection() {
  return (
    <ScrollEffectSection 
      bgImageUrl="https://placehold.co/1920x1080/F0F4F8/2E7DAF?text=Architectural+Background"
      bgClassName="hero-bg-image"
      className="min-h-screen"
      contentClassName="flex-col"
      data-ai-hint="architecture abstract"
    >
      {() => (
        <div className="template-quotes-layout w-full">
          <div className="template-quote-block">
            <h4 className="text-lg font-semibold">Architectural Digest Tech</h4>
            <p className="text-sm">"ArchConnect isn't just a freelancing site — it's a curated ecosystem redefining how architects and clients connect."</p>
          </div>
      
          <Image 
            src="https://placehold.co/600x150/2E7DAF/FFFFFF?text=ArchConnect+Platform" 
            alt="ArchConnect Platform Features" 
            width={500} 
            height={125} 
            className="template-content-image my-8 md:my-0"
            data-ai-hint="brand name elegant" 
            priority
          />
      
          <div className="template-quote-block">
            <h4 className="text-lg font-semibold">Design Weekly Review</h4>
            <p className="text-sm">"With ArchConnect, the future of creative collaboration is not just imagined — it's beautifully built."</p>
          </div>
        </div>
      )}
    </ScrollEffectSection>
  );
}
