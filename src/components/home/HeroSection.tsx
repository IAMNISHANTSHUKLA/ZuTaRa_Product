
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section 
      className="template-section hero-section-override bg-background text-foreground py-16 md:py-24"
    >
      <div className="template-content flex-col text-center items-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Unleash Your Creative Potential on a Global Stage
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          ZuTaRa is the premier freelancing platform connecting talented designers and architects with exciting projects worldwide. Whether you're a seasoned professional or an emerging creative, ZuTaRa provides the tools, community, and opportunities you need to showcase your expertise, collaborate with clients across continents, and build a thriving international career.
        </p>
        <p className="text-md md:text-lg text-muted-foreground mb-10 font-medium">
          Transform ideas into reality. Connect with the world. Create your legacy on ZuTaRa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup?role=freelancer">
            <Button size="lg" className="w-full sm:w-auto">Join as a Creative</Button>
          </Link>
          <Link href="/signup?role=client">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Hire Talent</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
