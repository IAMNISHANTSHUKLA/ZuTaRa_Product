
"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section 
      className="template-section hero-section-override" 
    >
      <div className="template-content flex-col">
        <div className="template-quotes-layout w-full">
          <div className="template-quote-block">
            <h4 className="text-lg font-semibold">Architectural Digest Tech</h4>
            <p className="text-sm">"Zutara isn't just a freelancing site — it's a curated ecosystem redefining how architects and clients connect."</p>
          </div>
      
          <Image 
            src="https://placehold.co/450x220/FFFFFF/3B82F6?text=ZUTARA" 
            alt="Zutara Central Logo" 
            width={450} 
            height={220} 
            className="template-content-image my-8 md:my-0" 
            data-ai-hint="abstract colorful ZUTARA brand" 
            priority
          />
      
          <div className="template-quote-block">
            <h4 className="text-lg font-semibold">Design Weekly Review</h4>
            <p className="text-sm">"With Zutara, the future of creative collaboration is not just imagined — it's beautifully built."</p>
          </div>
        </div>
      </div>
    </section>
  );
}
