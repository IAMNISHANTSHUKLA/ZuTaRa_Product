
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Star, TrendingUp, Users } from "lucide-react";

// Replaces ReviewsSection.tsx

const stories = [
  {
    highlight: "Award-winning architects designed sustainable housing in Scandinavia.",
    imageSrc: "https://placehold.co/400x300/77B5B0/FFFFFF?text=Sustainable+Housing",
    aiHint: "modern sustainable architecture",
    category: "Architecture"
  },
  {
    highlight: "Graphic designers created iconic brand identities for Silicon Valley startups.",
    imageSrc: "https://placehold.co/400x300/2E7DAF/FFFFFF?text=Brand+Identity",
    aiHint: "modern logo design",
    category: "Graphic Design"
  },
  {
    highlight: "Interior designers transformed spaces across six continents with unique visions.",
    imageSrc: "https://placehold.co/400x300/A0A0A0/FFFFFF?text=Interior+Transformation",
    aiHint: "luxury interior design",
    category: "Interior Design"
  }
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Success Stories on ZuTaRa</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ZuTaRa has facilitated thousands of successful collaborations, from intimate residential projects to landmark commercial developments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image 
                src={story.imageSrc} 
                alt={story.highlight} 
                width={400} 
                height={300} 
                className="w-full h-56 object-cover"
                data-ai-hint={story.aiHint}
              />
              <CardContent className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{story.category}</p>
                <p className="text-foreground font-medium">{story.highlight}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-center max-w-4xl mx-auto">
            <Card className="p-6 bg-card">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Freelancer Growth</h3>
                <p className="text-muted-foreground">
                Freelancers on ZuTaRa increase their earnings by an average of 40% while working with clients they're genuinely excited to serve.
                </p>
            </Card>
            <Card className="p-6 bg-card">
                <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Client Satisfaction</h3>
                <p className="text-muted-foreground">
                Our clients report higher satisfaction rates and more innovative solutions compared to traditional hiring methods.
                </p>
            </Card>
        </div>
      </div>
    </section>
  );
}
