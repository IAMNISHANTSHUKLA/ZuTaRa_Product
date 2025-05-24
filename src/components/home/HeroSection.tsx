
"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section 
      className="template-section hero-section-override" // Added hero-section-override for specific background
    >
      {/* Background div removed to make hero section white */}
      <div className="template-content flex-col">
        <div className="template-quotes-layout w-full">
          <div className="template-quote-block">
            <h4 className="text-lg font-semibold">Architectural Digest Tech</h4>
            {/* Updated quote text */}
            <p className="text-sm">"ZUTARA isn't just a freelancing site — it's a curated ecosystem redefining how architects and clients connect."</p>
          </div>
      
          {/* Updated central ZUTARA logo */}
          <Image 
            src="https://placehold.co/450x220/FFFFFF/3B82F6?text=ZUTARA" 
            alt="ZUTARA Central Logo" 
            width={450} // Adjusted size
            height={220} // Adjusted size
            className="template-content-image my-8 md:my-0" // Keep existing class for responsiveness
            data-ai-hint="abstract colorful ZUTARA brand" 
            priority
          />
      
          <div className="template-quote-block">
            <h4 className="text-lg font-semibold">Design Weekly Review</h4>
            {/* Updated quote text */}
            <p className="text-sm">"With ZUTARA, the future of creative collaboration is not just imagined — it's beautifully built."</p>
          </div>
        </div>
      </div>
    </section>
  );
}
