
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Globe, Palette, TrendingUp, ShieldCheck, Lightbulb, Users, Award } from "lucide-react";

const creativeBenefits = [
  {
    icon: <Palette className="w-8 h-8 text-primary mb-2" />,
    title: "Showcase Your Portfolio",
    description: "Create a stunning profile with high-resolution images, case studies, and interactive presentations to impress global clients.",
  },
  {
    icon: <Globe className="w-8 h-8 text-primary mb-2" />,
    title: "Access International Projects",
    description: "Browse diverse opportunities from Tokyo to São Paulo, matching your expertise and career aspirations.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary mb-2" />,
    title: "Flexible Work Arrangements",
    description: "Choose project-based, long-term, or hybrid collaborations. Take control of your schedule and build meaningful professional relationships.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary mb-2" />,
    title: "Professional Development",
    description: "Access exclusive workshops, masterclasses, and certifications to stay ahead in the competitive global market.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary mb-2" />,
    title: "Secure Payment & Contracts",
    description: "Integrated payments and standardized contracts protect your interests, letting you focus on creativity.",
  },
];

const specializations = {
  Architecture: ["Residential Design", "Commercial Architecture", "Urban Planning", "Sustainable Design", "Interior Architecture", "Landscape Architecture", "Historic Preservation", "Industrial Design"],
  Design: ["Graphic Design", "UX/UI Design", "Product Design", "Brand Identity", "Print Design", "Digital Media", "Packaging Design", "Environmental Design"]
};

export default function ForCreativesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">For Designers & Architects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your Global Career Starts Here on ZuTaRa. Empowering you to create, connect, and conquer.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {creativeBenefits.map((item) => (
            <Card key={item.title} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center">{item.icon}</div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-secondary/30 border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Specializations We Support</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Lightbulb className="w-6 h-6 mr-2 text-accent" />Architecture</h3>
              <ul className="space-y-2">
                {specializations.Architecture.map(spec => <li key={spec} className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-2 text-accent/70" />{spec}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-2 text-accent" />Design Disciplines</h3>
              <ul className="space-y-2">
                {specializations.Design.map(spec => <li key={spec} className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-2 text-accent/70" />{spec}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
         <div className="text-center mt-12">
          <Link href="/signup?role=freelancer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Showcase Your Talent
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
