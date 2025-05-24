
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus, Briefcase, Search, CheckCircle, Users } from "lucide-react"; // Added Users here

const stepsCreative = [
  { no: 1, title: "Create Your Profile", description: "Build a comprehensive profile showcasing your skills, experience, and portfolio.", icon: <UserPlus className="w-6 h-6 text-primary" /> },
  { no: 2, title: "Complete Verification", description: "Submit credentials and work samples for our quality assurance review (24-48 hours).", icon: <CheckCircle className="w-6 h-6 text-primary" /> },
  { no: 3, title: "Set Your Preferences", description: "Define ideal projects, rates, and collaboration style for optimal matching.", icon: <Briefcase className="w-6 h-6 text-primary" /> },
  { no: 4, title: "Start Connecting", description: "Browse projects, submit proposals, and build relationships with clients.", icon: <Search className="w-6 h-6 text-primary" /> },
];

const stepsClient = [
  { no: 1, title: "Define Your Project", description: "Provide detailed project specifications, timeline, budget, and preferences.", icon: <Briefcase className="w-6 h-6 text-accent" /> },
  { no: 2, title: "Review Matches", description: "Our algorithm suggests qualified professionals. Review portfolios and feedback.", icon: <Search className="w-6 h-6 text-accent" /> },
  { no: 3, title: "Interview & Select", description: "Connect with collaborators to discuss your vision and assess compatibility.", icon: <Users className="w-6 h-6 text-accent" /> },
  { no: 4, title: "Begin Collaboration", description: "Use our integrated tools to manage your project from concept to completion.", icon: <CheckCircle className="w-6 h-6 text-accent" /> },
];

export default function GettingStartedSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Getting Started with ZuTaRa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join our global network of creative talent and visionary clients in a few simple steps.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><UserPlus className="w-7 h-7 mr-3"/>For Creative Professionals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {stepsCreative.map(step => (
                <div key={step.no} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">{step.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{step.no}. {step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 text-center">
                <Link href="/signup?role=freelancer">
                    <Button size="lg">Create Your Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-accent flex items-center"><Briefcase className="w-7 h-7 mr-3"/>For Clients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {stepsClient.map(step => (
                <div key={step.no} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-lg">{step.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{step.no}. {step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
               <div className="pt-4 text-center">
                <Link href="/signup?role=client">
                    <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">Define Your Project</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
