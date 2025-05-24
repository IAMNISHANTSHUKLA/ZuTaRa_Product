
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Search, ShieldCheck, FolderKanban, Home, Building, Laptop } from "lucide-react";

const clientBenefits = [
  {
    icon: <Users className="w-8 h-8 text-primary mb-2" />,
    title: "Global Talent Pool",
    description: "Connect with pre-vetted designers and architects from every corner of the world, ensuring high standards of creativity and skill.",
  },
  {
    icon: <Search className="w-8 h-8 text-primary mb-2" />,
    title: "Transparent Pricing",
    description: "No hidden fees. Our clear pricing structure helps you budget effectively while ensuring fair compensation for professionals.",
  },
  {
    icon: <FolderKanban className="w-8 h-8 text-primary mb-2" />,
    title: "Project Management Tools",
    description: "Streamline communication, file sharing, and project tracking with our built-in collaboration tools for efficient feedback.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary mb-2" />,
    title: "Quality Assurance",
    description: "Every project is backed by our satisfaction guarantee, with a dedicated support team to ensure smooth collaborations.",
  },
];

const projectTypes = {
  Residential: ["Custom Home Design", "Renovations & Additions", "Interior Design", "Landscape Design", "Space Planning"],
  Commercial: ["Office Design", "Retail Spaces", "Hospitality Design", "Mixed-Use Developments", "Corporate Branding"],
  Digital: ["Website Design", "Mobile App Interfaces", "Digital Marketing Materials", "E-commerce Platforms", "Brand Development"]
};

export default function ForClientsSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">For Clients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Access World-Class Creative Talent on ZuTaRa. Find the perfect match for your vision.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {clientBenefits.map((item) => (
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

        <Card className="mt-12 bg-background border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Project Types We Excel At</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Home className="w-6 h-6 mr-2 text-accent"/>Residential Projects</h3>
              <ul className="space-y-2">
                {projectTypes.Residential.map(type => <li key={type} className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-2 text-accent/70" />{type}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Building className="w-6 h-6 mr-2 text-accent"/>Commercial Ventures</h3>
              <ul className="space-y-2">
                {projectTypes.Commercial.map(type => <li key={type} className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-2 text-accent/70" />{type}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Laptop className="w-6 h-6 mr-2 text-accent"/>Digital Solutions</h3>
              <ul className="space-y-2">
                {projectTypes.Digital.map(type => <li key={type} className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-2 text-accent/70" />{type}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
        <div className="text-center mt-12">
          <Link href="/client/post-job">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Post Your Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
