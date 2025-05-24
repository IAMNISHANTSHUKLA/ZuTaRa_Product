
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageCircle, CalendarDays } from "lucide-react";

const communityFeatures = [
  { icon: <Users className="w-8 h-8 text-primary mb-2" />, title: "Professional Networks", description: "Join specialized groups to share insights, seek advice, and build lasting professional relationships worldwide." },
  { icon: <BookOpen className="w-8 h-8 text-primary mb-2" />, title: "Educational Resources", description: "Access a comprehensive library of tutorials, industry reports, design inspiration, and professional development resources." },
  { icon: <MessageCircle className="w-8 h-8 text-primary mb-2" />, title: "Customer Support", description: "Our dedicated 24/7 support team assists with technical issues, mediates disputes, and provides platform guidance." },
  { icon: <CalendarDays className="w-8 h-8 text-primary mb-2" />, title: "Global Events", description: "Participate in virtual conferences, webinars, and networking events that bring the ZuTaRa community together." },
];

export default function CommunitySupportSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Community & Support</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Connect, learn, and grow with ZuTaRa's vibrant global community and robust support system.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityFeatures.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-xl transition-shadow duration-300">
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
