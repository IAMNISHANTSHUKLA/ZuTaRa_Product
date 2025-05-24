"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section 
      className="min-h-screen template-section relative" // template-section handles flex centering
    >
      <div
        className="template-bg hero-bg-image" // Classes from template.css
        style={{ backgroundImage: `url(https://placehold.co/1920x1080/F0F4F8/2E7DAF?text=Architectural+Background)` }}
        data-ai-hint="architecture abstract"
      />
      <div className="template-content flex-col"> {/* template-content and flex-col from template.css */}
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
      </div>
    </section>
  );
}
