
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, MessageSquare, ShieldAlert, Globe2, Users, Cloud, GitBranch, PenTool } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-accent mb-2" />,
    title: "Advanced Matching Algorithm",
    description: "Proprietary system considers expertise, time zones, budget, and style to suggest optimal collaborations.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-accent mb-2" />,
    title: "Real-Time Collaboration Tools",
    description: "HD video conferencing, screen sharing, cloud storage, version control, interactive whiteboarding, and project timelines.",
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-accent mb-2" />,
    title: "Quality Control Systems",
    description: "Peer reviews, client feedback integration, continuous skill assessment, performance analytics, and development tracking.",
  },
  {
    icon: <Globe2 className="w-8 h-8 text-accent mb-2" />,
    title: "Global Payment Solutions",
    description: "Multi-currency support, secure escrow, flexible payment schedules, tax documentation, invoicing, and financial reporting.",
  },
];

export default function PlatformFeaturesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">ZuTaRa Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Powering seamless global design collaborations with cutting-edge technology.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardHeader>
                <div className="flex justify-center">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
