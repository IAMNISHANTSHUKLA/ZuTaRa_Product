
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function PlatformIntroSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg border-none bg-card/80">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">About ZuTaRa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-foreground text-center max-w-3xl mx-auto">
            <div className="flex justify-center my-8">
              <Image 
                src="https://placehold.co/600x300/2E7DAF/FFFFFF?text=ZuTaRa+Vision" 
                alt="ZuTaRa Vision - Global Collaboration" 
                width={600} 
                height={300} 
                className="rounded-lg shadow-md"
                data-ai-hint="global network abstract"
              />
            </div>
            <p>
              ZuTaRa represents the future of creative collaboration, breaking down geographical barriers to unite design professionals with clients who value exceptional work. Our platform is built specifically for designers and architects who understand that great projects know no boundaries.
            </p>
            <p>
              We believe that creativity flourishes when diverse minds come together. ZuTaRa creates an ecosystem where innovative design solutions emerge from the intersection of global perspectives, cutting-edge technology, and meaningful professional relationships.
            </p>
            <p className="font-semibold text-primary">
              Our mission is simple: to democratize access to world-class design and architectural talent while empowering creative professionals to reach their full potential in the global marketplace.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

