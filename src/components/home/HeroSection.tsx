
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { SparklesCore } from '@/components/ui/sparkles';

export default function HeroSection() {
  const [theme] = useTheme();

  return (
    <section 
      className="relative template-section hero-section-override bg-background text-foreground py-16 md:py-24"
    >
       {theme === 'light' && (
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080/F0F4F8/FFFFFF?text=."
            alt="Abstract architectural background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            data-ai-hint="abstract architecture background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
      )}

      {theme === 'dark' ? (
        <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
            Zutara
          </h1>
          <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      ) : (
        <div className="template-content flex-col text-center items-center max-w-4xl mx-auto px-4 relative z-10">
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
      )}
    </section>
  );
}
