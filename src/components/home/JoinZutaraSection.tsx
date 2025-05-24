
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JoinZutaraSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join ZuTaRa Today</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          The world needs your creative vision. Whether you're an architect dreaming of designing the next iconic skyline or a graphic designer ready to craft brands that inspire millions, ZuTaRa provides the platform to turn your aspirations into achievements.
        </p>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Ready to expand your horizons? Create your profile today and discover why thousands of creative professionals choose ZuTaRa as their gateway to global opportunities.
        </p>
        <Link href="/signup">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Start Your Journey on ZuTaRa
          </Button>
        </Link>
        <p className="mt-8 text-xl font-medium">
          <em>ZuTaRa - Where Global Creativity Meets Unlimited Opportunity</em>
        </p>
      </div>
    </section>
  );
}
